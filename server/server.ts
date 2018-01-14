const ip = "localhost";
const port = 8000;
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('dist'));

io.on('connection', function (socket: SocketIO.Socket) {
    console.log(socket.id);
});

server.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);