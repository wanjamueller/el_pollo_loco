import { IntervalHub } from "./intervallhub.class.js";

export class MovableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {};
    speed;
    otherDirection = false;
    counter;
    speed_y = 0;
    acc = 2.5;
    showFrame = false;

    constructor() {}
    // gravity for falling after jump
    applyGravity() {
        setInterval(() => {
            // "above" for falling and speed_y for jumping
            if (this.isAboveGround() || this.speed_y > 0) {
                this.y -= this.speed_y;
                this.speed_y -= this.acc;
            }
        }, 1000 / 25);
    }

    // for any animation when jumping flying....
    isAboveGround() {
        return this.y < 155;
    }

    // images need loading before drawing in world()
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    // pushing to world.addToMap()
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // // add frame to each object for collision implementation
    drawFrame(ctx) {
        if (this.showFrame) {
            ctx.beginPath();
            ctx.lineWidth = `5`;
            ctx.strokeStyle = `blue`;
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    flipImage(ctx) {
        ctx.save();
        ctx.translate(this.width, 0); // mirror in same spot and not at egde of img for PEPE
        ctx.scale(-1, 1);
        this.x = this.x * -1; // mirrir x value for PEPE
    }

    flipImageBack(ctx) {
        this.x = this.x * -1; // mirror x value for PEPE
        ctx.restore();
    }

    loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.counter % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.counter++;
    }

    moveRight = () => {
        this.x += this.speed;
    };

    moveLeft = () => {
        this.x -= this.speed;
    };

    jump() {
        this.speed_y = 30;
    }
}
