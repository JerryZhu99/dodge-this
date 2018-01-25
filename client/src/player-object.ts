import { Point, Container, Graphics, PointLike, DisplayObject } from "pixi.js";
import { Vector, Coord } from "shared/math-utils";
import Projectile from "projectile-object";
import Player from "shared/player";
import { state } from "app";

/**
 * THe client representation of a player.
 */
export default class PlayerObject extends Player{
    
    isLocalPlayer: boolean;
    /**
     * The player's object to display.
     */
    display: Container;

    constructor(position: Vector){
        super(position);
        this.display = new Container();
        let graphics = new Graphics();
        graphics.lineStyle(0);
        graphics.beginFill(0x0065FF, 0.9);
        graphics.drawCircle(0,0, this.radius);
        graphics.endFill();
        this.display.addChild(graphics);
    }
    
    update(deltaTime: number){
        super.update(deltaTime);
        this.display.position.set(this.position.x, this.position.y);
    }

    move(dir: Coord){
        super.move(dir);
        if(this.isLocalPlayer){
            state.socket.send("player move", dir);
        }
    }

    attack(p: Coord){
        super.attack(p);
        if(this.isLocalPlayer){
            state.socket.send("player attack", p);
        }
    }

}