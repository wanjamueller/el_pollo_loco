import { level1 } from "../levels/level1.js";
import { Imagehub } from "./image-hub.class.js";
import { IntervalHub } from "./intervallhub.class.js";
import { MovableObject } from "./movable-object.class.js";
import { World } from "./world.class.js";

export class Endboss extends MovableObject {
    y = 230;
    x = 1500; // fix for now, based on level1
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
        this.speed = 10;
        this.moveLeft();
    }

    attack() {
        this.speed = 20;
        this.moveLeft();
    }

    // animate endboss walking
    animate = () => {
        // this.playAnimation(Imagehub.ENDBOSS.alert);
        if (this.isDead()) {
            this.playAnimation(Imagehub.ENDBOSS.dead);
        } else if (this.isHurt()) {
            this.playAnimation(Imagehub.ENDBOSS.hurt);
        } else if (this.startMoving) {
            this.playAnimation(Imagehub.ENDBOSS.move);
        } else if (this.attack) {
            this.playAnimation(Imagehub.ENDBOSS.attack);
        } else {
            this.playAnimation(Imagehub.ENDBOSS.alert);
        }
    };

    // chicken getting hit rreduces energy by 20
    hit(i) {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    removeEnemy(enemy) {
        if (enemy.isDead())
            setTimeout(() => {
                const index = level1.boss.indexOf(enemy);
                if (index > -1) level1.boss.splice(index, 1);
            }, 3000);
    }
}
