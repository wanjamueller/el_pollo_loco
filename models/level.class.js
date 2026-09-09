/**
 * holds every object a level is built from and the borders PEPE can move between
 * @class
 */
export class Level {
    enemies;
    boss;
    clouds;
    backgroundObjects;
    level_start_x = -620;
    level_end_x = 1980;

    /**
     * stores all object arrays that make up the level
     * @param {MovableObject[]} enemies - All chickens and small chickens of the level.
     * @param {Endboss[]} boss - The endboss, kept in an array so it can be spliced out when dead.
     * @param {Cloud[]} clouds - The clouds drifting through the background.
     * @param {BackgroundObject[]} backgroundObjects - All background layer segments in draw order.
     */
    constructor(enemies, boss, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.boss = boss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}
