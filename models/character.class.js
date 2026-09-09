import { level1 } from "../levels/level1.js";
import { AudioHub } from "./AudioHub.class.js";
import { Imagehub } from "./image-hub.class.js";
import { IntervalHub } from "./intervallhub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./movable-object.class.js";

/**
 * creates the playable character PEPE
 * @class
 */
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
    lastActivity = new Date().getTime();

    /**
     * loads all image sets from the Imagehub and starts the intervals for animation, movement and gravity
     */
    constructor() {
        super();
        this.loadImage(Imagehub.PEPE.idle[0]);
        this.loadImages(Imagehub.PEPE.idle);
        this.loadImages(Imagehub.PEPE.move);
        this.loadImages(Imagehub.PEPE.jump);
        this.loadImages(Imagehub.PEPE.hurt);
        this.loadImages(Imagehub.PEPE.dead);
        this.loadImages(Imagehub.PEPE.long_idle);
        IntervalHub.startInterval(this.animatePEPE, 1000 / 10);
        IntervalHub.startInterval(this.move, 1000 / 60);
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
    }

    /**
     * checks how long PEPE has been standing still, any key press resets the timer
     * @returns {boolean} True when there was no input for more than 3 seconds.
     */
    isLongIdle() {
        const secondsPassed = (new Date().getTime() - this.lastActivity) / 1000;
        return secondsPassed > 3;
    }

    /**
     * plays the death animation, flags PEPE as dead and plays the death sound only once
     */
    deadAnimation() {
        AudioHub.stopOne(AudioHub.CHARACTER_RUN);
        this.playAnimation(Imagehub.PEPE.dead);
        this.dead = true;
        if (!this.soundPlayed) {
            AudioHub.playOne(AudioHub.CHARACTER_DEAD, false);
            this.soundPlayed = true;
        }
    }

    /**
     * plays the standing animation and stops the running sound
     */
    idleAnimation() {
        AudioHub.stopOne(AudioHub.CHARACTER_RUN);
        this.playAnimation(Imagehub.PEPE.idle);
    }

    /**
     * plays the sleeping animation with snoring sound after a long idle
     */
    longIdleAnimation() {
        AudioHub.stopOne(AudioHub.CHARACTER_RUN);
        this.playAnimation(Imagehub.PEPE.long_idle);
        AudioHub.playOne(AudioHub.CHARACTER_SNORING, false);
    }

    /**
     * plays the hurt animation and damage sound after PEPE was hit
     */
    hurtAnimation() {
        this.playAnimation(Imagehub.PEPE.hurt);
        AudioHub.stopOne(AudioHub.CHARACTER_RUN);
        AudioHub.playOne(AudioHub.CHARACTER_DAMAGE, false);
    }

    /**
     * plays the walking animation and starts the looping running sound
     */
    walkingAnimation() {
        this.playAnimation(Imagehub.PEPE.move);
        AudioHub.playOne(AudioHub.CHARACTER_RUN, false);
    }

    /**
     * plays the jump sound, retriggered so quick jumps in a row are still audible
     */
    jumpAnimation() {
        AudioHub.stopOne(AudioHub.CHARACTER_RUN);
        AudioHub.playOne(AudioHub.CHARACTER_JUMP, true);
    }

    /**
     * plays the jump animation while PEPE is off the ground
     */
    aboveGroundAnimation() {
        AudioHub.stopOne(AudioHub.CHARACTER_RUN);
        this.playAnimation(Imagehub.PEPE.jump);
    }

    /**
     * picks the animation that fits PEPE's current state, checked from most to least important
     */
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

    /**
     * moves PEPE within the level borders, sets the facing direction and refreshes the idle timer
     */
    move = () => {
        if (Keyboard.RIGHT && this.x < level1.level_end_x) {
            this.walkingRight();
        }
        if (Keyboard.LEFT && this.x > level1.level_start_x) {
            this.walkingLeft();
        }
        if (Keyboard.SPACE && !this.isAboveGround()) {
            this.jumping();
        }
    };

    /**
     * moves PEPE to the right, turns the sprite forward and refreshes the idle timer
     */
    walkingRight() {
        this.otherDirection = false;
        this.moveRight();
        this.lastActivity = new Date().getTime();
    }

    /**
     * moves PEPE to the left, mirrors the sprite and refreshes the idle timer
     */
    walkingLeft() {
        this.otherDirection = true;
        this.moveLeft();
        this.lastActivity = new Date().getTime();
    }

    /**
     * starts the jump, plays the jump sound and refreshes the idle timer
     * the sound is triggered here and not in the animation, so it only plays once per jump
     */
    jumping() {
        this.jump();
        this.jumpAnimation();
        this.lastActivity = new Date().getTime();
    }
}
