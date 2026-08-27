import { level1 } from "../levels/level1.js";
import { Imagehub } from "./image-hub.class.js";
import { IntervalHub } from "./intervallhub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { Level } from "./level.class.js";
import { MovableObject } from "./movable-object.class.js";
import { World } from "./world.class.js";

export class Character extends MovableObject {
    x = 120;
    y = 155;
    height = 280;
    width = 150;
    counter = 0;
    speed = 4;
    offset = {
        top: 120,
        right: 30,
        bottom: 10,
        left: 40,
    };
    showFrame = true; // frame for collision implementation

    constructor() {
        super();
        // loading images from Imagehub
        this.loadImage(Imagehub.PEPE.move[0]);
        this.loadImages(Imagehub.PEPE.idle);
        this.loadImages(Imagehub.PEPE.move);
        this.loadImages(Imagehub.PEPE.jump);
        this.applyGravity();
        // starting intervall for PEPE walking
        IntervalHub.startInterval(this.animatePEPE, 1000 / 10);
        IntervalHub.startInterval(this.move, 1000 / 60);
    }

    // animate PEPE walking
    animatePEPE = () => {
        if (this.isAboveGround()) {
            this.playAnimation(Imagehub.PEPE.jump);
        } else {
            if (Keyboard.RIGHT || Keyboard.LEFT) {
                this.playAnimation(Imagehub.PEPE.move);
            }
        }
    };

    move = () => {
        if (Keyboard.RIGHT && this.x < level1.level_end_x) {
            // for now fix for level1, need to check on how to open for more levels
            this.otherDirection = false;
            this.moveRight();
        }
        if (Keyboard.LEFT && this.x > level1.level_start_x) {
            this.otherDirection = true;
            this.moveLeft();
        }
        if (Keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
        }
    };
}
