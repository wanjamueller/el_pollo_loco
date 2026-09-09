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
import { EndbossBar } from "./endboss-bar.class.js";
import { AudioHub } from "./AudioHub.class.js";

/**
 * creates the world the game lives in
 *  @class
 */
export class World {
    character = new Character();
    level = createLevel1();
    canvas;
    ctx;
    camera_x = 0;
    cameraLocked = false;
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

    /**
     * creates the 2D canvas and draws all the objects
     * starts intervals for all checks at the. respective speed
     * canvas handed over from init()
     * @returns the 2D Canvas
     * @param {canvas} canvas - canvas is handed over from game.js
     * @param {boolean} cameraLocked - true when camera sits at the right-side offset (PEPE past the boss)
     */
    constructor(canvas) {
        this.ctx = canvas.getContext(`2d`);
        this.canvas = canvas; // need this to clear canvas at start of draw()
        this.setWorld();
        this.draw();
        AudioHub.playOne(AudioHub.GAME_START, false);
        IntervalHub.startInterval(this.slowChecks, 1000 / 10);
        IntervalHub.startInterval(this.fastChecks, 1000 / 60);
        IntervalHub.startInterval(this.gameEnds, 1000);
    }

    /**
     * All methods for intervals at 1000 / 10
     */
    slowChecks = () => {
        this.checkCollisions();
        this.checkEndbossCollisions();
        this.checkCoinCollections();
        this.checkBottleCollections();
        this.checkThrowObjects();
        this.characterApproachesEndboss();
        this.endbossAttacks();
    };

    /**
     * All methods for intervals at 1000 / 60
     */
    fastChecks = () => {
        this.checkBottleHitsChicken();
        this.checkBottleHitsEndboss();
        this.checkJumpOnChicken();
    };

    /**
     *
     * Link world to character (translate camera_x via character)
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * behavior of throwable objects inside thw world
     * The ternary: condition ? valueIfTrue : valueIfFalse
     * manages throwing to right and left -> flip animation of thrown bottle
     * updates statusbar for bottles
     */
    checkThrowObjects = () => {
        if (!Keyboard.D || this.character.collectedBottles <= 0) return; // returns if no. collected bottles
        if (this.throwableObjects.some((bottle) => !bottle.hitEnemy)) return; // returns if previous bottle still in air
        const facingLeft = this.character.otherDirection;
        const bottle = new ThrowableObject(
            facingLeft ? this.character.x : this.character.x + 100,
            this.character.y + 150,
        );
        bottle.otherDirection = facingLeft;
        this.throwableObjects.push(bottle);
        this.character.collectedBottles -= 20;
        this.bottleBar.setBottlePercentage(this.character.collectedBottles);
    };

    /**
     * behavior when a chicken is jumped on (both types)
     * makes the character bounse when landing on chicken
     */
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

    /**
     * behavior when objects are colliding with character
     * updates characer statusbar
     */
    checkCollisions = () => {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isJumpingOn(enemy) && !enemy.isDead()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    };

    /**
     * behavior when endboss collides with character
     * updates character statusbar
     */
    checkEndbossCollisions = () => {
        this.level.boss.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isJumpingOn(enemy) && !enemy.isDead()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    };

    /**
     * behavior when character collides with coins
     * coins are collected and added to array + coin statusbar is updated
     */
    checkCoinCollections = () => {
        for (let i = this.coins.length - 1; i >= 0; i--) {
            if (this.character.isColliding(this.coins[i])) {
                this.character.collectCoins();
                this.coinBar.setCoinPercentage(this.character.collectedCoins);
                this.coins.splice(i, 1);
            }
        }
    };

    /**
     * behavior when character collides with bottles on ground
     * bottles are collected and added to array + coin statusbar is updated
     */
    checkBottleCollections = () => {
        for (let i = this.bottles.length - 1; i >= 0; i--) {
            if (this.character.collectedBottles < 100 && this.character.isColliding(this.bottles[i])) {
                this.character.collectBottles();
                this.bottleBar.setBottlePercentage(this.character.collectedBottles);
                this.bottles.splice(i, 1);
            }
        }
    };

