import { MyAudio, AudioHub } from "../models/AudioHub.class.js";
import { Keyboard, mobileButtons } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";
import { dialogTeamplate } from "./templates.js";

let canvas = document.getElementById(`canvas`);
let world;
let keyboard = new Keyboard();
const dialogRef = document.getElementById("settings");

window.addEventListener(`load`, () => {
    document.getElementById(`mute-button`).addEventListener(`click`, toggleMute);
    document.getElementById(`play`).addEventListener(`click`, startGame);
    document.getElementById(`home`).addEventListener(`click`, startScreen);
    document.getElementById(`controls`).addEventListener(`click`, showControls);
    loadMuteState(); // checks mute state
});

// creates world when play button is clickec
function init() {
    // world is initialized with canvas
    world = new World(canvas);
}

// manages start screen
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
    document.getElementById("imprint").classList.add("d_none");
    AudioHub.playOne(AudioHub.BACKGROUND, true);
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

// muting game and saving mute state to local storage
function toggleMute() {
    MyAudio.muted = !MyAudio.muted;
    localStorage.setItem(`muted`, MyAudio.muted);
    document.getElementById("mute").classList.toggle("d_none");
    document.getElementById("unmute").classList.toggle("d_none");
    AudioHub.allSounds.forEach((sound) => {
        sound.file.volume = MyAudio.muted ? 0 : sound.volume;
    });
}

// loads mute state
function loadMuteState() {
    MyAudio.muted = localStorage.getItem(`muted`) === `true`;
    if (MyAudio.muted) {
        document.getElementById(`mute`).classList.add(`d_none`);
        document.getElementById(`unmute`).classList.remove(`d_none`);
    }
}

// check for touch device
function hasTouch() {
    return window.matchMedia(`(pointer: coarse)`).matches;
}

// manages dialog for control description
function showControls() {
    dialogRef.innerHTML = dialogTeamplate();
    dialogRef.classList.add(`open`);
    dialogRef.showModal();
    document.getElementById(`close`).addEventListener(`click`, closeControls);
    dialogRef.addEventListener(`close`, () => {
        dialogRef.classList.remove(`open`);
    });
    dialogRef.addEventListener(`click`, (e) => {
        if (e.target === dialogRef) dialogRef.close();
    });
}

function closeControls() {
    dialogRef.close();
    dialogRef.classList.remove("open");
}
