import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";

export class World {
    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];
    clouds = [new Cloud()];
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

        // drawing PEPE
        this.ctx.drawImage(
            this.character.img,
            this.character.x,
            this.character.y,
            this.character.width,
            this.character.height,
        );

        // drawing schicken
        this.enemies.forEach((enemy) => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });

        // drawing cloud
        this.clouds.forEach((cloud) => {
            this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
        });

        // draw() is repeatedly run = animation
        let self = this; // self, as this is not defined inside function body
        requestAnimationFrame(function () {
            self.draw();
        });
    }
}
