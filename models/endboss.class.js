import { level1 } from "../levels/level1.js";
import { Imagehub } from "./image-hub.class.js";
import { IntervalHub } from "./intervallhub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Endboss extends MovableObject {
    y = 230;
    x = 2300; // fix for now, based on level1
    height = 200;
    width = 200;
    counter = 0;
    speed = 0.7;
    offset = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 20,
    };
    moving = false;
    attacking = false;
    showFrame = true; // frame for collision implementation

    constructor() {
        super();
        // loading images from Imagehub
        this.loadImage(Imagehub.ENDBOSS.alert[0]);
        this.loadImages(Imagehub.ENDBOSS.alert);
        this.loadImages(Imagehub.ENDBOSS.dead);
        this.loadImages(Imagehub.ENDBOSS.hurt);
        this.loadImages(Imagehub.ENDBOSS.move);
        this.loadImages(Imagehub.ENDBOSS.attack);
        // start intervall for moving endboss
        IntervalHub.startInterval(this.animate, 1000 / 10);
        // IntervalHub.startInterval(this.moveLeft, 1000 / 60);
    }

    startMoving() {
        if (!this.moving && !this.isDead()) {
            this.moving = true; // turns on move animation
            IntervalHub.startInterval(this.walkAgain, 1000 / 60);
        }
    }

    walkAgain = () => {
        if (!this.attacking && !this.isDead()) {
            this.speed = 5;
            // this.moveLeft();
        }
    };

    attack() {
        if (!this.attacking && !this.isDead()) {
            this.moving = false;
            this.speed = 0;
            this.attacking = true;
            setTimeout(() => (this.attacking = false), 800); // length of the attack animation
            this.startMoving();
        }
    }

    // animate endboss walking
    animate = () => {
        if (this.isDead()) {
            this.playAnimation(Imagehub.ENDBOSS.dead);
        } else if (this.isHurt()) {
            this.playAnimation(Imagehub.ENDBOSS.hurt);
        } else if (this.attacking) {
            this.playAnimation(Imagehub.ENDBOSS.attack);
        } else if (this.moving) {
            this.playAnimation(Imagehub.ENDBOSS.move);
        } else {
            this.playAnimation(Imagehub.ENDBOSS.alert);
        }
    };

    // chicken getting hit rreduces energy by 20
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

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
