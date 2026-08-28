import { Character } from "./character.class.js";
import { level1 } from "../levels/level1.js";
import { IntervalHub } from "./intervallhub.class.js";
import { StatusBar } from "./status-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { Keyboard } from "./keyboard.class.js";
import { BottleObjects } from "./bottle-objects-class.js";
import { coinObjects } from "./coin-objects.class.js";
import { CoinBar } from "./coin-bar.class.js";
import { BottleBar } from "./bottle-bar.class.js";

export class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    throwableObjects = [];
    bottles = [
        new BottleObjects(),
        new BottleObjects(),
        new BottleObjects(),
        new BottleObjects(),
        new BottleObjects(),
        new BottleObjects(),
    ];
    coins = [
        new coinObjects(),
        new coinObjects(),
        new coinObjects(),
        new coinObjects(),
        new coinObjects(),
        new coinObjects(),
    ];

    // canvas handed over from init()
    constructor(canvas) {
        this.ctx = canvas.getContext(`2d`);
        this.canvas = canvas; // need this to clear canvas at start of draw()
        this.setWorld();
        this.draw();

        // IntervalHub.startInterval(this.startCounter, 1000);
        IntervalHub.startInterval(this.checkCollisions, 1000 / 10);
        IntervalHub.startInterval(this.checkCollections, 1000 / 10);
        IntervalHub.startInterval(this.checkThrowObjects, 1000 / 10);
    }

    // Link world to character (translate camera_x via character)
    setWorld() {
        this.character.world = this;
    }

    checkThrowObjects = () => {
        if (Keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 150); // handing over character x & y to Object
            this.throwableObjects.push(bottle); // adding bottles to array when throwind with "d"
        }
    };

    checkCollisions = () => {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    };

    checkCollections = () => {
        this.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoins();
                this.coinBar.setCoinPercentage(this.character.collectedCoins);
                console.log(`character coins`, this.character.collectedCoins);
            }
        });
    };

    draw() {
        // move camera with character (also statusbar)
        this.camera_x = -this.character.x + 100;
        // this.statusBar.x = -this.camera_x + 50;

        // clearing canvas before each draw, so old animated images are deleted
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        // adding to map
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.clouds);

        // space for fixed objects
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);

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
