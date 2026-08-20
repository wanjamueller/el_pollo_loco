import { Imagehub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {
    x = 500;
    y = 300;
    height = 100;
    width = 100;

    constructor() {
        super().loadImage(Imagehub.CHICKEN.move[0]);
    }
}
