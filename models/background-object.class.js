import { MovableObject } from "./movable-object.class.js";

export class BackgroundObject extends MovableObject {
    y = 0; // instead of 480 - 480...
    width = 720;
    height = 480;

    static xPos = -720;
    static turn = 0;

    constructor(imgPath) {
        // ensuring 4 pics are added on top of each other, before next group is added 720 px further
        if (BackgroundObject.turn === 4) {
            BackgroundObject.xPos += 720;
            BackgroundObject.turn = 0;
        }
        // loading images from Imagehub
        super().loadImage(imgPath);
        this.x = BackgroundObject.xPos;
        BackgroundObject.turn++;
    }
}
