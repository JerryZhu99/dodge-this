import { Container, Graphics, Sprite, Point } from "pixi.js";
import { Vector } from "shared/math-utils";
import Projectile from "shared/projectile";
import { teamColours } from "shared/teams";
import { circle } from "./resources";

export default class ProjectileObject extends Projectile {
    display: Container;
    trailPoints: Vector[];
    trail: Graphics;
    lead: Graphics;
    constructor(p: Vector, v: Vector, team: number) {
        super(p, v, team);
        this.display = new Container();
        this.trailPoints = new Array<Vector>();
        let sprite = new Sprite(circle);
        sprite.scale = new Point(10/1024,10/1024);
        sprite.position = new Point(-5,-5);
        sprite.tint = teamColours[this.team];
        this.display.addChild(sprite);

        this.lead = new Graphics();
        this.display.addChild(this.lead);

        this.display.position.x = this.position.x;
        this.display.position.y = this.position.y;
    }
    update(deltaTime: number) {
        super.update(deltaTime);
        this.display.position.x = this.position.x * 0.5 + this.display.position.x * 0.5;
        this.display.position.y = this.position.y * 0.5 + this.display.position.y * 0.5;
        if(isNaN(this.display.position.y)) this.display.position.y = this.position.y;
        if(isNaN(this.display.position.x)) this.display.position.x = this.position.x;
        this.drawLead();
    }

    drawTrail() {
        let p = this.position;
        let g = this.trail;
        g.clear();
        g.moveTo(0, 0);
        for (let i = 0; i < this.trailPoints.length; i++) {
            let q = this.trailPoints[i];
            g.lineStyle((10 - i) / 10 * this.radius, teamColours[this.team], (10 - i) / 10);
            g.lineTo(q.x - p.x, q.y - p.y);
        }
        this.trailPoints.unshift(new Vector(p));
        if (this.trailPoints.length > 10) this.trailPoints.pop();
    }

    drawLead() {
        let p = this.position;
        let g = this.lead;
        g.clear();
        g.lineStyle(2, teamColours[this.team], 0.4);
        g.moveTo(0, 0);
        let d = this.velocity.scaled(this.lifeTime - this.time)
        g.lineTo(d.x, d.y);
    }
}