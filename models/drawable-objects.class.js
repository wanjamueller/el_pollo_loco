export class DrawableObject {
    x;
    y;
    height;
    width;
    img;
    imageCache = {};
    counter;
    showFrame = false; // frame for collision implementation
    percentage;

    // images need loading before drawing in world()
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    // pushing to world.addToMap()
    draw(ctx) {
        // this.getRealFrame();
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    // // add frame to each object for collision implementation
    drawFrame(ctx) {
        if (this.showFrame) {
            this.getRealFrame(); // could go into constructor, but needs cleaning up after adding super class drawable
            ctx.beginPath();
            ctx.lineWidth = `5`;
            ctx.strokeStyle = `blue`;
            ctx.rect(this.rX, this.rY, this.rW, this.rH);
            ctx.stroke();
        }
    }
}
