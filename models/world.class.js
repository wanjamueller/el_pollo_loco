import { BackgroundObject } from "./background-object.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { Imagehub } from "./image-hub.class.js";
import { IntervalHub } from "./intervallhub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./movable-object.class.js";

export class World {
    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];
    clouds = [new Cloud()];
    backgroundObjects = [
        new BackgroundObject(Imagehub.BACKGROUND.sky),
        new BackgroundObject(Imagehub.BACKGROUND.plain[0]),
        new BackgroundObject(Imagehub.BACKGROUND.red[0]),
        new BackgroundObject(Imagehub.BACKGROUND.color[0]),

        new BackgroundObject(Imagehub.BACKGROUND.sky),
        new BackgroundObject(Imagehub.BACKGROUND.plain[1]),
        new BackgroundObject(Imagehub.BACKGROUND.red[1]),
        new BackgroundObject(Imagehub.BACKGROUND.color[1]),

        new BackgroundObject(Imagehub.BACKGROUND.sky),
        new BackgroundObject(Imagehub.BACKGROUND.plain[0]),
        new BackgroundObject(Imagehub.BACKGROUND.red[0]),
        new BackgroundObject(Imagehub.BACKGROUND.color[0]),

        new BackgroundObject(Imagehub.BACKGROUND.sky),
        new BackgroundObject(Imagehub.BACKGROUND.plain[1]),
        new BackgroundObject(Imagehub.BACKGROUND.red[1]),
        new BackgroundObject(Imagehub.BACKGROUND.color[1]),
    ];
    canvas;
    ctx;
    camera_x = 0;

    // canvas handed over from init()
    constructor(canvas) {
        this.ctx = canvas.getContext(`2d`);
        this.canvas = canvas; // need this to clear canvas at start of draw()
        this.draw();
        this.setWorld();
        // IntervalHub.startInterval(this.startCounter, 1000);
    }

    // Link world to character (translate camera_x via character)
    setWorld() {
        this.character.world = this;
    }

    draw() {
        // clearing canvas before each draw, so old animated images are deleted
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        // pushing to loop
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);

        // pushing PEPE to draw
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        // draw() is repeatedly run = animation
        requestAnimationFrame(() => this.draw());
    }

    // Loop for Objects to draw
    addObjectsToMap(objects) {
        objects.forEach((obj) => {
            this.addToMap(obj);
        });
    }

    // drawing objects
    addToMap(obj) {
        if (obj.otherDirection) {
            this.ctx.save();
            this.ctx.translate(obj.width, 0); // mirror in same spot and not at egde of img
            this.ctx.scale(-1, 1);
            obj.x = obj.x * -1; // mirrir x value
        }
        this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
        if (obj.otherDirection) {
            obj.x = obj.x * -1; // mirrir x value
            this.ctx.restore();
        }
    }
}
