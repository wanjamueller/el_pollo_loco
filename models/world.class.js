import { BackgroundObject } from "./background-object.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { Imagehub } from "./image-hub.class.js";

export class World {
    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];
    clouds = [new Cloud()];
    backgroundObjects = [
        new BackgroundObject(Imagehub.BACKGROUND.plain[0], 0),
        new BackgroundObject(Imagehub.BACKGROUND.red[0], 0),
        new BackgroundObject(Imagehub.BACKGROUND.color[0], 0),
    ];
    canvas;
    ctx;

    // canvas handed over from init()
    constructor(canvas) {
        this.ctx = canvas.getContext(`2d`);
        this.canvas = canvas; // need this to clear canvas at start of draw()
        this.draw();
    }

    draw() {
        // clearing canvas before each draw, so old animated images are deleted
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // pushing to loop
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.enemies);

        // pushing PEPE to draw
        this.addToMap(this.character);

        // draw() is repeatedly run = animation
        let self = this; // self, as this is not defined inside function body
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    // Loop for Objects to draw
    addObjectsToMap(objects) {
        objects.forEach((obj) => {
            this.addToMap(obj);
        });
    }

    // drawing objects
    addToMap(obj) {
        this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
    }
}
