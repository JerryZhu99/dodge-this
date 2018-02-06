import * as express from 'express';
import * as WebSocket from 'ws';
import * as http from "http";
import SocketWrapper from 'shared/socket-wrapper';
import GameManager from 'game-manager';
import { GamesRouter } from 'game-router';

SocketWrapper.webSocketClass = WebSocket;
const ip = "localhost";
const port = 8000;

const app = express();
const server = new http.Server(app);

app.use(express.static('dist'));
app.use(express.static('assets'));

app.use('/api', GamesRouter)

const wss = new WebSocket.Server({
    server: server
});
export const gameManager = new GameManager(wss);

server.listen(port, ip);

console.log('Server running on http://%s:%s', ip, port);