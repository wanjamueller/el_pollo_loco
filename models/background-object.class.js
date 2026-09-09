import { MovableObject } from "./movable-object.class.js";

/**
 * creates one layer segment of the scrolling background
 * @class
 */
export class BackgroundObject extends MovableObject {
    y = 0;
    width = 720;
    height = 480;

    /**
     * loads the layer image and places the segment at its fixed position in the level
     * @param {string} imgPath - Path to the layer image from the Imagehub.
     * @param {number} x - Horizontal position of this segment in the level.
     */
    constructor(imgPath, x) {
        super();
        this.loadImage(imgPath);
        this.x = x;
    }
}
