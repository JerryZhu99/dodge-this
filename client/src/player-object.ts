import { Point, Container, Graphics, PointLike, DisplayObject } from "pixi.js";
import { Vector } from "./../../shared/math-utils";
import Projectile from "projectile-object";
import Player from "../../shared/player";

export default class PlayerObject extends Player{
    display: Container;
    constructor(position: Vector){
        super(position);
        this.display = new Container();
        let graphics = new Graphics();
        graphics.lineStyle(0);
        graphics.beginFill(0x0065FF, 0.9);
        graphics.drawCircle(0,0,25);
        graphics.endFill();
        this.display.addChild(graphics);
    }
    update(deltaTime: number){
        super.update(deltaTime);
        this.display.position.set(this.position.x, this.position.y);
    }

}