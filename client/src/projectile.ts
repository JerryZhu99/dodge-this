import { Container, Graphics, Point } from "pixi.js";
import { Vector } from "./math_utils";
import { projectiles } from "./game";



export default class Projectile extends Container{
    velocity: Vector;
    lifeTime: number;
    time: number;
    trailPoints: Point[];
    trail: Graphics;
    lead: Graphics;
    constructor(p: Point, v: Point){
        super();
        this.position = p;
        this.velocity = new Vector(v);
        this.time = 0;
        this.lifeTime = 200;
        this.trailPoints = new Array<Point>()
        this.lead = new Graphics();
        this.trail = new Graphics();
        let graphics = new Graphics();
        graphics.lineStyle(0);
        graphics.beginFill(0x00A5FF, 0.9);
        graphics.drawCircle(0,0,5);
        graphics.endFill();
        this.addChild(graphics);
        this.addChild(this.lead);
        this.addChild(this.trail);
    }
    update(deltaTime: number){
        this.time += deltaTime;
        this.position = new Vector(this.position).add(this.velocity.scaled(deltaTime));
        if(this.time >= this.lifeTime){
            projectiles.removeChild(this);
        }
        this.drawTrail();
        this.drawLead();
    }
    drawTrail(){
        let p = this.position;
        let g = this.trail;
        g.clear();
        g.moveTo(0, 0);
        for(let i = 0; i< this.trailPoints.length; i++){
            let q = this.trailPoints[i];
            g.lineStyle((10 - i) / 10 * 5, 0x0065FF, (10 - i) / 10);
            g.lineTo(q.x - p.x, q.y - p.y);
        }
        this.trailPoints.unshift(new Point(p.x, p.y));
        if(this.trailPoints.length > 10) this.trailPoints.pop();
    }
    drawLead(){
        let p = this.position;
        let g = this.lead;
        g.clear();
        g.lineStyle(2, 0x0065FF, 0.4);
        g.moveTo(0, 0);
        let d = this.velocity.scaled(this.lifeTime - this.time)
        g.lineTo(d.x,d.y);
    }
}