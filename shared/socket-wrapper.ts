
export default class SocketWrapper {

    static webSocketClass: { OPEN: any }

    socket: any;

    handlers: Map<string, EventHandler>;

    constructor(socket: any) {
        this.socket = socket;
        this.handlers = new Map<string, EventHandler>();
        this.socket.addEventListener("message", (message: any) => {
            let data = JSON.parse(message.data);
            let handler = this.handlers.get(data[0]);
            if (handler) handler(data[1]);
        });
    }

    /**
     * Binds the given handler to the given event.
     * @param event 
     * @param handler 
     */
    on(event: string, handler: EventHandler) {
        this.handlers.set(event, handler);
    }

    /**
     * Removes the handler attached to the given event.
     * @param event 
     */
    off(event: string) {
        this.handlers.delete(event);
    }

    /**
     * Clears all attached event handlers.
     */
    clear() {
        this.handlers.clear();
    }

    /**
     * Calls the given handler on error.
     * @param handler 
     */
    errored(handler: EventHandler) {
        this.socket.addEventListener("error", handler);
    }

    /**
     * Calls the given handler on socket close.
     * @param handler 
     */
    closed(handler: EventHandler) {
        this.socket.addEventListener("closed", handler);
    }

    /**
     * Sends the given event and data through the socket.
     * @param event 
     * @param data 
     */
    send(event: string, data: any) {
        if (this.socket.readyState !== SocketWrapper.webSocketClass.OPEN) {
            console.error("not open");
            return;
        }
        this.socket.send(JSON.stringify([event, data]));
    }

    /**
     * Closes the socket
     */
    close() {
        this.socket.close();
    }
}

interface EventHandler {
    (data: any): void
}