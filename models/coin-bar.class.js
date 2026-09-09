import { DrawableObject } from "./drawable-objects.class.js";
import { Imagehub } from "./image-hub.class.js";

/**
 * creates coins to be collected
 * @class
 */
export class CoinBar extends DrawableObject {
    x = 50;
    y = 60;
    height = 50;
    width = 200;

    /**
     * overwrites images of super to coin bar images
     */
    constructor() {
        super();
        this.loadImage(Imagehub.BARS.coins[0]);
        this.loadImages(Imagehub.BARS.coins);
    }

    /**
     * sets the percentage and throught that can later load the correct image for each statusbar
     * @param {string} percentage - sets the percentage based on the objects energy(movable) or amount (collectable)
     */
    setCoinPercentage(percentage) {
        this.percentage = percentage; // percentage handed over
        let path = Imagehub.BARS.coins[this.resolveImageIndex()]; // provides path based on coins
        this.img = this.imageCache[path];
    }
}
