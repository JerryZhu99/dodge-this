import * as WebSocket from "ws";
import SocketWrapper from "shared/socket-wrapper";
import ServerState from "server-state";
import { Vector } from "shared/math-utils";
import { getSmallestTeam } from "shared/teams";
import ServerPlayer from "server-player";
import * as uuid from "uuid/v4";
import Games from "./games";

/**
 * Manages game connections and active games.
 */
export default class GameManager {

    connection(socket: SocketWrapper, games: Games) {
        let gameState: ServerState;
        let gameId: string;
        if (games.games.size == 0) {
            gameState = new ServerState();
            gameId = gameState.id;
            games.games.set(gameId, gameState);
        } else {
            gameState = games.games.entries().next().value[1];
            gameId = gameState.id;
        }
        let player = new ServerPlayer(Vector.zero, getSmallestTeam(gameState.players), socket);
        gameState.addPlayer(player);
        gameState.addConnection(player);
        socket.send("local player", player.serialize());
        this.handlePlayerEvents(player);
        function errorHandler() {
            gameState.removePlayer(player);
            gameState.removeConnection(player);
        }
        socket.closed(errorHandler);
        socket.errored(errorHandler);
    }


    private handlePlayerEvents(player: ServerPlayer) {
        player.socket.on("attack", function (data) {
            player.attack(data);
        });
        player.socket.on("special", function (data) {
            player.special(data);
        });
        player.socket.on("player move", function (data) {
            player.move(data);
        });
    }
}