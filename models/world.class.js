import { Character } from "./character.class.js";
import { createLevel1 } from "../levels/level1.js";
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
    bottles = this.createObjects(BottleObjects, 12);
    coins = this.createObjects(coinObjects, 6);

    /**
     * sets up the 2D canvas context, links the character to the world and starts all game intervals
     * @param {HTMLCanvasElement} canvas - The canvas element handed over from game.js.
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
     * builds an array of new objects, used for the collectable bottles and coins
     * @param {Function} ObjectType - The class to create instances of, for example BottleObjects.
     * @param {number} amount - How many objects to create.
     * @returns {Object[]} The new objects.
     */
    createObjects(ObjectType, amount) {
        return Array.from({ length: amount }, () => new ObjectType());
    }

    /**
     * All methods for intervals at 1000 / 10
     */
    slowChecks = () => {
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
        this.checkCollisions();
        this.checkBottleHitsChicken();
        this.checkBottleHitsEndboss();
    };

    /**
     * Link world to character (translate camera_x via character)
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * behavior of throwable objects inside thw world
     * manages throwing to right and left -> flip animation of thrown bottle
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
     * behavior when the character collides with a chicken
     * landing on top kills it, any other contact costs energy and updates the statusbar
     * the bounce is applied after the loop, otherwise it would flip speed_y and break the check for a second chicken in the same tick
     */
    checkCollisions = () => {
        let stomped = false;
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            const enemy = this.level.enemies[i];
            if (enemy.isDead() || !this.character.isColliding(enemy)) continue;

            if (this.character.isJumpingOn(enemy)) {
                enemy.hit();
                enemy.removeEnemy(enemy);
                stomped = true;
            } else {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        }
        if (stomped) this.character.speed_y = 15;
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
     * enemy dies and is spliced with a delay, bottle is spliced
     * interval for bottle is stopped to reduce strain on system
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
                    this.removeBottle(bottle);
                    break;
                }
            }
        }
    };

    /**
     * behavior when thrown bottle (thorwable Object) hits endboss
     * interval for bottle is stopped to reduce strain on system, bottle is spliced
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
                    this.removeBottle(bottle);
                    break;
                }
            }
        }
    };

    /**
     * splices a bottle out of the array after a delay so the splash animation can finish
     * the bottle intervals are stopped first to save resources
     * @param {ThrowableObject} bottle - The bottle that hit an enemy.
     */
    removeBottle(bottle) {
        setTimeout(() => {
            bottle.stopIntervals();
            const index = this.throwableObjects.indexOf(bottle);
            if (index > -1) this.throwableObjects.splice(index, 1);
        }, 1500);
    }

    /**
     * behavior when character approaches endboss
     * the endboss turns towards PEPE and starts walking, out of range he stands still again
     */
    characterApproachesEndboss = () => {
        this.level.boss.forEach((boss) => {
            if (Math.abs(boss.x - this.character.x) < 500 && this.character.x > boss.x) {
                boss.otherDirection = true;
                this.approachFromRight();
            } else if (Math.abs(boss.x - this.character.x) < 500 && this.character.x < boss.x) {
                boss.otherDirection = false;
                this.approachFromLeft();
            } else {
                this.level.boss.forEach((boss) => (boss.moving = false));
            }
        });
    };

    /**
     * sends the endboss to the right, towards a PEPE who has passed him
     */
    approachFromRight() {
        this.level.boss.forEach((boss) => boss.moveRight());
        this.level.boss.forEach((boss) => boss.startMoving());
    }

    /**
     * sends the endboss to the left, towards a PEPE who is still in front of him
     */
    approachFromLeft() {
        this.level.boss.forEach((boss) => boss.moveLeft());
        this.level.boss.forEach((boss) => boss.startMoving());
    }

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
     * triggers draw of all objects and schedules the next frame
     * the two translate calls have to cancel each other out, canvas transforms add up otherwise
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
     * @param {Object[]} objects - All objects of one array that need to be drawn.
     */
    addObjectsToMap(objects) {
        objects.forEach((obj) => {
            this.addToMap(obj);
        });
    }

    /**
     * drawing objects
     * @param {Object} obj - The single object to draw, mirrored first if it faces the other way.
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
     * shows the win or lose screen with a dark overlay over the canvas
     */
    endScreen() {
        if (this.level.boss.some((boss) => boss.dead)) {
            document.getElementById("won").classList.remove("d_none");
            document.getElementById("overlay").classList.remove("d_none");
            this.wonAndLostScreen();
            this.wonScreen();
        } else {
            document.getElementById("lost").classList.remove("d_none");
            document.getElementById("overlay").classList.remove("d_none");
            this.wonAndLostScreen();
            this.lostScreen();
        }
    }

    /**
     * hides the canvas and shows the menu again after three seconds, so the game can be restarted or left
     * runs for both endings, the win and the lose screen
     */
    wonAndLostScreen() {
        setTimeout(() => {
            document.getElementById("start-menu").classList.toggle(`d_none`);
            document.getElementById("start-game").classList.add(`d_none`);
            document.getElementById("again").classList.remove(`d_none`);
            document.getElementById("home").classList.remove(`d_none`);
            document.getElementById("imprint-button").classList.add(`d_none`);
            document.getElementById("controls").classList.add(`d_none`);
            document.getElementById("canvas").classList.add("d_none");
            document.getElementById("overlay").classList.add("d_none");
            document.getElementById("mute-button").classList.add("d_none");
        }, 3000);
    }

    /**
     * swaps the lose banner for the full lose screen after three seconds
     */
    lostScreen() {
        setTimeout(() => {
            document.getElementById("end-lost").classList.remove("d_none");
            document.getElementById("lost").classList.add("d_none");
        }, 3000);
    }

    /**
     * swaps the win banner for the full win screen after three seconds
     */
    wonScreen() {
        setTimeout(() => {
            document.getElementById("end-won").classList.remove("d_none");
            document.getElementById("won").classList.add("d_none");
        }, 3000);
    }
}
