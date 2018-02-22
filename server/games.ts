import * as WebSocket from "ws";

import ServerState from "./server-state";


export default class Games {
    games: Map<string, ServerState>;

    private expected: number;
    private updateInterval = 1000 / 60.0;
    constructor() {
        this.games = new Map<string, ServerState>();
        this.expected = Date.now() - this.updateInterval;
        this.updateGames();
    }

    private updateGames() {
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
}