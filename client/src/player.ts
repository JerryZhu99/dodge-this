import { Renderable } from "graphics";
import { Point, Container, Graphics, PointLike } from "pixi.js";
import { Vector } from "math_utils";
import { projectiles } from "game";
import Projectile from "projectile";

export default class Player extends Container{
    velocity: Vector;
    position: Vector;
    constructor(position: Point){
        super();
        this.position = new Vector(position);
        this.velocity = Vector.zero;
        let graphics = new Graphics();
        graphics.lineStyle(0);
        graphics.beginFill(0x0065FF, 0.9);
        graphics.drawCircle(0,0,25);
        graphics.endFill();
        this.addChild(graphics);
    }
    update(deltaTime: number){
        this.position = new Vector(this.position).add(this.velocity.scaled(deltaTime));
    }

    attack(p: Point){
        projectiles.addChild(new Projectile(this.position, new Vector(p).sub(this.position).length(15)))
    }
}