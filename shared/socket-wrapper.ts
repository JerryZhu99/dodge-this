export default class SocketWrapper {

    static webSocketClass: { OPEN: any }

    socket: any;

    constructor(socket: any) {
        this.socket = socket;
    }

    on(event: string, handler: (data: any) => (any)) {
        this.socket.addEventListener("message", (message: any) => {
            let data = JSON.parse(message.data);
            if (data.event == event) handler(data.data);
        });
    }

    send(event: string, data: any) {
        if (this.socket.readyState !== SocketWrapper.webSocketClass.OPEN) {
            console.error("not open");
            return;
        }
        this.socket.send(JSON.stringify({ event: event, data: data }));
    }

    close(){
        this.socket.close();
    }
}