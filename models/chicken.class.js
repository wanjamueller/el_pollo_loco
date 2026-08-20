import { Imagehub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {
    constructor() {
        super().loadImage(Imagehub.CHICKEN.move[0]);
    }
}
