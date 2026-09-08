import { MyAudio, AudioHub } from "../models/AudioHub.class.js";
import { Keyboard, mobileButtons } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";

let canvas = document.getElementById(`canvas`);
let world;
let keyboard = new Keyboard();

window.addEventListener(`load`, () => {
    document.getElementById(`mute-button`).addEventListener(`click`, toggleMute);
    document.getElementById(`play`).addEventListener(`click`, startGame);
    document.getElementById(`home`).addEventListener(`click`, startScreen);
    // document.getElementById(`fullscreen`).addEventListener(`click`, toggleFullscreen);
    fullscreenMode(); // checks if mobile
});

function init() {
    // world is initialized with canvas
    world = new World(canvas);
}

function startScreen() {
    document.getElementById("start").classList.toggle("d_none");
    document.getElementById("won").classList.add("d_none");
    document.getElementById("lost").classList.add("d_none");
    document.getElementById("canvas").classList.add("d_none");
    document.getElementById("home").classList.add("d_none");
    document.getElementById("imprint").classList.remove("d_none");
}

// game starts and overlays settings
function startGame() {
    init();
    document.getElementById("start").classList.toggle("d_none");
    document.getElementById("start-menu").classList.toggle("d_none");
    document.getElementById("won").classList.add("d_none");
    document.getElementById("lost").classList.add("d_none");
    document.getElementById("start").classList.add("d_none");
    document.getElementById("canvas").classList.remove("d_none");
    document.getElementById("imprint").classList.add("d_none");
    ocument.getElementById("imprint").classList.add("d_none");
    mobile();
}

// mobile button functions and having them appear
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

// muting game
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

// fullscreen
function toggleFullscreen() {
    const el = document.querySelector(`.canvas`);

    if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    } else {
        if (el.requestFullscreen) {
            el.requestFullscreen().catch(() => {});
        } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
        }
    }
}

// fullscreen by default if mobile (if widescreen orientation)
function fullscreenMode() {
    if (hasTouch()) {
        toggleFullscreen();
    }
}
