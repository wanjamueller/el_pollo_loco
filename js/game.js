import { MyAudio, AudioHub } from "../models/AudioHub.class.js";
import { Keyboard, mobileButtons } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";

let canvas = document.getElementById(`canvas`);
let world;
let keyboard = new Keyboard();

document.getElementById(`mute-button`).addEventListener(`click`, toggleMute);
document.getElementById(`play`).addEventListener(`click`, startGame);

function init() {
    // world is initialized with canvas
    world = new World(canvas);
}

function startGame() {
    init();
    document.getElementById("start").classList.toggle("d_none");
    document.getElementById("play").classList.toggle("d_none");
    document.getElementById("won").classList.add("d_none");
    document.getElementById("lost").classList.add("d_none");
    document.getElementById("start").classList.add("d_none");
    mobile();
}

function mobile() {
    if (hasTouch()) {
        mobileButtons(`btnLeft`, `LEFT`);
        mobileButtons(`btnRight`, `RIGHT`);
        mobileButtons(`btnJump`, `SPACE`);
        mobileButtons(`btnAttack`, `D`);
        document.getElementById("moves").classList.remove("d_none");
        document.getElementById("actions").classList.remove("d_none");
    }
}

function toggleMute() {
    MyAudio.muted = !MyAudio.muted;
    document.getElementById("mute").classList.toggle("d_none");
    document.getElementById("unmute").classList.toggle("d_none");
    AudioHub.allSounds.forEach((sound) => {
        sound.file.volume = MyAudio.muted ? 0 : sound.volume;
    });
}

// check for touch device
function hasTouch() {
    return window.matchMedia(`(pointer: coarse)`).matches;
}
