import { BackgroundObject } from "../models/background-object.class.js";
import { SmallChicken } from "../models/chicken-small.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { Endboss } from "../models/endboss.class.js";
import { Imagehub } from "../models/image-hub.class.js";
import { Level } from "../models/level.class.js";

export const level1 = new Level(
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
    [
        new BackgroundObject(Imagehub.BACKGROUND.sky),
        new BackgroundObject(Imagehub.BACKGROUND.plain[0]),
        new BackgroundObject(Imagehub.BACKGROUND.red[0]),
        new BackgroundObject(Imagehub.BACKGROUND.color[0]),

        new BackgroundObject(Imagehub.BACKGROUND.sky),
        new BackgroundObject(Imagehub.BACKGROUND.plain[1]),
        new BackgroundObject(Imagehub.BACKGROUND.red[1]),
        new BackgroundObject(Imagehub.BACKGROUND.color[1]),

        new BackgroundObject(Imagehub.BACKGROUND.sky),
        new BackgroundObject(Imagehub.BACKGROUND.plain[0]),
        new BackgroundObject(Imagehub.BACKGROUND.red[0]),
        new BackgroundObject(Imagehub.BACKGROUND.color[0]),

        new BackgroundObject(Imagehub.BACKGROUND.sky),
        new BackgroundObject(Imagehub.BACKGROUND.plain[1]),
        new BackgroundObject(Imagehub.BACKGROUND.red[1]),
        new BackgroundObject(Imagehub.BACKGROUND.color[1]),

        new BackgroundObject(Imagehub.BACKGROUND.sky),
        new BackgroundObject(Imagehub.BACKGROUND.plain[0]),
        new BackgroundObject(Imagehub.BACKGROUND.red[0]),
        new BackgroundObject(Imagehub.BACKGROUND.color[0]),

        new BackgroundObject(Imagehub.BACKGROUND.sky),
        new BackgroundObject(Imagehub.BACKGROUND.plain[1]),
        new BackgroundObject(Imagehub.BACKGROUND.red[1]),
        new BackgroundObject(Imagehub.BACKGROUND.color[1]),
    ],
);
