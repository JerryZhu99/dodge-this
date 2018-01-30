import { Container, Graphics, Sprite, Point } from "pixi.js";
import { Vector, Coord } from "shared/math-utils";
import Projectile from "projectile-object";
import Player from "shared/player";
import { teamColours } from "shared/teams";
import ClientState from "client-state";
import { circle } from "./resources";

/**
 * THe client representation of a player.
 */
export default class PlayerObject extends Player {

    isLocalPlayer: boolean;
    /**
     * The player's object to display.
     */
    display: Container;
    state: ClientState;

    constructor(position: Vector, team: number = 0) {
        super(position, team);
        this.display = new Container();
        let sprite = new Sprite(circle);
        sprite.scale = new Point(40/1024,40/1024);
        sprite.position = new Point(-20,-20);
        sprite.tint = teamColours[this.team];
        this.display.addChild(sprite);
    }

    update(deltaTime: number) {
        super.update(deltaTime);
        this.display.position.x = this.position.x * 0.5 + this.display.position.x * 0.5;
        this.display.position.y = this.position.y * 0.5 + this.display.position.y * 0.5;
        if(isNaN(this.display.position.y)) this.display.position.y = this.position.y;
        if(isNaN(this.display.position.x)) this.display.position.x = this.position.x;
    }

    move(dir: Coord) {
        super.move(dir);
        if (this.isLocalPlayer) {
            this.state.socket.send("player move", dir);
        }
    }

    special(p: Coord) {
        super.special(p);
        if (this.isLocalPlayer) {
            this.state.socket.send("special", p);
        }
    }

}