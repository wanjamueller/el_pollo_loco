import { level1 } from "../levels/level1.js";
import { AudioHub } from "./AudioHub.class.js";
import { Imagehub } from "./image-hub.class.js";
import { IntervalHub } from "./intervallhub.class.js";
import { MovableObject } from "./movable-object.class.js";

/**
 * creates the endboss, the final enemy of the level
 * @class
 */
export class Endboss extends MovableObject {
    y = 140;
    x = 2300;
    height = 300;
    width = 300;
    counter = 0;
    speed = 0;
    offset = {
        top: 40,
        right: 30,
        bottom: 30,
        left: 20,
    };
    moving = false;
    attacking = false;

    /**
     * loads all image sets from the Imagehub and starts the animation interval
     * the endboss stays in place until the character comes close enough
     */
    constructor() {
        super();
        this.loadImage(Imagehub.ENDBOSS.alert[0]);
        this.loadImages(Imagehub.ENDBOSS.alert);
        this.loadImages(Imagehub.ENDBOSS.dead);
        this.loadImages(Imagehub.ENDBOSS.hurt);
        this.loadImages(Imagehub.ENDBOSS.move);
        this.loadImages(Imagehub.ENDBOSS.attack);
        IntervalHub.startInterval(this.animate, 1000 / 10);
    }

    /**
     * wakes the endboss up once, the guard stops a new movement interval being stacked on every call
     */
    startMoving() {
        if (!this.moving && !this.isDead()) {
            this.moving = true;
            IntervalHub.startInterval(this.walkAgain, 1000 / 60);
        }
    }

    /**
     * gives the endboss his walking speed again after an attack has finished
     */
    walkAgain = () => {
        if (!this.attacking && !this.isDead()) {
            this.speed = 10;
            AudioHub.playOne(AudioHub.ENDBOSS_APPROACH, false);
        }
    };

    /**
     * starts an attack that lasts as long as the attack animation, then hands back to walking
     */
    attack() {
        if (!this.attacking && !this.isDead()) {
            this.moving = false;
            this.speed = 6;
            this.attacking = true;
            setTimeout(() => (this.attacking = false), 1000);
            this.startMoving();
        }
    }

    /**
     * plays the death animation, stops the endboss and plays the death sound only once
     */
    deadAnimation() {
        this.playAnimation(Imagehub.ENDBOSS.dead);
        this.dead = true;
        this.speed = 0;
        if (!this.soundPlayed) {
            AudioHub.playOne(AudioHub.CHICKEN_DEAD_2, false);
            this.soundPlayed = true;
        }
    }

    /**
     * plays the hurt animation and sound after the endboss was hit by a bottle
     */
    hurtAnimation() {
        this.playAnimation(Imagehub.ENDBOSS.hurt);
        AudioHub.playOne(AudioHub.CHICKEN_DEAD_2, false);
    }

    /**
     * picks the animation that fits the endboss current state, checked from most to least important
     * standing still also stops the approach sound
     */
    animate = () => {
        if (this.isDead()) {
            this.deadAnimation();
        } else if (this.isHurt()) {
            this.hurtAnimation();
        } else if (this.attacking) {
            this.playAnimation(Imagehub.ENDBOSS.attack);
        } else if (this.moving) {
            this.playAnimation(Imagehub.ENDBOSS.move);
        } else if (!this.moving) {
            this.playAnimation(Imagehub.ENDBOSS.alert);
            AudioHub.stopOne(AudioHub.ENDBOSS_APPROACH);
        }
    };

    /**
     * overrides the base hit, the endboss needs five bottles before he is dead
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * splices the dead endboss out of the level after a delay so the death animation can play
     * @param {Endboss} enemy - The endboss to remove.
     */
    removeEnemy(enemy) {
        if (enemy.isDead()) {
            this.speed = 0;
            setTimeout(() => {
                const index = level1.boss.indexOf(enemy);
                if (index > -1) level1.boss.splice(index, 1);
            }, 3000);
        }
    }
}
