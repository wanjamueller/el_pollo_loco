import { Imagehub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;

    constructor() {
        // loading only first image for now from Imagehub
        super().loadImage(Imagehub.CLOUD.move[0]);
        this.x = Math.random() * 500;
        this.animate();
    }

    // animate clouds at 60 FPS
    animate() {
        setInterval(() => {
            this.x -= 0.15;
        }, 1000 / 60);
    }
}
