import { MovableObject } from "./movable-object.class.js";
import { Imagehub } from "./image-hub.class.js";
import { IntervalHub } from "./intervallhub.class.js";
import { AudioHub } from "./AudioHub.class.js";

/**
 * creates a small chicken enemy
 * @class
 */
export class SmallChicken extends MovableObject {
    y = 365;
    height = 60;
    width = 65;
    counter = 0;
    speed = 0.3 + Math.random();
    offset = {
        top: 5,
        right: 5,
        bottom: 15,
        left: 5,
    };

    /**
     * loads the image sets, places the small chicken at a random spot in the level and starts the intervals for animation and movement
     * the interval ids are stored so they can be cleared once the small chicken is removed
     */
    constructor() {
        super();
        this.loadImage(Imagehub.SMALL_CHICKEN.move[0]);
        this.loadImages(Imagehub.SMALL_CHICKEN.move);
        this.loadImages(Imagehub.SMALL_CHICKEN.dead);
        this.x = 300 + Math.random() * 2000;
        this.intervals.push(IntervalHub.startInterval(this.animate, 1000 / 10));
        this.intervals.push(IntervalHub.startInterval(this.moveLeft, 1000 / 60));
    }

    /**
     * plays the walking animation, or the dead frame once the small chicken has no energy left
     * a dead chicken stops moving and its death sound is played only once
     */
    animate = () => {
        if (this.isDead()) {
            this.playAnimation(Imagehub.SMALL_CHICKEN.dead);
            this.speed = 0;
            if (!this.soundPlayed) {
                AudioHub.playOne(AudioHub.CHICKEN_DEAD, true);
                this.soundPlayed = true;
            }
        } else {
            this.playAnimation(Imagehub.SMALL_CHICKEN.move);
        }
    };

    /**
     * overrides the base hit so a single bottle or jump kills the small chicken outright
     */
    hit() {
        this.energy -= 100;
    }
}
