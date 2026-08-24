import { Imagehub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {
    y = 360;
    height = 70;
    width = 70;

    constructor() {
        // loading only first image for now from Imagehub
        super().loadImage(Imagehub.CHICKEN.move[0]);
        this.x = 200 + Math.random() * 500;
    }
}
