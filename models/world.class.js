// import { BackgroundObject } from "./background-object.class.js";
import { Character } from "./character.class.js";
// import { Chicken } from "./chicken.class.js";
// import { Cloud } from "./cloud.class.js";
// import { Imagehub } from "./image-hub.class.js";
// import { IntervalHub } from "./intervallhub.class.js";
// import { Keyboard } from "./keyboard.class.js";
// import { Level } from "./level.class.js";
// import { MovableObject } from "./movable-object.class.js";
import { level1 } from "../levels/level1.js";

export class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    camera_x = 0;

    // canvas handed over from init()
    constructor(canvas) {
        this.ctx = canvas.getContext(`2d`);
        this.canvas = canvas; // need this to clear canvas at start of draw()
        this.setWorld();
        this.draw();
        this.checkCollisions();

        // IntervalHub.startInterval(this.startCounter, 1000);
    }

    // Link world to character (translate camera_x via character)
    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    console.log(`collision with character`, enemy);
                }
            });
        }, 1000 / 10);
    }

    draw() {
        // move camera with character
        this.camera_x = -this.character.x + 100;
        // clearing canvas before each draw, so old animated images are deleted
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        // pushing to loop
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);

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
            obj.flipImage(this.ctx);
        }
        obj.draw(this.ctx);
        obj.drawFrame(this.ctx); // drawing frame for collisoon implememtation

        if (obj.otherDirection) {
            obj.flipImageBack(this.ctx);
        }
    }
}
