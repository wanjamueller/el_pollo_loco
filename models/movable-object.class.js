import { level1 } from "../levels/level1.js";
import { AudioHub } from "./AudioHub.class.js";
import { DrawableObject } from "./drawable-objects.class.js";

export class MovableObject extends DrawableObject {
    speed;
    otherDirection = false;
    acc = 2.5;
    energy = 100;
    lastHit = 0;
    throwObj = false;
    dead = false;
    soundPlayed = false;

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
        if (this.throwObj) {
            // Throwable objects should always fall endless
            return true;
        }
        return this.y < 155;
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

    collectCoins() {
        this.collectedCoins += 20;
        AudioHub.playOne(AudioHub.COIN_COLLECTED, true);
        if (this.collectedCoins < 0) {
            this.collectedCoins = 0;
        } else if (this.collectedCoins > 100) {
            this.collectedCoins = 100;
        }
    }

    collectBottles() {
        this.collectedBottles += 20;
        AudioHub.playOne(AudioHub.BOTTLE_COLLECTED, true);
        if (this.collectedBottles < 0) {
            this.collectedBottles = 0;
        } else if (this.collectedBottles > 100) {
            this.collectedBottles = 100;
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000; //difference in seconds
        return timePassed < 0.5;
    }

    // if energy = 0 0r smaller , then object is dead
    isDead() {
        return this.energy <= 0;
    }

    flipImage(ctx) {
        ctx.save();
        // ctx.translate(this.width, 0); // mirror in same spot and not at egde of img for PEPE
        ctx.translate(this.x * 2 + this.width, 0);
        ctx.scale(-1, 1);
        // this.x = this.x * -1; // mirrir x value for PEPE
    }

    flipImageBack(ctx) {
        // this.x = this.x * -1; // mirror x value for PEPE
        ctx.restore();
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

    removeEnemy(enemy) {
        if (enemy.isDead())
            setTimeout(() => {
                const index = level1.enemies.indexOf(enemy);
                if (index > -1) level1.enemies.splice(index, 1);
            }, 1000);
    }
}
