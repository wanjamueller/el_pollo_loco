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
import { Imagehub } from "./image-hub.class.js";
import { EndbossBar } from "./endboss-bar.class.js";
import { AudioHub } from "./AudioHub.class.js";

export class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar();
    throwableObjects = [];
    bottles = [
        new BottleObjects(),
        new BottleObjects(),
        new BottleObjects(),
        new BottleObjects(),
        new BottleObjects(),
        new BottleObjects(),
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
        IntervalHub.startInterval(this.checkEndbossCollisions, 1000 / 10);
        IntervalHub.startInterval(this.checkCoinCollections, 1000 / 10);
        IntervalHub.startInterval(this.checkBottleCollections, 1000 / 10);
        IntervalHub.startInterval(this.checkThrowObjects, 1000 / 10);
        IntervalHub.startInterval(this.checkBottleHitsChicken, 1000 / 60);
        IntervalHub.startInterval(this.checkBottleHitsEndboss, 1000 / 60);
        IntervalHub.startInterval(this.checkJumpOnChicken, 1000 / 60);
        IntervalHub.startInterval(this.characterApproachesEndboss, 1000 / 10);
        IntervalHub.startInterval(this.endbossAttacks, 1000 / 10);
    }

    // Link world to character (translate camera_x via character)
    setWorld() {
        this.character.world = this;
    }

    checkThrowObjects = () => {
        if (Keyboard.D && this.character.otherDirection && this.character.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x, this.character.y + 150); // handing over character x & y to Object
            this.throwableObjects.push(bottle); // adding bottles to array when throwind with "d"
            bottle.otherDirection = true; // to throw left
            this.character.collectedBottles -= 20;
            this.bottleBar.setBottlePercentage(this.character.collectedBottles);
        } else if (Keyboard.D && !this.character.otherDirection && this.character.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 150); // handing over character x & y to Object
            this.throwableObjects.push(bottle); // adding bottles to array when throwind with "d"
            this.character.collectedBottles -= 20;
            this.bottleBar.setBottlePercentage(this.character.collectedBottles);
        } else if (!this.bottles.length && this.character.collectedBottles <= 0) {
            this.bottles = [new BottleObjects(), new BottleObjects(), new BottleObjects()]; // adding 3 bottles in case there are none left to collect / throw
        }
    };

    checkJumpOnChicken = () => {
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            const enemy = this.level.enemies[i];
            if (!enemy.isDead() && this.character.isJumpingOn(enemy)) {
                enemy.hit(i);
                this.character.speed_y = 15; // bouncing after jumping on chicken
                enemy.removeEnemy(enemy);
            }
        }
    };

    checkCollisions = () => {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isJumpingOn(enemy) && !enemy.isDead()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    };

    checkEndbossCollisions = () => {
        this.level.boss.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isJumpingOn(enemy) && !enemy.isDead()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    };

    checkCoinCollections = () => {
        for (let i = this.coins.length - 1; i >= 0; i--) {
            if (this.character.isColliding(this.coins[i])) {
                this.character.collectCoins();
                this.coinBar.setCoinPercentage(this.character.collectedCoins);
                this.coins.splice(i, 1);
            }
        }
    };

    checkBottleCollections = () => {
        for (let i = this.bottles.length - 1; i >= 0; i--) {
            if (this.character.collectedBottles < 100 && this.character.isColliding(this.bottles[i])) {
                this.character.collectBottles();
                this.bottleBar.setBottlePercentage(this.character.collectedBottles);
                this.bottles.splice(i, 1);
            }
        }
    };

    checkBottleHitsChicken = () => {
        for (let j = this.throwableObjects.length - 1; j >= 0; j--) {
            const bottle = this.throwableObjects[j];
            for (let i = this.level.enemies.length - 1; i >= 0; i--) {
                const enemy = this.level.enemies[i];
                // !enemy.isDead() so the chicken does not come alive again after getting hit a second time
                if (!enemy.isDead() && bottle.isColliding(enemy)) {
                    enemy.hit();
                    bottle.hit();
                    setTimeout(() => {
                        const index = this.throwableObjects.indexOf(bottle);
                        if (index > -1) this.throwableObjects.splice(index, 1);
                    }, 600);
                    break;
                    // this.throwableObjects.splice(j, 1);
                }
                enemy.removeEnemy(enemy);
            }
        }
    };

    checkBottleHitsEndboss = () => {
        for (let j = this.throwableObjects.length - 1; j >= 0; j--) {
            const bottle = this.throwableObjects[j];
            for (let i = this.level.boss.length - 1; i >= 0; i--) {
                const enemy = this.level.boss[i];
                // !enemy.isDead() so the chicken does not come alive again after getting hit a second time
                // !bottle.hitChicken so the bottle does not hit the chicken multiple times as long as they overlapp
                if (!bottle.hitEnemy && !enemy.isDead() && bottle.isColliding(enemy)) {
                    enemy.hit();
                    this.endbossBar.setEndbossPercentage(enemy.energy);
                    bottle.hit();
                    setTimeout(() => {
                        const index = this.throwableObjects.indexOf(bottle);
                        if (index > -1) this.throwableObjects.splice(index, 1);
                    }, 1500);
                    // stops bottle from reducing energy continueously
                    break;
                }
                enemy.removeEnemy(enemy);
            }
        }
    };

    characterApproachesEndboss = () => {
        this.level.boss.forEach((boss) => {
            if (Math.abs(boss.x - this.character.x) < 500 && this.character.x > boss.x) {
                boss.otherDirection = true;
                this.level.boss.forEach((boss) => boss.moveRight());
                // Math.abs = Math absolute so that it also works when PEPE is to the right of the endboss
                this.level.boss.forEach((boss) => boss.startMoving());
            } else if (Math.abs(boss.x - this.character.x) < 500 && this.character.x < boss.x) {
                boss.otherDirection = false;
                this.level.boss.forEach((boss) => boss.moveLeft());
                // Math.abs = Math absolute so that it also works when PEPE is to the right of the endboss
                this.level.boss.forEach((boss) => boss.startMoving());
            }
        });
    };

    endbossAttacks = () => {
        this.level.boss.forEach((boss) => {
            if (Math.abs(boss.x - this.character.x) < 150 && !boss.isDead()) {
                // Math.abs = Math absolute so that it also works when PEPE is to the right of the endboss
                boss.attack();
            }
        });
    };
    cameraPosition() {
        // let character move freely at end to level end
        if (this.character.x >= 1980) {
            this.camera_x = -1880;
            this.level.level_end_x = 2480;
        } else if (this.character.x > this.level.boss.x) {
            this.camera_x = -this.character.x + 400;
        } else {
            this.camera_x = -this.character.x + 100; // move camera with character (also statusbar)
        }
    }

    addStatusbars() {
        // space for fixed objects
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossBar);
        this.ctx.translate(this.camera_x, 0);
    }

    draw() {
        this.cameraPosition();

        // clearing canvas before each draw, so old animated images are deleted
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        // adding to map
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        // fix Statusbars
        this.addStatusbars();

        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.boss);
        this.addObjectsToMap(this.throwableObjects);
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
