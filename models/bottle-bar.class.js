import { DrawableObject } from "./drawable-objects.class.js";
import { Imagehub } from "./image-hub.class.js";

export class BottleBar extends DrawableObject {
    x = 50;
    y = 100;
    height = 50;
    width = 200;

    constructor() {
        super();
        this.loadImage(Imagehub.BARS.bottles[0]);
        this.loadImages(Imagehub.BARS.bottles);
        // this.setPercentage(0);
    }

    setBottlePercentage(percentage) {
        this.percentage = percentage; // percentage handed over
        let path = Imagehub.BARS.bottles[this.resolveImageIndex()]; // provides path based on energy
        this.img = this.imageCache[path];
    }
}
