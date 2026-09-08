import { Character } from "./character.class.js";
import { createLevel1, level1 } from "../levels/level1.js";
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
    level = createLevel1();
    canvas;
    ctx;
    camera_x = 0;
    cameraLocked = false; // true when camera sits at the right-side offset (PEPE past the boss)
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
        AudioHub.playOne(AudioHub.GAME_START, false);

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
        IntervalHub.startInterval(this.gameEnds, 1000);
    }

    // Link world to character (translate camera_x via character)
    setWorld() {
        this.character.world = this;
    }

    checkThrowObjects = () => {
        if (!Keyboard.D || this.character.collectedBottles <= 0) return; // return if no. collected bottles
        if (this.throwableObjects.some((bottle) => !bottle.hitEnemy)) return; // return if bottle still in air

        const facingLeft = this.character.otherDirection;
        // The ternary: condition ? valueIfTrue : valueIfFalse
        const bottle = new ThrowableObject(
            facingLeft ? this.character.x : this.character.x + 100,
            this.character.y + 150,
        );
        bottle.otherDirection = facingLeft;
        this.throwableObjects.push(bottle);

        this.character.collectedBottles -= 20;
        this.bottleBar.setBottlePercentage(this.character.collectedBottles);
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
                    enemy.removeEnemy(enemy);
                    setTimeout(() => {
                        bottle.stopIntervals();
                        const index = this.throwableObjects.indexOf(bottle);
                        if (index > -1) this.throwableObjects.splice(index, 1);
                    }, 600);
                    break;
                    // this.throwableObjects.splice(j, 1);
                }
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
                        bottle.stopIntervals();
                        const index = this.throwableObjects.indexOf(bottle);
                        if (index > -1) this.throwableObjects.splice(index, 1);
                    }, 1500);
                    // stops bottle from reducing energy continueously
                    break;
                }
            }
        }
    };

    characterApproachesEndboss = () => {
        this.level.boss.forEach((boss) => {
            if (Math.abs(boss.x - this.character.x) < 400 && this.character.x > boss.x) {
                boss.otherDirection = true;
                this.level.boss.forEach((boss) => boss.moveRight());
                // Math.abs = Math absolute so that it also works when PEPE is to the right of the endboss
                this.level.boss.forEach((boss) => boss.startMoving());
            } else if (Math.abs(boss.x - this.character.x) < 500 && this.character.x < boss.x) {
                boss.otherDirection = false;
                this.level.boss.forEach((boss) => boss.moveLeft());
                // Math.abs = Math absolute so that it also works when PEPE is to the right of the endboss
                this.level.boss.forEach((boss) => boss.startMoving());
            } else {
                this.level.boss.forEach((boss) => (boss.moving = false));
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
        const boss = this.level.boss[0];
        const pastBoss = boss && this.character.x > boss.x; // true when PEPE is to the right of the boss

        if (pastBoss) {
            const rightLimit = -this.character.x + 470; // puts PEPE 100px from the right edge
            if (this.camera_x >= rightLimit) this.cameraLocked = true; // he has walked far enough right through the screen
            this.camera_x = this.cameraLocked
                ? rightLimit // TRUE track him at the right-side offset
                : Math.min(this.camera_x, rightLimit); // FALSE reeze camera while he crosses the screen
        } else {
            const leftLimit = -this.character.x + 100; // puts PEPE 100px from the left edge
            if (this.camera_x <= leftLimit) this.cameraLocked = false; // he has walked far enough left
            this.camera_x = this.cameraLocked
                ? Math.max(this.camera_x, leftLimit) // TRUE freeze camera while he crosses back
                : leftLimit; // FALSE normal left-side tracking
        }

        if (this.character.x >= 1980) {
            this.level.level_end_x = 2480; // let PEPE walk to the very end of the level
        }

        this.camera_x = Math.max(this.camera_x, -1880); // hard stop, camera never scrolls past level end
        this.camera_x = Math.round(this.camera_x); // whole pixels only, prevents 1px seams in background, nedded as the cam is not always steady on character
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
        // obj.drawFrame(this.ctx); // drawing frame for collisoon implememtation

        if (obj.otherDirection) {
            obj.flipImageBack(this.ctx);
        }
    }

    gameEnds = () => {
        if (this.character.dead || this.level.boss.some((boss) => boss.dead)) {
            IntervalHub.stopAllIntervals();
            AudioHub.stopAll();
            this.endScreen();
        }
    };

    endScreen() {
        if (this.level.boss.some((boss) => boss.dead)) {
            document.getElementById("won").classList.remove("d_none");
            setTimeout(() => {
                document.getElementById("start-menu").classList.toggle(`d_none`);
                document.getElementById("home").classList.remove(`d_none`);
                document.getElementById("imprint").classList.add(`d_none`);
            }, 3000);
        } else {
            document.getElementById("lost").classList.remove("d_none");
            setTimeout(() => {
                document.getElementById("start-menu").classList.toggle(`d_none`);
                document.getElementById("home").classList.remove(`d_none`);
                document.getElementById("imprint").classList.add(`d_none`);
            }, 3000);
        }
    }
}
