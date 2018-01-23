const ip = "localhost";
const port = 8000;
import * as express from 'express';
const app = express();
import * as WebSocket from 'ws';
import * as http from "http";
const server = new http.Server(app);

app.use(express.static('dist'));

const wss = new WebSocket.Server({
    server: server
});

wss.on('connection', function connection(ws, req) {
    console.log("connection");

    ws.on('message', (dataObject: string) => {
        let dataParsed: {event: string, data:any} = JSON.parse(dataObject);
        let event = dataParsed.event;
        let data = dataParsed.data;
        console.log('%s: %s', event, JSON.stringify(data));
    });
    ws.on('error', () => console.log('errored'));
    ws.on('closed', () => console.log('closed'));

    ws.send('something');
});

server.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);