import { BackgroundObject } from "../models/background-object.class.js";
import { SmallChicken } from "../models/chicken-small.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { Endboss } from "../models/endboss.class.js";
import { Imagehub } from "../models/image-hub.class.js";
import { Level } from "../models/level.class.js";

export let level1;

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
