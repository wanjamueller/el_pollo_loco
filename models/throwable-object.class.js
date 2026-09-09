import { AudioHub } from "./AudioHub.class.js";
import { Imagehub } from "./image-hub.class.js";
import { IntervalHub } from "./intervallhub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class ThrowableObject extends MovableObject {
    x;
    y;
    height = 80;
    width = 60;
    counter = 0;
    offset = {
        top: 15,
        right: 20,
        bottom: 10,
        left: 20,
    };
    speed = 10;
    throwObj = true;
    hitEnemy = false;
    throwReversed = Imagehub.BOTTLES.flying.reverse(); // for throwing left

    constructor(x, y) {
        super();
        this.loadImage(Imagehub.BOTTLES.flying[0]);
        this.loadImages(Imagehub.BOTTLES.flying);
        this.loadImages(Imagehub.BOTTLES.splash);
        this.x = x; // receiving when thrown
        this.y = y; // receiving when thrown

        this.throw();
        this.intervals.push(IntervalHub.startInterval(this.animateBottle, 1000 / 10));
        this.intervals.push(IntervalHub.startInterval(this.applyGravity, 1000 / 25));
        this.intervals.push(IntervalHub.startInterval(this.speedX, 1000 / 40));
    }

    animateBottle = () => {
        if (this.hitEnemy) {
            this.playAnimation(Imagehub.BOTTLES.splash);
        } else if (this.otherDirection) {
            this.playAnimation(this.throwReversed); // animation reversed when throwing left
        } else {
            this.playAnimation(Imagehub.BOTTLES.flying);
        }
    };

    // if bottle hits Endboss
    hit() {
        this.hitEnemy = true; // for starting animation of splash in animateBottle
        this.speed = 0; // stops movement to right
        this.speed_y = -2; // slows down movement after splash
        this.acc = 0;
        AudioHub.playOne(AudioHub.BOTTLE_BREAK, true);
    }

    throw() {
        if (this.otherDirection) {
            this.speed_y = -30;
            this.applyGravity();
            this.speedX();
        } else {
            this.speed_y = 30;
            this.applyGravity();
            this.speedX();
        }
    }

    speedX = () => {
        this.x += this.otherDirection ? -this.speed : this.speed; // The ternary: condition ? valueIfTrue : valueIfFalse
        if (this.y > 500) this.hitEnemy = true; // ensures bottles, that never hit are spliced
    };
}
