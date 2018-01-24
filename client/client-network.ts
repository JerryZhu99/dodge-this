const socket = new WebSocket(`ws://${location.host}`)

export default class Network{
    
    static on(event: string, handler: (data: any)=>(any)){
        socket.addEventListener("message", (message)=>{
            let data = JSON.parse(message.data);
            if(data.event == event)handler(data.data);
        });
    }

    static send(event: string, data: any){
        if(socket.readyState !== WebSocket.OPEN){
            console.error("not open");
            return;
        }
        socket.send(JSON.stringify({event: event, data: data}));
    }
}