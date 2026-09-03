import { AudioHub } from "./AudioHub.class.js";
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

    constructor(amount) {
        super();
        const bottles = Imagehub.BOTTLES.ground;
        this.loadImage(bottles[Math.floor(Math.random() * bottles.length)]); // random * length(2) -> decimals between 0 and 2, with floor rounding it down (index 0, 1) randomly
        this.x = 250 + Math.random() * 2000;
    }
}
