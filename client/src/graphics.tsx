

export default class Graphics {
    context: CanvasRenderingContext2D;
    zoom = 1;
    centerX = 0;
    centerY = 0;
    get width(){
        return this.context.canvas.clientWidth;
    }
    get height(){
        return this.context.canvas.clientHeight;
    }
    public constructor(context: CanvasRenderingContext2D){
        console.log(context);
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
        requestAnimationFrame(this.draw)
    }
    /**
     * Draws the canvas.
     */
    draw() {
        this.context.save();
        this.context.clearRect(0, 0, this.width, this.height);
        this.resetTransforms();
        this.context.fillRect(0, 0, 500, -500 + (Date.now() % 1000));
        this.context.restore();
        window.requestAnimationFrame(this.draw);
    }
}