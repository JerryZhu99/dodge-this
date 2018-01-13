import * as PIXI from "pixi.js";

export default class Graphics {
    renderables: Renderable[];
    context: CanvasRenderingContext2D;
    zoom = 1;
    centerX = 0;
    centerY = 0;
    get width() {
        return this.context.canvas.clientWidth;
    }
    get height() {
        return this.context.canvas.clientHeight;
    }
    public constructor(context: CanvasRenderingContext2D) {
        
        this.renderables = new Array<Renderable>();
        this.context = context;
        let width = this.width;
        let height = this.height;
        let viewportMin = Math.min(width, height);
        this.zoom = viewportMin / 1000.0;
        this.centerX = width / 2;
        this.centerY = height / 2;
    }

    resetTransforms() {
        this.context.translate(this.centerX, this.centerY);
        this.context.scale(this.zoom, this.zoom);
    }
    init() {
        let that = this;
        requestAnimationFrame(function () {
            that.draw();
        });
    }
    /**
     * Draws the canvas.
     */
    draw() {
        this.context.save();
        this.context.clearRect(0, 0, this.width, this.height);
        this.resetTransforms();
        for (const object of this.renderables) {
            this.context.save();
            object.draw(this.context);
            this.context.restore();
        }
        this.context.restore();
        let that = this;
        requestAnimationFrame(function () {
            that.draw();
        });
    }
}

export interface Renderable {
    draw(context: CanvasRenderingContext2D): void;
}