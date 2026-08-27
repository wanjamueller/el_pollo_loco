import { Character } from "./character.class.js";
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
    showFrame = false;
    energy = 100;
    lastHit = 0;

    constructor() {
        this.getRealFrame();
    }

    // gravity for falling after jump
    applyGravity = () => {
        // "above" for falling and speed_y for jumping
        if (this.isAboveGround() || this.speed_y > 0) {
            this.y -= this.speed_y;
            this.speed_y -= this.acc;
        }
    };

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
            this.getRealFrame();
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

    // object getting hit reduces eneergy by 5
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000; //difference in seconds
        return timePassed < 1;
    }

    // if energy = 0 , then object is dead
    isDead() {
        return this.energy === 0;
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
        let i = this.counter % images.length; // counter starting at 0 ending at length of array
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
