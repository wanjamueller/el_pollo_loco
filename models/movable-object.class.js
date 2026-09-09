import { level1 } from "../levels/level1.js";
import { AudioHub } from "./AudioHub.class.js";
import { DrawableObject } from "./drawable-objects.class.js";

/**
 * creates all moving objects
 * @class
 */
export class MovableObject extends DrawableObject {
    speed;
    otherDirection = false;
    acc = 2.5;
    energy = 100;
    lastHit = 0;
    throwObj = false;
    dead = false;
    soundPlayed = false;
    intervals = [];

    /**
     * gravity for falling after jump
     * "above" for falling and speed_y for jumping
     *
     */
    applyGravity = () => {
        if (this.isAboveGround() || this.speed_y > 0) {
            this.y -= this.speed_y;
            this.speed_y -= this.acc;
        }
    };

    /**
     * for any animation when jumping / flying
     * @returns {boolean} True while the object is off the ground
     * Throwable objects should always fall endless
     */
    isAboveGround() {
        if (this.throwObj) {
            return true;
        }
        return this.y < 155;
    }

    /**
     * object getting hit reduces eneergy by 5
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * collecting coins
     */
    collectCoins() {
        this.collectedCoins += 20;
        AudioHub.playOne(AudioHub.COIN_COLLECTED, true);
        if (this.collectedCoins < 0) {
            this.collectedCoins = 0;
        } else if (this.collectedCoins > 100) {
            this.collectedCoins = 100;
        }
    }

    /**
     * collecting bottles
     */
    collectBottles() {
        this.collectedBottles += 20;
        AudioHub.playOne(AudioHub.BOTTLE_COLLECTED, true);
        if (this.collectedBottles < 0) {
            this.collectedBottles = 0;
        } else if (this.collectedBottles > 100) {
            this.collectedBottles = 100;
        }
    }

    /**
     * checks if the object was hit within the last half second
     * @returns {boolean} True while the hurt animation should play.
     * / 1000 = difference in seconds
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }

    /**
     * if energy = 0 or smaller , then object is dead
     * @returns {boolean} True when the object has no energy left.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * mirrors the canvas so the object faces the other way
     * @param {CanvasRenderingContext2D} ctx - The canvas context to transform.
     */
    flipImage(ctx) {
        ctx.save();
        ctx.translate(this.x * 2 + this.width, 0);
        ctx.scale(-1, 1);
    }

    /**
     * undoes the mirroring so following objects draw normally
     * @param {CanvasRenderingContext2D} ctx - The canvas context to restore.
     */
    flipImageBack(ctx) {
        ctx.restore();
    }

    /**
     * shows the next frame of an animation and advances the counter
     * @param {string[]} images - Image paths from the Imagehub.
     * counter starting at 0 ending at length of array
     */
    playAnimation(images) {
        let i = this.counter % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.counter++;
    }

    /**
     * moves the object right by its own speed
     */
    moveRight = () => {
        this.x += this.speed;
    };

    /**
     * moves the object left by its own speed
     */
    moveLeft = () => {
        this.x -= this.speed;
    };

    /**
     * sets the upward speed so gravity can carry the jump
     */
    jump() {
        this.speed_y = 30;
    }

    /**
     * splices a dead enemy out of the level after a delay
     * @param {MovableObject} enemy - The enemy to remove.
     */
    removeEnemy(enemy) {
        if (enemy.isDead())
            setTimeout(() => {
                enemy.stopIntervals();
                const index = level1.enemies.indexOf(enemy);
                if (index > -1) level1.enemies.splice(index, 1);
            }, 1000);
    }

    /**
     * to kill intervals of thrown bootles and dead chicken to save rescources
     * intervals = []
     */
    stopIntervals() {
        this.intervals.forEach((id) => clearInterval(id));
        this.intervals = [];
    }
}
