import { Container, Graphics } from "pixi.js";
import { Vector } from "shared/math-utils";
import Projectile from "shared/projectile";
import { teamColours } from "shared/teams";

export default class ProjectileObject extends Projectile {
    display: Container;
    trailPoints: Vector[];
    trail: Graphics;
    lead: Graphics;
    constructor(p: Vector, v: Vector, team: number) {
        super(p, v, team);
        this.display = new Container();
        this.trailPoints = new Array<Vector>();
        this.lead = new Graphics();
        this.trail = new Graphics();
        let graphics = new Graphics();
        graphics.lineStyle(0);
        graphics.beginFill(teamColours[team], 0.9);
        graphics.drawCircle(0, 0, this.radius);
        graphics.endFill();
        this.display.addChild(graphics);
        this.display.addChild(this.lead);
        this.display.addChild(this.trail);
        this.display.position.x = this.position.x;
        this.display.position.y = this.position.y;
    }
    update(deltaTime: number) {
        super.update(deltaTime);
        this.display.position.x = this.position.x;
        this.display.position.y = this.position.y;
        this.drawTrail();
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