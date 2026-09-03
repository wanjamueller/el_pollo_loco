import { level1 } from "../levels/level1.js";
import { AudioHub } from "./AudioHub.class.js";
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

    deadAnimation() {
        this.playAnimation(Imagehub.PEPE.dead);
        AudioHub.playOne(AudioHub.CHARACTER_DEAD, false);
        AudioHub.stopOne(AudioHub.CHARACTER_RUN);
    }

    idleAnimation() {
        AudioHub.stopOne(AudioHub.CHARACTER_RUN);
        this.playAnimation(Imagehub.PEPE.idle);
    }

    longIdleAnimation() {
        AudioHub.stopOne(AudioHub.CHARACTER_RUN);
        this.playAnimation(Imagehub.PEPE.long_idle);
        AudioHub.playOne(AudioHub.CHARACTER_SNORING, false);
    }

    hurtAnimation() {
        this.playAnimation(Imagehub.PEPE.hurt);
        AudioHub.stopOne(AudioHub.CHARACTER_RUN);
        AudioHub.playOne(AudioHub.CHARACTER_DAMAGE, true);
    }

    walkingAnimation() {
        this.playAnimation(Imagehub.PEPE.move);
        AudioHub.playOne(AudioHub.CHARACTER_RUN, false);
    }

    jumpAnimation() {
        AudioHub.stopOne(AudioHub.CHARACTER_RUN);
        AudioHub.playOne(AudioHub.CHARACTER_JUMP, true);
    }

    aboveGroundAnimation() {
        AudioHub.stopOne(AudioHub.CHARACTER_RUN);
        this.playAnimation(Imagehub.PEPE.jump);
    }

    // animate PEPE walking
    animatePEPE = () => {
        if (this.isDead()) {
            this.deadAnimation();
        } else if (this.isHurt()) {
            this.hurtAnimation();
        } else if (this.isAboveGround()) {
            this.aboveGroundAnimation();
        } else if (Keyboard.RIGHT || Keyboard.LEFT) {
            this.walkingAnimation();
        } else if (this.isLongIdle()) {
            this.longIdleAnimation();
        } else {
            this.idleAnimation();
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
            this.jumpAnimation(); // in here, as the sound is not triggered while above ground, but only once at the jump
            this.lastActivity = new Date().getTime();
        }
    };
}
