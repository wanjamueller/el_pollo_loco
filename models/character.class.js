import { Imagehub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {
    x = 120;
    y = 155;
    height = 280;
    width = 150;

    constructor() {
        // loading only first image for now from Imagehub
        super();
        this.loadImage(Imagehub.PEPE.move[0]);
        Object.values(Imagehub.PEPE).forEach((group) => this.loadImages(group));
    }
    jump() {}
}
