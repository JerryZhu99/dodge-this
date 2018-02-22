import * as WebSocket from "ws";
import SocketWrapper from "shared/socket-wrapper";
import ServerState from "server-state";
import { Vector } from "shared/math-utils";
import { getSmallestTeam } from "shared/teams";
import ServerPlayer from "server-player";
import * as uuid from "uuid/v4";

/**
 * Manages game connections and active games.
 */
export default class GameManager {
    games: Map<string, ServerState>;

    private expected: number;
    private updateInterval = 1000 / 60.0;
    constructor(wss: WebSocket.Server) {
        this.games = new Map<string, ServerState>();
        this.expected = Date.now() - this.updateInterval;
        this.updateGames();
    }

    connection(socket: SocketWrapper) {
        let gameState: ServerState;
        let gameId: string;
        if (this.games.size == 0) {
            gameState = new ServerState();
            gameId = gameState.id;
            this.games.set(gameId, gameState);
        } else {
            gameState = this.games.entries().next().value[1];
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

    public updateGames() {
        let dt = Date.now() - this.expected;
        if (dt > this.updateInterval) {
            console.error("server is behind");
        }
        this.games.forEach((game, key) => {
            game.update(1 / 60.0);
            if (game.players.length == 0 || game.time > 1000) {
                this.games.delete(key);
            }
        });
        this.expected += this.updateInterval;
        setTimeout(() => { this.updateGames() }, Math.max(0, this.updateInterval - dt));
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