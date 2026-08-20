import { Imagehub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {
    x = 120;
    y = 250;
    height = 150;
    width = 100;

    constructor() {
        super().loadImage(Imagehub.PEPE.move[0]);
    }
    jump() {}
}
