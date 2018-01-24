import { Vector, Coord } from "math-utils";
import State from "state";
import { NetworkObject } from "./network";

/**
 * A projectile.
 * 
 */
export default class Projectile implements NetworkObject{
    id: string;
    /**
     * The parent state.
     */
    state: State;
    
    position: Vector;
    velocity: Vector;
    /**
     * The maximum duration of the projectile.
     */
    lifeTime: number;
    /**
     * The amount of time since the projectile was instantiated.
     */
    time: number;

    constructor(p: Vector, v: Vector){
        this.position = p;
        this.velocity = v;
        this.time = 0;
        this.lifeTime = 2;
    }
    update(deltaTime: number){
        this.time += deltaTime;
        this.position.add(this.velocity.scaled(deltaTime));
        if(this.time >= this.lifeTime){
            this.destroy();
        }
    }
    /**
     * Removes the projectile from the state.
     */
    destroy(){
        this.state.removeProjectile(this);
    }

    serialize() {
        return {
            id: this.id,
            position: this.position,
            velocity: this.velocity,
        }
    }

    deserialize(data: any) {
        this.position = new Vector(data.position),
        this.velocity = new Vector(data.velocity)
    }
}