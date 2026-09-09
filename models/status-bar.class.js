import { DrawableObject } from "./drawable-objects.class.js";
import { Imagehub } from "./image-hub.class.js";

/**
 * creates the status bars
 * @class
 */
export class StatusBar extends DrawableObject {
    x = 50;
    y = 20;
    height = 50;
    width = 200;

    /**
     * loads images and sets default percentage to 100
     */
    constructor() {
        super();
        this.loadImage(Imagehub.BARS.health[5]);
        this.loadImages(Imagehub.BARS.health);
        this.setPercentage(100);
    }

    /**
     * sets the percentage and throught that can later load the correct image for each statusbar
     * @param {string} percentage - sets the percentage based on the objects energy(movable) or amount (collectable)
     */
    setPercentage(percentage) {
        this.percentage = percentage; // percentage handed over
        let path = Imagehub.BARS.health[this.resolveImageIndex()]; // provides path based on energy
        this.img = this.imageCache[path];
    }
}
