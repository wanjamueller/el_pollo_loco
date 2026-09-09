import { DrawableObject } from "./drawable-objects.class.js";
import { Imagehub } from "./image-hub.class.js";

/**
 * creates the statusbar for collected bottleamount
 */
export class BottleBar extends DrawableObject {
    x = 50;
    y = 100;
    height = 50;
    width = 200;

    /**
     * overwrites images of super to bottle bar images
     */
    constructor() {
        super();
        this.loadImage(Imagehub.BARS.bottles[0]);
        this.loadImages(Imagehub.BARS.bottles);
    }

    /**
     * sets the percentage and throught that can later load the correct image for each statusbar
     * @param {string} percentage - sets the percentage based on the objects energy(movable) or amount (collectable)
     */
    setBottlePercentage(percentage) {
        this.percentage = percentage; // percentage handed over
        let path = Imagehub.BARS.bottles[this.resolveImageIndex()]; // provides path based on energy
        this.img = this.imageCache[path];
    }
}
