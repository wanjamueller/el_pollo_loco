import { Imagehub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {
    x = 120;
    y = 180;
    height = 250;
    width = 150;

    constructor() {
        // loading only first image for now from Imagehub
        super().loadImage(Imagehub.PEPE.move[0]);
    }
    jump() {}
}
