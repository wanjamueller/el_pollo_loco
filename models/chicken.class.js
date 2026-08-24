import { Imagehub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {
    y = 360;
    height = 70;
    width = 70;
    currentImage = 0;

    constructor() {
        // loading only first image for now from Imagehub
        super();
        this.loadImage(Imagehub.CHICKEN.move[0]);
        this.loadImages(Imagehub.CHICKEN.move);
        this.x = 200 + Math.random() * 500;
        this.animate();
    }

    // animate walking
    animate() {
        setInterval(() => {
            let i = this.currentImage % Imagehub.CHICKEN.move.length;
            let path = Imagehub.CHICKEN.move[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    }
}
