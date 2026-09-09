import { MyAudio, AudioHub } from "../models/AudioHub.class.js";
import { Keyboard, mobileButtons } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";
import { dialogTemplate } from "./templates.js";

let canvas = document.getElementById(`canvas`);
let world;
let keyboard = new Keyboard();
const dialogRef = document.getElementById("settings");

/**
 * connects all menu buttons once the page has finished loading and restores the saved mute state
 */
window.addEventListener(`load`, () => {
    document.getElementById(`mute-button`).addEventListener(`click`, toggleMute);
    document.getElementById(`play`).addEventListener(`click`, startGame);
    document.getElementById(`home`).addEventListener(`click`, startScreen);
    document.getElementById(`controls`).addEventListener(`click`, showControls);
    loadMuteState();
});

/**
 * creates a new world with the canvas, a fresh world is built on every start
 */
function init() {
    world = new World(canvas);
}

/**
 * shows the start screen again and hides the canvas and the end screens
 */
function startScreen() {
    document.getElementById("start").classList.toggle("d_none");
    document.getElementById("won").classList.add("d_none");
    document.getElementById("lost").classList.add("d_none");
    document.getElementById("canvas").classList.add("d_none");
    document.getElementById("home").classList.add("d_none");
    document.getElementById("imprint").classList.remove("d_none");
    document.getElementById("overlay").classList.add("d_none");
}

/**
 * builds the world, hides all menu overlays, starts the background music and shows the mobile controls if touch device
 */
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
    document.getElementById("overlay").classList.add("d_none");
    AudioHub.playOne(AudioHub.BACKGROUND, true);
    mobile();
}

/**
 * connects the on screen buttons to the Keyboard class and shows them, only on touch devices
 */
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

/**
 * switches sound on or off, swaps the button icon and stores the choice in local storage
 * the volume is applied to all sounds at once so sounds go quiet immediately
 */
function toggleMute() {
    MyAudio.muted = !MyAudio.muted;
    localStorage.setItem(`muted`, MyAudio.muted);
    document.getElementById("mute").classList.toggle("d_none");
    document.getElementById("unmute").classList.toggle("d_none");
    AudioHub.allSounds.forEach((sound) => {
        sound.file.volume = MyAudio.muted ? 0 : sound.volume;
    });
}

/**
 * reads the saved mute state and shows the matching icon
 * local storage only holds strings, so the value is compared against the text "true"
 */
function loadMuteState() {
    MyAudio.muted = localStorage.getItem(`muted`) === `true`;
    if (MyAudio.muted) {
        document.getElementById(`mute`).classList.add(`d_none`);
        document.getElementById(`unmute`).classList.remove(`d_none`);
    }
}

/**
 * checks whether the device is controlled by finger instead of mouse
 * @returns {boolean} True on touch devices.
 */
function hasTouch() {
    return window.matchMedia(`(hover: none)`).matches;
}

/**
 * fills the dialog with the controls template and opens it
 * the close button is connected here because it only exists after the template was inserted
 * a click on the backdrop closes the dialog, e.target is only the dialog itself when the backdrop was hit
 */
function showControls() {
    dialogRef.innerHTML = dialogTemplate();
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

/**
 * closes the controls dialog
 */
function closeControls() {
    dialogRef.close();
    dialogRef.classList.remove("open");
}
