import { CollectableObjects } from "./collectable-objects.class.js";
import { Imagehub } from "./image-hub.class.js";

export class BottleObjects extends CollectableObjects {
    x;
    y = 350;
    height = 80;
    width = 60;
    offset = {
        top: 15,
        right: 20,
        bottom: 10,
        left: 20,
    };
    showFrame = true; // frame for collision implementation

    constructor() {
        super();
        this.loadImage(Imagehub.BOTTLES.right[0]);
        this.x = 250 + Math.random() * 2000;
    }
}
