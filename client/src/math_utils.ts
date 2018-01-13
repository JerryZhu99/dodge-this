import { Point, PointLike } from "pixi.js";

export class Vector extends Point{
    constructor(p: PointLike){
        super(p.x, p.y);
    }
    clone(){
        return new Vector(super.clone());
    }
    static coords(x: number, y:number){
        return new Vector(new Point(x,y));
    }
    /**
     * A zero vector.
     */
    static get zero(){
        return Vector.coords(0,0);
    }
    static add(a: Point, b: Point){
        return new Vector(a).add(b);
    }
    add(v: Point){
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    sub(v: Point){
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    scale(s: number){
        this.x *= s;
        this.y *= s;
        return this;
    }
    scaled(s: number){
        return Vector.coords(this.x * s, this.y * s);
    }
    length(len: number){
        return this.scale(len/this.magnitude);
    }
    get magnitude(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get normalized(){
        return this.clone().length(1);
    }
    normalize(){
        this.length(1);
    }
}