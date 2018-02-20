import * as express from 'express';
import * as WebSocket from 'ws';
import * as http from "http";
import SocketWrapper from 'shared/socket-wrapper';
import GameManager from 'game-manager';
import { GamesRouter } from 'game-router';
import { LobbyRouter } from 'lobby-router';
import LobbyManager from './lobby-manager';

SocketWrapper.webSocketClass = WebSocket;
const ip = "localhost";
const port = 8000;

const app = express();
const server = new http.Server(app);

app.use(express.static('dist'));
app.use(express.static('assets'));

app.use('/api/games', GamesRouter)
app.use('/api/lobbies', LobbyRouter)

const wss = new WebSocket.Server({
    server: server
});

export const lobbyManager = new LobbyManager();
export const gameManager = new GameManager(wss);

server.listen(port, ip);

console.log('Server running on http://%s:%s', ip, port);