
/**
 * A coordinate (x,y) in 2d.
 */
export class Coord{
    constructor(x: number, y: number){
        this.x=x;
        this.y=y;
    }
    x: number;
    y: number;
}
/**
 * A 2d vector (x,y). 
 */
export class Vector extends Coord{
    constructor(p: Coord){
        super(p.x, p.y);
    }
    clone(){
        return new Vector(this);
    }
    /**
     * Creates a vector (x,y)
     * @param x 
     * @param y 
     */
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
        return a.clone().add(b);
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
    /**
     * Scales this vector by s.
     * @param s 
     */
    scale(s: number){
        this.x *= s;
        this.y *= s;
        return this;
    }

    /**
     * Returns a copy of this vector scaled.
     * @param s The scale factor.
     */
    scaled(s: number){
        return this.clone().scale(s);
    }
    /**
     * Sets the length of this vector.
     * @param len 
     */
    length(len: number){
        return this.scale(len/this.magnitude);
    }

    /**
     * The length of this vector.
     */
    get magnitude(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    set magnitude(len: number){
        this.length(len);
    }
    /**
     * Returns a copy of this vector with length 1.
     */
    normalized(){
        return this.clone().length(1);
    }
    /**
     * Sets the length of this vector to 1.
     */
    normalize(){
        return this.length(1);
    }
}