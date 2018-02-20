import ServerPlayer from "./server-player";
import * as uuid from "uuid/v4";

export default class LobbyManager {
    private lobbies: Map<string, Lobby>;
    constructor() {
        this.lobbies = new Map<string, Lobby>();
    }
    getLobbies() {
        return [...this.lobbies.values()];
    }
    getLobby(id: string) {
        return this.lobbies.get(id);
    }
    createLobby(host: ServerPlayer) {
        let lobby = new Lobby(host);
        this.lobbies.set(lobby.id, lobby);
    }
    deleteLobby(id: string): void
    deleteLobby(lobby: Lobby): void
    deleteLobby(lobby: string | Lobby) {
        if (typeof lobby == "string") {
            this.lobbies.delete(lobby);
        } else {
            this.lobbies.delete(lobby.id);
        }
    }

}

class Lobby {
    id: string;
    players: ServerPlayer[];
    constructor(host: ServerPlayer) {
        this.players.push(host);
        this.id = uuid();
    }
    addPlayer(player: ServerPlayer) {
        this.players.push(player);
    }
    removePlayer(id: string): void
    removePlayer(player: ServerPlayer): void
    removePlayer(player: string | ServerPlayer) {
        let index = -1;
        if (typeof player == "string") {
            index = this.players.findIndex(p => p.id == player);
        } else {
            index = this.players.indexOf(player);
        }
        if (index != -1) this.players.splice(index, 1);
    }
}