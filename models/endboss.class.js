import { Imagehub } from "./image-hub.class.js";
import { IntervalHub } from "./intervallhub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Endboss extends MovableObject {
    y = 230;
    x = 1200; // fix for now, based on level1
    height = 200;
    width = 200;
    counter = 0;
    speed = 0.7;
    showFrame = true; // frame for collision implementation

    constructor() {
        super();
        // loading images from Imagehub
        this.loadImage(Imagehub.ENDBOSS.move[0]);
        this.loadImages(Imagehub.ENDBOSS.move);
        // start intervall for moving endboss
        IntervalHub.startInterval(this.animate, 1000 / 10);
        IntervalHub.startInterval(this.moveLeft, 1000 / 60);
    }

    // animate endboss walking
    animate = () => {
        this.playAnimation(Imagehub.ENDBOSS.move);
    };
}
