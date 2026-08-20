import { World } from "../models/world.class.js";

let canvas;
let world;

function init() {
    canvas = document.getElementById(`canvas`);
    world = new World(canvas);

    console.log(`my world is`, world);
    console.log(`my character is`, world.character);
    console.log(`my enemies are`, world.enemies);
}

init();
