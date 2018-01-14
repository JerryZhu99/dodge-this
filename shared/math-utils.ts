

export class Vector{
    x: number;
    y: number;
    constructor(p: {x: number, y:number}){
        this.x = p.x;
        this.y = p.y;
    }
    clone(){
        return new Vector(this);
    }
    static coords(x: number, y:number){
        return new Vector({x:x, y:y});
    }
    /**
     * A zero vector.
     */
    static get zero(){
        return Vector.coords(0,0);
    }
    static add(a: Vector, b: Vector){
        return (new Vector(a)).add(b);
    }
    add(v: Vector){
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    sub(v: Vector){
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