import Player from "shared/player";
import { Coord } from "shared/math-utils";
import * as WebSocket from "ws";

/**
 * A server-side representation of a player.
 */
export default class ServerPlayer extends Player{
    socket: WebSocket;
    constructor(position: Coord, socket: WebSocket){
        super(position);
        this.socket = socket;
    }
    send(event: string, data: any){
        this.socket.send(JSON.stringify({event, data}));
    }
}