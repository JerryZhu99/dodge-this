import Player from "shared/player";
import { Coord } from "shared/math-utils";
import SocketWrapper from "shared/socket-wrapper";

/**
 * A server-side representation of a player.
 */
export default class ServerPlayer extends Player {
    socket: SocketWrapper;
    constructor(position: Coord, team: number, socket: SocketWrapper) {
        super(position, team);
        this.socket = socket;
    }
}