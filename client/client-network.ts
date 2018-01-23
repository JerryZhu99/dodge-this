const socket = new WebSocket(`ws://${location.host}`)

export default class Network{
    static on(event: string, handler: (data: any)=>(any)){
        socket.addEventListener(event, handler);
    }

    static send(event: string, data: any){
        if(socket.readyState !== WebSocket.OPEN){
            console.error("not open");
            return;
        }
        console.log(event, data);
        socket.send(JSON.stringify({event: event, data: data}));
    }
}