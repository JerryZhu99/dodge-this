import { Vector, Coord } from "math-utils";
import Projectile from "projectile";
import State from "state";
import { NetworkObject } from "network";

/**
 * Represents a player.
 */
export default class Player implements NetworkObject {

    radius = 20;
    speedDecay = 0.002;

    projectileSpeed = 900;

    maxAcceleration: number;
    maxSpeed: number;

    target: Coord;

    attacking: boolean;
    attackTime: number;
    attackCooldown: number;

    specialTime: number;
    specialCooldown: number;

    id: string;
    team = 0;
    alive: boolean;
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
        this.attackTime = 0;
        this.attackCooldown = 0.1;
        this.specialTime = 0;
        this.specialCooldown = 3;
        this.team = team;
        this.alive = true;
    }
    /**
     * Updates the player.
     * @param deltaTime 
     */
    update(deltaTime: number) {
        if (this.velocity.magnitude > this.maxSpeed) this.velocity.magnitude = this.maxSpeed;
        this.position = new Vector(this.position).add(this.velocity.scaled(deltaTime));
        this.velocity.scale(Math.pow(this.speedDecay, deltaTime));
        this.attackTime = Math.max(this.attackTime - deltaTime, 0);
        this.specialTime = Math.max(this.specialTime - deltaTime, 0);
    }

    /**
     * Moves the player in the given direction
     * @param dx 
     * @param dy 
     */
    move(dir: Coord) {
        if(!this.alive) return;
        this.velocity.add(new Vector(dir).length(this.maxSpeed));
    }
    /**
     * Attacks a target location.a
     * @param p the target location.
     */
    attack(p: Coord) {
        if(!this.alive) return;
        if (this.attackTime != 0) return;
        let pvelocity = new Vector(p).sub(this.position).length(this.projectileSpeed);
        let projectile = this.state.createProjectile(this.position.clone(), pvelocity, this.team);
        this.state.addProjectile(projectile);
        this.attackTime = this.attackCooldown;
    }

    special(p: Coord) {
        if(!this.alive) return;
        if (this.specialTime != 0) return;
        let velocityCenter = new Vector(p).sub(this.position).length(this.projectileSpeed);
        const spread = 30;
        const projectiles = 7;
        let v = velocityCenter.clone().rotate(- spread / 2);
        for (let i = 0; i < projectiles; i++) {
            let projectileCenter = this.state.createProjectile(this.position.clone(), v, this.team);
            this.state.addProjectile(projectileCenter);
            v = v.clone().rotate(spread / (projectiles - 1));
        }
        this.specialTime = this.specialCooldown;
    }

    serialize() {
        return {
            id: this.id,
            team: this.team,
            attackTime: this.attackTime,
            specialTime: this.specialTime,
            position: this.position,
            velocity: this.velocity,
            alive: this.alive,
        }
    }
    deserialize(data: any) {
        this.team = data.team;
        this.attackTime = data.attackTime;
        this.specialTime = data.specialTime;
        this.position = new Vector(data.position);
        this.velocity = new Vector(data.velocity);
        this.alive = data.alive;
    }
}