import { DrawableObject } from "./drawable-objects.class.js";
import { Imagehub } from "./image-hub.class.js";

/**
 * creates endboss bar
 * @class
 */
export class EndbossBar extends DrawableObject {
    x = 450;
    y = 25;
    height = 50;
    width = 200;

    /**
     * overwrites images of super to endboss bar images
     */
    constructor() {
        super();
        this.loadImage(Imagehub.BARS.endboss[5]);
        this.loadImages(Imagehub.BARS.endboss);
        this.setEndbossPercentage(100);
    }

    /**
     * sets the percentage and throught that can later load the correct image for each statusbar
     * @param {string} percentage - sets the percentage based on the objects energy(movable) or amount (collectable)
     */
    setEndbossPercentage(percentage) {
        this.percentage = percentage; // percentage handed over
        let path = Imagehub.BARS.endboss[this.resolveImageIndex()]; // provides path based on energy
        this.img = this.imageCache[path];
    }
}
