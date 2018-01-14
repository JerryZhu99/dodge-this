import { Vector } from "math-utils";
import Projectile from "projectile";
import State from "state";
import { PointLike } from "pixi.js";


export default class Player{
    state: State;
    velocity: Vector;
    position: Vector;
    constructor(position: Vector){
        this.position = new Vector(position);
        this.velocity = Vector.zero;
    }
    update(deltaTime: number){
        this.position = new Vector(this.position).add(this.velocity.scaled(deltaTime));
    }

    attack(p: PointLike){
        let pvelocity = new Vector(p).sub(this.position).length(15);
        this.state.addProjectile(this.state.createProjectile(this.position, pvelocity))
    }
    
}