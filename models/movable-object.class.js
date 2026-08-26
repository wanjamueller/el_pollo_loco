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

    constructor() {}
    // gravity for falling after jump

    applyGravity() {
        setInterval(() => {
            if (this.y < 155) {
                this.y -= this.speed_y;
                this.speed_y -= this.acc;
            }
        }, 1000 / 25);
    }

    // images need loading before drawing in world()
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
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
}
