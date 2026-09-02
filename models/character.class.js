import { level1 } from "../levels/level1.js";
import { Imagehub } from "./image-hub.class.js";
import { IntervalHub } from "./intervallhub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {
    x = 120;
    y = 155;
    height = 280;
    width = 150;
    counter = 0;
    speed = 4;
    offset = {
        top: 120,
        right: 45,
        bottom: 15,
        left: 40,
    };
    showFrame = true; // frame for collision implementation
    lastActivity = new Date().getTime();

    constructor() {
        super();
        // loading images from Imagehub
        this.loadImage(Imagehub.PEPE.idle[0]);
        this.loadImages(Imagehub.PEPE.idle);
        this.loadImages(Imagehub.PEPE.move);
        this.loadImages(Imagehub.PEPE.jump);
        this.loadImages(Imagehub.PEPE.hurt);
        this.loadImages(Imagehub.PEPE.dead);
        this.loadImages(Imagehub.PEPE.long_idle);
        // starting intervalls for PEPE
        IntervalHub.startInterval(this.animatePEPE, 1000 / 10);
        IntervalHub.startInterval(this.move, 1000 / 60);
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
    }

    isLongIdle() {
        const secondsPassed = (new Date().getTime() - this.lastActivity) / 1000;
        return secondsPassed > 3;
    }

    // animate PEPE walking
    animatePEPE = () => {
        if (this.isDead()) {
            this.playAnimation(Imagehub.PEPE.dead);
        } else if (this.isHurt()) {
            this.playAnimation(Imagehub.PEPE.hurt);
        } else if (this.isAboveGround()) {
            this.playAnimation(Imagehub.PEPE.jump);
        } else if (Keyboard.RIGHT || Keyboard.LEFT) {
            this.playAnimation(Imagehub.PEPE.move);
            console.log(this.x);
        } else if (this.isLongIdle()) {
            this.playAnimation(Imagehub.PEPE.long_idle);
        } else {
            this.playAnimation(Imagehub.PEPE.idle);
        }
    };

    move = () => {
        if (Keyboard.RIGHT && this.x < level1.level_end_x) {
            // for now fix for level1, need to check on how to open for more levels
            this.otherDirection = false;
            this.moveRight();
            this.lastActivity = new Date().getTime();
        }
        if (Keyboard.LEFT && this.x > level1.level_start_x) {
            this.otherDirection = true;
            this.moveLeft();
            this.lastActivity = new Date().getTime();
        }
        if (Keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.lastActivity = new Date().getTime();
        }
    };
}
