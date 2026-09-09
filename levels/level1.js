import { BackgroundObject } from "../models/background-object.class.js";
import { SmallChicken } from "../models/chicken-small.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { Endboss } from "../models/endboss.class.js";
import { Imagehub } from "../models/image-hub.class.js";
import { Level } from "../models/level.class.js";

/**
 * the level that is currently being played, filled by createLevel1()
 * @type {Level}
 */
export let level1;

/**
 * builds the background segments layer by layer, each segment is 720px wide and starts one screen to the left
 * the two variants of a layer alternate per segment, the sky has only one variant and repeats
 * @param {number} segments - How many 720px segments the background should be wide.
 * @returns {BackgroundObject[]} All background objects in draw order, back layer first.
 */
function createBackground(segments) {
    const bg = Imagehub.BACKGROUND;
    const layers = [[bg.sky], bg.plain, bg.red, bg.color];
    const objects = [];

    for (let i = 0; i < segments; i++) {
        const x = -720 + i * 720;
        layers.forEach((variants) => {
            objects.push(new BackgroundObject(variants[i % variants.length], x));
        });
    }
    return objects;
}

/**
 * creates a fresh level with new enemies, clouds and background objects
 * called again on every restart so no dead enemies or stopped intervals are carried over from the last game
 * @returns {Level} The newly built level.
 */
export function createLevel1() {
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),

            new SmallChicken(),
        ],
        [new Endboss()],
        [
            new Cloud(100, 0),
            new Cloud(500, 1),
            new Cloud(900, 0),
            new Cloud(1400, 1),
            new Cloud(1900, 0),
            new Cloud(2400, 1),
        ],
        createBackground(6),
    );
    return level1;
}
