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
    
    radius = 25;
    speedDecay = 0.96;

    projectileSpeed = 900;

    maxAcceleration: number;
    maxSpeed: number;

    id: string;
    team = 0;

    /**
     * The parent state of the player.
     */
    state: State;
    velocity: Vector;
    position: Vector;


    constructor(position: Coord, team: number = 0) {
        this.position = new Vector(position);
        this.velocity = Vector.zero;
        this.maxSpeed = 500;
        this.maxAcceleration = 500;
        this.team = team;
    }
    /**
     * Updates the player.
     * @param deltaTime 
     */
    update(deltaTime: number) {
        if(this.velocity.magnitude > this.maxSpeed) this.velocity.magnitude = this.maxSpeed;
        this.position = new Vector(this.position).add(this.velocity.scaled(deltaTime));
        this.velocity.scale(Math.pow(this.speedDecay, deltaTime*60));
    }

    /**
     * Moves the player in the given direction
     * @param dx 
     * @param dy 
     */
    move(dir: Coord){
        this.velocity.add(new Vector(dir).length(this.maxSpeed));
    }
    /**
     * Attacks a target location.a
     * @param p the target location.
     */
    attack(p: Coord) {
        let pvelocity = new Vector(p).sub(this.position).length(this.projectileSpeed);
        let projectile = this.state.createProjectile(this.position, pvelocity, this.team);
        projectile.team = this.team;
        this.state.addProjectile(projectile)
    }

    serialize() {
        return {
            id: this.id,
            team: this.team,
            position: this.position,
            velocity: this.velocity,
        }
    }
    deserialize(data: any) {
        this.team = data.team;
        this.position = new Vector(data.position),
        this.velocity = new Vector(data.velocity)
    }
}