import { MovableObject } from "./movable-object.class.js";
import { Imagehub } from "./image-hub.class.js";
import { IntervalHub } from "./intervallhub.class.js";

export class Chicken extends MovableObject {
    y = 360;
    height = 70;
    width = 70;
    counter = 0;
    speed = 0.3 + Math.random();
    showFrame = true; // frame for collision implementation

    constructor() {
        super();
        // loading images from Imagehub
        this.loadImage(Imagehub.CHICKEN.move[0]);
        this.loadImages(Imagehub.CHICKEN.move);
        // random positioning at start
        this.x = 200 + Math.random() * 1200;
        // start intervall for moving chicken
        IntervalHub.startInterval(this.animate, 1000 / 10);
        IntervalHub.startInterval(this.moveLeft, 1000 / 60);
    }

    // animate chicken walking
    animate = () => {
        this.playAnimation(Imagehub.CHICKEN.move);
    };
}
