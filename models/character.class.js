import { Imagehub } from "./image-hub.class.js";
import { IntervalHub } from "./intervallhub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {
    x = 120;
    y = 155;
    height = 280;
    width = 150;
    counter = 0;

    constructor() {
        super();
        // loading images from Imagehub
        this.loadImage(Imagehub.PEPE.move[0]);
        this.loadImages(Imagehub.PEPE.move);
        // starting intervall for PEPE walking
        IntervalHub.startInterval(this.walking, 100);
    }

    // animate PEPE walking
    walking = () => {
        let i = this.counter % Imagehub.PEPE.move.length;
        let path = Imagehub.PEPE.move[i];
        this.img = this.imageCache[path];
        this.counter++;
    };
    jump() {}
}
