import { CollectableObjects } from "./collectable-objects.class.js";
import { Imagehub } from "./image-hub.class.js";

export class coinObjects extends CollectableObjects {
    x;
    y = 300;
    height = 100;
    width = 100;

    constructor() {
        super();
        this.loadImage(Imagehub.COINS.ground[0]);
        this.x = 200 + Math.random() * 1200;
    }
}
