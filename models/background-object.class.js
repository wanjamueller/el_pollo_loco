import { MovableObject } from "./movable-object.class.js";

export class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    constructor(imgPath, x) {
        // loading only first image for now from Imagehub
        super().loadImage(imgPath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
