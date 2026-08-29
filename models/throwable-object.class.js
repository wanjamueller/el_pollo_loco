import { Imagehub } from "./image-hub.class.js";
import { IntervalHub } from "./intervallhub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class ThrowableObject extends MovableObject {
    x;
    y;
    height = 80;
    width = 60;
    counter = 0;
    throwObj = true;

    constructor(x, y) {
        super();
        this.loadImage(Imagehub.BOTTLES.flying[0]);
        this.loadImages(Imagehub.BOTTLES.flying);
        this.x = x; // receiving when thrown
        this.y = y; // receiving when thrown

        this.throw();
        IntervalHub.startInterval(this.animateBottle, 1000 / 10);
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
        IntervalHub.startInterval(this.speedX, 1000 / 40);
    }

    animateBottle = () => {
        this.playAnimation(Imagehub.BOTTLES.flying);
    };

    throw() {
        this.speed_y = 30;
        this.applyGravity();
        this.speedX();
    }

    speedX = () => {
        this.x += 10;
    };
}
