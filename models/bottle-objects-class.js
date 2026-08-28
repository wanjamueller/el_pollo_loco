import { CollectableObjects } from "./collectable-objects.class.js";
import { Imagehub } from "./image-hub.class.js";

export class BottleObjects extends CollectableObjects {
    x;
    y = 350;
    height = 80;
    width = 60;

    constructor() {
        super();
        this.loadImage(Imagehub.BOTTLES.right[0]);
        this.x = 200 + Math.random() * 1200;
    }
}
