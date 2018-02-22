export default class SocketWrapper {

    static webSocketClass: { OPEN: any }

    socket: any;

    handlers: any;

    constructor(socket: any) {
        this.socket = socket;
        this.handlers = {};
        this.socket.addEventListener("message", (message: any) => {
            let data = JSON.parse(message.data);
            let handler = this.handlers[data.event];
            if (handler) handler(data.data);
        });
    }

    on(event: string, handler: (data: any) => any) {
        this.handlers[event] = handler;
    }

    errored(handler: (error: any) => any) {
        this.socket.addEventListener("error", handler);
    }

    closed(handler: (error: any) => any) {
        this.socket.addEventListener("closed", handler);
    }

    send(event: string, data: any) {
        if (this.socket.readyState !== SocketWrapper.webSocketClass.OPEN) {
            console.error("not open");
            return;
        }
        this.socket.send(JSON.stringify({ event: event, data: data }));
    }

    close() {
        this.socket.close();
    }
}