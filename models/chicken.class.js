import { MovableObject } from "./movable-object.class.js";
import { Imagehub } from "./image-hub.class.js";
import { IntervalHub } from "./intervallhub.class.js";
import { AudioHub } from "./AudioHub.class.js";

/**
 * creates a normal chicken enemy
 * @class
 */
export class Chicken extends MovableObject {
    y = 360;
    height = 70;
    width = 70;
    counter = 0;
    speed = 0.3 + Math.random();
    offset = {
        top: 5,
        right: 5,
        bottom: 15,
        left: 5,
    };

    /**
     * loads the image sets, places the chicken at a random spot in the level and starts the intervals for animation and movement
     * the interval ids are stored so they can be cleared once the chicken is removed
     */
    constructor() {
        super();
        this.loadImage(Imagehub.CHICKEN.move[0]);
        this.loadImages(Imagehub.CHICKEN.move);
        this.loadImages(Imagehub.CHICKEN.dead);
        this.x = 300 + Math.random() * 2000;
        this.intervals.push(IntervalHub.startInterval(this.animate, 1000 / 10));
        this.intervals.push(IntervalHub.startInterval(this.moveLeft, 1000 / 60));
    }

    /**
     * plays the walking animation, or the dead frame once the chicken has no energy left
     * a dead chicken stops moving and its death sound is played only once
     */
    animate = () => {
        if (this.isDead()) {
            this.playAnimation(Imagehub.CHICKEN.dead);
            this.speed = 0;
            if (!this.soundPlayed) {
                AudioHub.playOne(AudioHub.CHICKEN_DEAD, true);
                this.soundPlayed = true;
            }
        } else {
            this.playAnimation(Imagehub.CHICKEN.move);
        }
    };

    /**
     * overrides the base hit so a single bottle or jump kills the chicken outright
     */
    hit() {
        this.energy -= 100;
    }
}
