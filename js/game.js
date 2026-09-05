import { MyAudio, AudioHub } from "../models/AudioHub.class.js";
import { Keyboard } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";

let canvas = document.getElementById(`canvas`);
let world;
let keyboard = new Keyboard();

document.getElementById(`mute-button`).addEventListener(`click`, toggleMute);
document.getElementById(`play`).addEventListener(`click`, startGame);

function init() {
    // world is initialized with canvas
    world = new World(canvas);

    console.log(`my world is`, world);
    console.log(`my character is`, world.character);
    console.log(`my enemies are`, world.level.enemies);
}

function startGame() {
    init();
    document.getElementById("start").classList.toggle("d_none");
    document.getElementById("play").classList.toggle("d_none");
}

function toggleMute() {
    MyAudio.muted = !MyAudio.muted;
    document.getElementById("mute").classList.toggle("d_none");
    document.getElementById("unmute").classList.toggle("d_none");
    AudioHub.allSounds.forEach((sound) => {
        sound.file.volume = MyAudio.muted ? 0 : sound.volume;
    });
}

// window.addEventListener("keydown", (e) => {
//     if (e.key == "ArrowRight") {
//         Keyboard.RIGHT = true;
//     }
//     if (e.key == "ArrowLeft") {
//         Keyboard.LEFT = true;
//     }
//     if (e.key == "ArrowUp") {
//         Keyboard.UP = true;
//     }
//     if (e.key == "ArrowDown") {
//         Keyboard.DOWN = true;
//     }
//     if (e.code == "Space") {
//         Keyboard.SPACE = true;
//     }
//     if (e.key == "d") {
//         Keyboard.D = true;
//     }
// });

// window.addEventListener("keyup", (e) => {
//     if (e.key == "ArrowRight") {
//         Keyboard.RIGHT = false;
//     }
//     if (e.key == "ArrowLeft") {
//         Keyboard.LEFT = false;
//     }
//     if (e.key == "ArrowUp") {
//         Keyboard.UP = false;
//     }
//     if (e.key == "ArrowDown") {
//         Keyboard.DOWN = false;
//     }
//     if (e.code == "Space") {
//         Keyboard.SPACE = false;
//     }
//     if (e.key == "d") {
//         Keyboard.D = false;
//     }
// });
