
/**
 * A coordinate (x,y) in 2d.
 */
export class Coord {
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    x: number;
    y: number;
}
/**
 * A 2d vector (x,y). 
 */
export class Vector extends Coord {
    constructor(p: Coord) {
        super(p.x, p.y);
    }
    clone() {
        return new Vector(this);
    }
    /**
     * Creates a vector (x,y)
     * @param x 
     * @param y 
     */
    static coords(x: number, y: number) {
        return new Vector({ x: x, y: y });
    }
    /**
     * A zero vector.
     */
    static get zero() {
        return Vector.coords(0, 0);
    }

    /**
     * Adds the given coordinates to this vector.  
     */
    add(v: Coord) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    /**
     * Subtracts the given coordinates to this vector.  
     */
    sub(v: Coord) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    /**
     * Rotates the given vector *counterclockwise* by the given angle.
     * @param angle the angle in degrees
     */
    rotate(angle: number) {
        let rads = angle * Math.PI / 180.0;
        let x = this.x;
        let y = this.y;
        this.x = x * Math.cos(rads) - y * Math.sin(rads);
        this.y = x * Math.sin(rads) + y * Math.cos(rads);
        return this;
    }

    /**
     * Scales this vector by s.
     * @param s 
     */
    scale(s: number) {
        this.x *= s;
        this.y *= s;
        return this;
    }

    /**
     * Returns a copy of this vector scaled.
     * @param s The scale factor.
     */
    scaled(s: number) {
        return this.clone().scale(s);
    }

    /**
     * Sets the length of this vector.
     * @param len 
     */
    length(len: number) {
        return this.magnitude == 0 ? this : this.scale(len / this.magnitude);
    }

    /**
     * The length of this vector.
     */
    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    set magnitude(len: number) {
        this.length(len);
    }
    /**
     * Returns a copy of this vector with length 1.
     */
    normalized() {
        return this.clone().length(1);
    }
    /**
     * Sets the length of this vector to 1.
     */
    normalize() {
        return this.length(1);
    }

    distanceTo(p: Coord) {
        return Math.hypot((this.x - p.x), (this.y - p.y));
    }
}