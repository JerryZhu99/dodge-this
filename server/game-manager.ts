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

        wss.on('connection', (ws, req) => {
            let socket = new SocketWrapper(ws);
            console.log("connection");
            let gameState: ServerState;
            let gameId: string;
            if(this.games.size == 0){
                gameState = new ServerState();
                gameId = gameState.id;
                this.games.set(gameId, gameState);
            }else{
                gameState = this.games.entries().next().value[1];
                gameId = gameState.id;
            }
            let player = new ServerPlayer(Vector.zero, getSmallestTeam(gameState.players), socket);
            gameState.addPlayer(player);
            gameState.addConnection(player);

            socket.send("local player", player.serialize());

            ws.on('message', (dataObject: string) => {
                this.handlePlayerEvent(dataObject, player);
            });
            ws.on('error', () => {
                console.log('errored');
                gameState.removePlayer(player);
                gameState.removeConnection(player);
            });
            ws.on('closed', () => {
                console.log('closed');
                gameState.removePlayer(player);
                gameState.removeConnection(player);
            });
        });
    }

    public updateGames(){
        let dt = Date.now() - this.expected;
        if(dt > this.updateInterval){
            console.error("server is behind");
        }
        this.games.forEach((game, key) => {
            game.update(1 / 60.0);
            if (game.players.length == 0 || game.time > 1000) {
                this.games.delete(key);
            }
        });
        this.expected += this.updateInterval;
        setTimeout(()=>{this.updateGames()}, Math.max(0, this.updateInterval - dt));
    }

    private handlePlayerEvent(dataObject: string, player: ServerPlayer) {
        let dataParsed: {
            event: string;
            data: any;
        } = JSON.parse(dataObject);
        let event = dataParsed.event;
        let data = dataParsed.data;
        if (event == "attack") {
            player.attack(data);
        }
        if (event == "special") {
            player.special(data);
        }
        if (event == "player move") {
            player.move(data);
        }
    }
    destroy(){
        clearInterval(this.timer);
    }
}