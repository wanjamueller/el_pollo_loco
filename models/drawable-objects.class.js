export class DrawableObject {
    x;
    y;
    height;
    width;
    img;
    imageCache = {};
    counter; // for playanimation() of picture arrays
    percentage;
    collectedCoins = 0;
    collectedBottles = 0;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };
    // real frame of obj
    rX;
    rY;
    rW;
    rH;
    showFrame = false; // frame for collision implementation

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

    // defining real frame with formula to shorten drawFrame()
    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
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

    // Collision detection
    isColliding(obj) {
        return (
            this.rX + this.rW > obj.rX &&
            this.rY + this.rH > obj.rY &&
            this.rX < obj.rX + obj.rW &&
            this.rY < obj.rY + obj.rH
        );
    }
}
