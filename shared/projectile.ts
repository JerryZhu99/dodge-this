import { Vector } from "math-utils";
import State from "state";

export default class Projectile{
    state: State;
    position: Vector;
    velocity: Vector;
    lifeTime: number;
    time: number;

    constructor(p: Vector, v: Vector){
        this.position = p;
        this.velocity = v;
        this.time = 0;
        this.lifeTime = 200;
    }
    update(deltaTime: number){
        this.time += deltaTime;
        this.position.add(this.velocity.scaled(deltaTime));
        if(this.time >= this.lifeTime){
            this.destroy();
        }
    }
    destroy(){
        this.state.removeProjectile(this);
    }
}