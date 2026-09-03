import { MovableObject } from "./movable-object.class.js";
import { Imagehub } from "./image-hub.class.js";
import { IntervalHub } from "./intervallhub.class.js";
import { AudioHub } from "./AudioHub.class.js";

export class SmallChicken extends MovableObject {
    y = 380;
    height = 50;
    width = 50;
    counter = 0;
    speed = 0.3 + Math.random();
    offset = {
        top: 5,
        right: 5,
        bottom: 15,
        left: 5,
    };
    showFrame = true; // frame for collision implementation

    constructor() {
        super();
        // loading images from Imagehub
        this.loadImage(Imagehub.SMALL_CHICKEN.move[0]);
        this.loadImages(Imagehub.SMALL_CHICKEN.move);
        this.loadImages(Imagehub.SMALL_CHICKEN.dead);
        // random positioning at start
        this.x = 300 + Math.random() * 2000;
        // start intervall for moving chicken
        IntervalHub.startInterval(this.animate, 1000 / 10);
        IntervalHub.startInterval(this.moveLeft, 1000 / 60);
    }

    // animate chicken walking
    animate = () => {
        if (this.isDead()) {
            this.playAnimation(Imagehub.SMALL_CHICKEN.dead);
            this.speed = 0;
            if (!this.soundPlayed) {
                AudioHub.playOne(AudioHub.CHICKEN_DEAD, true);
                this.soundPlayed = true;
            }
        } else {
            this.playAnimation(Imagehub.SMALL_CHICKEN.move);
        }
    };

    // chicken getting hit rreduces energy by 20
    hit() {
        this.energy -= 100;
    }
}
