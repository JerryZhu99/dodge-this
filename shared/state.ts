import Projectile from "projectile";
import Player from "player";
import { Vector } from "./math-utils";

export default class State {
    players: Player[];
    projectiles: Projectile[];

    constructor(){
        this.players = new Array < Player > ();
        this.projectiles = new Array < Projectile > ();
    }

    createProjectile(p: Vector, v:Vector){
        return new Projectile(p, v);
    }

    addProjectile(p: Projectile) {
        this.projectiles.push(p);
        p.state = this;
    }

    removeProjectile(p: Projectile) {
        this.projectiles.splice(this.projectiles.indexOf(p), 1);
    }

    addPlayer(p: Player) {
        this.players.push(p);
        p.state = this;
    }

    removePlayer(p: Player) {
        this.players.splice(this.players.indexOf(p), 1);
    }
}