import { DrawableObject } from "./drawable-objects.class.js";
import { Imagehub } from "./image-hub.class.js";

export class EndbossBar extends DrawableObject {
    x = 450;
    y = 25;
    height = 50;
    width = 200;

    constructor() {
        super();
        this.loadImage(Imagehub.BARS.endboss[5]);
        this.loadImages(Imagehub.BARS.endboss);
        this.setEndbossPercentage(100);
    }

    setEndbossPercentage(percentage) {
        this.percentage = percentage; // percentage handed over
        let path = Imagehub.BARS.endboss[this.resolveImageIndex()]; // provides path based on energy
        this.img = this.imageCache[path];
    }
}
