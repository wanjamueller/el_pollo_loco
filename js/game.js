import { Keyboard } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";

let canvas = document.getElementById(`canvas`);
let world;
let keyboard = new Keyboard();

function init() {
    // world is initialized with canvas
    world = new World(canvas);

    console.log(`my world is`, world);
    console.log(`my character is`, world.character);
    console.log(`my enemies are`, world.level.enemies);
}

init();

window.addEventListener("keydown", (e) => {
    if (e.key == "ArrowRight") {
        Keyboard.RIGHT = true;
    }
    if (e.key == "ArrowLeft") {
        Keyboard.LEFT = true;
    }
    if (e.key == "ArrowUp") {
        Keyboard.UP = true;
    }
    if (e.key == "ArrowDown") {
        Keyboard.DOWN = true;
    }
    if (e.code == "Space") {
        Keyboard.SPACE = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowRight") {
        Keyboard.RIGHT = false;
    }
    if (e.key == "ArrowLeft") {
        Keyboard.LEFT = false;
    }
    if (e.key == "ArrowUp") {
        Keyboard.UP = false;
    }
    if (e.key == "ArrowDown") {
        Keyboard.DOWN = false;
    }
    if (e.code == "Space") {
        Keyboard.SPACE = false;
    }
});
