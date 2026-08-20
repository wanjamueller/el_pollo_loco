import { Imagehub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {
    constructor() {
        super().loadImage(Imagehub.PEPE.move[0]);
    }
    jump() {}
}
