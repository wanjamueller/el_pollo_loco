import { Imagehub } from "./image-hub.class.js";
import { IntervalHub } from "./intervallhub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    speed = 0.15;

    constructor(x, img) {
        // loading image from Imagehub
        super().loadImage(Imagehub.CLOUD.move[img]);
        // this.x = Math.random() * 500;
        this.x = x;
        IntervalHub.startInterval(this.moveLeft, 1000 / 60);
    }
}
