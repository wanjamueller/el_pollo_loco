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
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // percentage handed over
        let path = Imagehub.BARS.coins[this.resolveImageIndex()]; // provides path based on energy
        this.img = this.imageCache[path];
    }

    // define what image (index) is shown based on percentage
    resolveImageIndex() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
