import { Imagehub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {
    x = 120;
    y = 155;
    height = 280;
    width = 150;
    currentImage = 0;

    constructor() {
        // loading only first image for now from Imagehub
        super();
        this.loadImage(Imagehub.PEPE.move[0]);
        this.loadImages(Imagehub.PEPE.move);
        this.animate();
    }

    // animate PEPE walking
    animate() {
        setInterval(() => {
            let i = this.currentImage % Imagehub.PEPE.move.length;
            let path = Imagehub.PEPE.move[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    }
    jump() {}
}
