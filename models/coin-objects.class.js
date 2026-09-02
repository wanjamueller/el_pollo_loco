import { CollectableObjects } from "./collectable-objects.class.js";
import { Imagehub } from "./image-hub.class.js";

export class coinObjects extends CollectableObjects {
    x;
    y;
    height = 100;
    width = 100;
    offset = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30,
    };
    showFrame = true; // frame for collision implementation

    constructor() {
        super();
        this.loadImage(Imagehub.COINS.ground[0]);
        this.x = 300 + Math.random() * 2000;
        this.y = 100 + Math.random() * 240;
    }
}
