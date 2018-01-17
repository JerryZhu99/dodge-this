import {
    Vector,
    Coord
} from "math-utils";
import Projectile from "projectile";
import State from "state";
import {
    PointLike
} from "pixi.js";
import { NetworkObject } from "./network";

/**
 * Represents a player.
 */
export default class Player implements NetworkObject{
    /**
     * The parent state of the player.
     */
    id: string;
    state: State;
    velocity: Vector;
    position: Vector;
    constructor(position: Coord) {
        this.position = new Vector(position);
        this.velocity = Vector.zero;
    }
    /**
     * Updates the player.
     * @param deltaTime 
     */
    update(deltaTime: number) {
        this.position = new Vector(this.position).add(this.velocity.scaled(deltaTime));
    }

    /**
     * Attacks a target location.
     * @param p the target location.
     */
    attack(p: Coord) {
        let pvelocity = new Vector(p).sub(this.position).length(15);
        this.state.addProjectile(this.state.createProjectile(this.position, pvelocity))
    }

    serialize() {
        return {
            id: this.id,
            position: this.position,
            velocity: this.velocity,
        }
    }
    deserialize(data: {
        position: Coord,
        velocity: Coord,
    }) {
        this.position = new Vector(data.position),
        this.velocity = new Vector(data.velocity)
    }
}