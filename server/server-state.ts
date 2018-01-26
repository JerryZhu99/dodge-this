import * as uuid from "uuid/v4";
import State from "shared/state";
import ServerPlayer from "server-player";
import Projectile from "shared/projectile";

/**
 * The server-side state of a game.
 */
export default class ServerState extends State {
    players: ServerPlayer[];
    constructor() {
        super();
    }

    addProjectile(p: Projectile) {
        super.addProjectile(p);
        p.id = uuid();
    }

    update(deltaTime: number) {
        super.update(deltaTime);
        for (let player of this.players) {
            player.socket.send("state", this.serialize());
        }
    }
}