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

    constructor() {
        super();
        // loading images from Imagehub
        this.loadImage(Imagehub.PEPE.move[0]);
        this.loadImages(Imagehub.PEPE.move);
        // starting intervall for PEPE walking
        IntervalHub.startInterval(this.walking, 1000 / 10);
        IntervalHub.startInterval(this.moveRight, 1000 / 60);
        IntervalHub.startInterval(this.moveLeft, 1000 / 60);
    }

    // animate PEPE walking
    walking = () => {
        if (Keyboard.RIGHT || Keyboard.LEFT) {
            let i = this.counter % Imagehub.PEPE.move.length;
            let path = Imagehub.PEPE.move[i];
            this.img = this.imageCache[path];
            this.counter++;
        }
    };

    moveRight = () => {
        if (Keyboard.RIGHT) {
            this.x += this.speed;
            this.otherDirection = false;
        }
    };

    moveLeft = () => {
        if (Keyboard.LEFT) {
            this.x -= this.speed;
            this.otherDirection = true;
        }
    };

    jump() {}
}
