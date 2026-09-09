import { AudioHub } from "./AudioHub.class.js";
import { CollectableObjects } from "./collectable-objects.class.js";
import { Imagehub } from "./image-hub.class.js";

/**
 * creates bottles to be collected
 * @class
 */
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

    /**
     * loads both ground imnages and randomly places each type on the ground at a random spot starting at 350 px on x earliest
     * @param {number} amount - defines the amount of bottles to create when being triggered
     */
    constructor(amount) {
        super();
        const bottles = Imagehub.BOTTLES.ground;
        this.loadImage(bottles[Math.floor(Math.random() * bottles.length)]); // random * length(2) -> decimals between 0 and 2, with floor rounding it down (index 0, 1) randomly
        this.x = 400 + Math.random() * 2000;
    }
}
