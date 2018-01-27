import * as uuid from "uuid/v4";
import State from "shared/state";
import ServerPlayer from "server-player";
import Projectile from "shared/projectile";
import SocketWrapper from "shared/socket-wrapper";

/**
 * The server-side state of a game.
 */
export default class ServerState extends State {
    players: ServerPlayer[];
    connections: SocketWrapper[];
    constructor() {
        super();
        this.connections = [];
    }

    addPlayer(player: ServerPlayer){
        super.addPlayer(player);
        player.id = uuid();
    }

    addProjectile(proj: Projectile) {
        super.addProjectile(proj);
        proj.id = uuid();
    }

    update(deltaTime: number) {
        super.update(deltaTime);
        for (let i = this.players.length - 1; i >= 0; i--) {
            const player = this.players[i];
            if (!player) continue;
            for (let j = this.projectiles.length - 1; j >= 0; j--) {
                const projectile = this.projectiles[j];
                if (!projectile) continue;
                if (projectile.position.distanceTo(player.position) <= player.radius) {
                    if(player.team != projectile.team){
                        this.removeProjectile(projectile);
                        this.removePlayer(player);
                        player.alive = false;
                    }
                }
            }
        }
        this.synchronize();
    }
    synchronize(){
        for(let socket of this.connections){
            socket.send("state", this.serialize());
        }
    }
    addConnection(player: ServerPlayer){
        this.connections.push(player.socket);
    }
    removeConnection(player: ServerPlayer){
        let index = this.connections.indexOf(player.socket);
        if(index != -1) this.connections.splice(index, 1);
    }
}