    /**
     * behavior when thrown bottle (thorwable Object) hits chicken
     * enemy dies and is spliced with a delay
     * interval for bottle is stopped to reduce strain on system
     * bottle is spliced
     */
    checkBottleHitsChicken = () => {
        for (let j = this.throwableObjects.length - 1; j >= 0; j--) {
            const bottle = this.throwableObjects[j];
            for (let i = this.level.enemies.length - 1; i >= 0; i--) {
                const enemy = this.level.enemies[i];
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
                }
            }
        }
    };

    /**
     * behavior when thrown bottle (thorwable Object) hits endboss
     * endboss loses energy
     * interval for bottle is stopped to reduce strain on system
     * bottle is spliced
     * break stops bottle from reducing energy continueously
     */
    checkBottleHitsEndboss = () => {
        for (let j = this.throwableObjects.length - 1; j >= 0; j--) {
            const bottle = this.throwableObjects[j];
            for (let i = this.level.boss.length - 1; i >= 0; i--) {
                const enemy = this.level.boss[i];
                if (!bottle.hitEnemy && !enemy.isDead() && bottle.isColliding(enemy)) {
                    enemy.hit();
                    this.endbossBar.setEndbossPercentage(enemy.energy);
                    bottle.hit();
                    setTimeout(() => {
                        bottle.stopIntervals();
                        const index = this.throwableObjects.indexOf(bottle);
                        if (index > -1) this.throwableObjects.splice(index, 1);
                    }, 1500);
                    break;
                }
            }
        }
    };

    /**
     * behavior when character approaches endboss
     * Math.abs = Math absolute so that it also works when PEPE is to the right of the endboss
     */
    characterApproachesEndboss = () => {
        this.level.boss.forEach((boss) => {
            if (Math.abs(boss.x - this.character.x) < 400 && this.character.x > boss.x) {
                boss.otherDirection = true;
                this.level.boss.forEach((boss) => boss.moveRight());
                this.level.boss.forEach((boss) => boss.startMoving());
            } else if (Math.abs(boss.x - this.character.x) < 500 && this.character.x < boss.x) {
                boss.otherDirection = false;
                this.level.boss.forEach((boss) => boss.moveLeft());
                this.level.boss.forEach((boss) => boss.startMoving());
            } else {
                this.level.boss.forEach((boss) => (boss.moving = false));
            }
        });
    };

    /**
     * being too close to endboss triggers attack
     * Math.abs = Math absolute so that it also works when PEPE is to the right of the endboss
     */
    endbossAttacks = () => {
        this.level.boss.forEach((boss) => {
            if (Math.abs(boss.x - this.character.x) < 150 && !boss.isDead()) {
                boss.attack();
            }
        });
    };

    /**
     * manages the position of the camera in relation to the character
     */
    cameraPosition() {
        const boss = this.level.boss[0];
        if (boss && this.character.x > boss.x) {
            this.cameraRightSide(); // PEPE is right of the boss
        } else {
            this.cameraLeftSide(); // normal tracking
        }
        if (this.character.x >= 1980) this.level.level_end_x = 2480; // let PEPE reach the end
        this.camera_x = Math.max(this.camera_x, -1880); // hard stop at level end
        this.camera_x = Math.round(this.camera_x); // whole pixels, prevents background seams
    }

    /**
     * keeps PEPE 100px from the right edge, freezes camera until he gets there
     */
    cameraRightSide() {
        const rightLimit = -this.character.x + 470;
        if (this.camera_x >= rightLimit) this.cameraLocked = true;
        this.camera_x = this.cameraLocked ? rightLimit : Math.min(this.camera_x, rightLimit);
    }

    /**
     * keeps PEPE 100px from the left edge, freezes camera while he crosses back
     */
    cameraLeftSide() {
        const leftLimit = -this.character.x + 100;
        if (this.camera_x <= leftLimit) this.cameraLocked = false;
        this.camera_x = this.cameraLocked ? Math.max(this.camera_x, leftLimit) : leftLimit;
    }

    /**
     * adds all statusbars fixed to camera position
     */
    addStatusbars() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossBar);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     *
     * @param {*} objects - all objects needed inside canvas
     * triggers draw of all objects
     * calls camera position this.cameraPosition();
     * clearing canvas before each draw, so old animated images are deleted
     * draw() is repeatedly run = animation
     */
    draw() {
        this.cameraPosition();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addStatusbars();
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.boss);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Loop for Objects to draw
     * @param {*} obj - inserts each object from arrays to addToMap()
     */
    addObjectsToMap(objects) {
        objects.forEach((obj) => {
            this.addToMap(obj);
        });
    }

    /**
     * drawing objects
     * @param {*} obj - now adds all individual opbjects to map
     */
    addToMap(obj) {
        if (obj.otherDirection) {
            obj.flipImage(this.ctx);
        }
        obj.draw(this.ctx);
        if (obj.otherDirection) {
            obj.flipImageBack(this.ctx);
        }
    }

    /**
     * definition of game over and behavior
     */
    gameEnds = () => {
        if (this.character.dead || this.level.boss.some((boss) => boss.dead)) {
            IntervalHub.stopAllIntervals();
            AudioHub.stopAll();
            this.endScreen();
        }
    };

    /**
     * manages screen after game over
     */
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
