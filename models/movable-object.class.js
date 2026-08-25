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

    constructor() {}

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

    moveRight = () => {
        this.x += this.speed;
    };

    moveLeft = () => {
        this.x -= this.speed;
    };
}
