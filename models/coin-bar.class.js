import { DrawableObject } from "./drawable-objects.class.js";
import { Imagehub } from "./image-hub.class.js";

export class CoinBar extends DrawableObject {
    x = 50;
    y = 60;
    height = 50;
    width = 200;

    constructor() {
        super();
        this.loadImage(Imagehub.BARS.coins[0]);
        this.loadImages(Imagehub.BARS.coins);
        // this.setCoinPercentage(0);
    }

    setCoinPercentage(percentage) {
        this.percentage = percentage; // percentage handed over
        let path = Imagehub.BARS.coins[this.resolveImageIndex()]; // provides path based on coins
        this.img = this.imageCache[path];
    }
}
