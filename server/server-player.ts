import Player from "shared/player";
import { Coord } from "shared/math-utils";
import * as WebSocket from "ws";
import SocketWrapper from "shared/socket-wrapper";

/**
 * A server-side representation of a player.
 */
export default class ServerPlayer extends Player{
    socket: SocketWrapper;
    constructor(position: Coord, socket: SocketWrapper){
        super(position);
        this.socket = socket;
    }
}