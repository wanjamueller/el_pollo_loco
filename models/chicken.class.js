import { Imagehub } from "./image-hub.class.js";
import { IntervalHub } from "./intervallhub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {
    y = 360;
    height = 70;
    width = 70;
    counter = 0;

    constructor() {
        // loading only first image for now from Imagehub
        super();
        this.loadImage(Imagehub.CHICKEN.move[0]);
        this.loadImages(Imagehub.CHICKEN.move);
        this.x = 200 + Math.random() * 500;
        IntervalHub.startInterval(this.moving, 100);
    }

    // animate chicken walking
    moving = () => {
        let i = this.counter % Imagehub.CHICKEN.move.length;
        let path = Imagehub.CHICKEN.move[i];
        this.img = this.imageCache[path];
        this.counter++;
    };
}
