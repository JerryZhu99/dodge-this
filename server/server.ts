const ip = "localhost";
const port = 8000;
import * as express from 'express';
const app = express();
import * as WebSocket from 'ws';
import * as http from "http";
import * as uuid from "uuid/v4";
import ServerState from 'server-state';
import ServerPlayer from 'server-player';
import { Vector } from 'shared/math-utils';
import { setInterval } from 'timers';
const server = new http.Server(app);

app.use(express.static('dist'));

let gameState = new ServerState();
setInterval(() => {gameState.update(1 / 60)}, 1000/60.0);
const wss = new WebSocket.Server({
    server: server
});
wss.on('connection', function connection(ws, req) {
    console.log("connection");
    let player = new ServerPlayer(Vector.zero, ws);
    player.id = uuid();
    gameState.addPlayer(player);
    ws.send(JSON.stringify({event: "local player", data: player.id}));
    ws.on('message', (dataObject: string) => {
        let dataParsed: {
            event: string,
            data: any
        } = JSON.parse(dataObject);
        let event = dataParsed.event;
        let data = dataParsed.data;
        if(event == "player attack"){
            player.attack(data);
        }
        if(event == "player move"){
            player.move(data);
        }
    });
    ws.on('error', () => {
        console.log('errored');
        gameState.removePlayer(player);
    });
    ws.on('closed', () => {
        console.log('closed');
        gameState.removePlayer(player);
    });
});


server.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);