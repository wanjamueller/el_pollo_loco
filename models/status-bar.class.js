import { DrawableObject } from "./drawable-objects.class.js";
import { Imagehub } from "./image-hub.class.js";

export class StatusBar extends DrawableObject {
    x = 50;
    y = 20;
    height = 50;
    width = 200;

    constructor() {
        super();
        this.loadImage(Imagehub.BARS.health[5]);
        this.loadImages(Imagehub.BARS.health);
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // percentage handed over
        let path = Imagehub.BARS.health[this.resolveImageIndex()]; // provides path based on energy
        this.img = this.imageCache[path];
    }
}
