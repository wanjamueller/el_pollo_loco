import { Imagehub } from "./image-hub.class.js";
import { IntervalHub } from "./intervallhub.class.js";
import { MovableObject } from "./movable-object.class.js";

/**
 * creates a cloud drifting across the background
 * @class
 */
export class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    speed = 0.15;

    /**
     * loads one of the two cloud images, places the cloud in the level and starts its drift to the left
     * @param {number} x - Starting position of the cloud in the level.
     * @param {number} img - Index of the cloud image in the Imagehub, 0 or 1.
     */
    constructor(x, img) {
        super().loadImage(Imagehub.CLOUD.move[img]);
        this.x = x;
        IntervalHub.startInterval(this.moveLeft, 1000 / 60);
    }
}
