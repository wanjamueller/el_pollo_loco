import { MyAudio, AudioHub } from "../models/AudioHub.class.js";
import { Imagehub } from "../models/image-hub.class.js";
import { Keyboard, mobileButtons } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";
import { dialogTemplate, imprintTemplate } from "./templates.js";

let canvas = document.getElementById(`canvas`);
let world;
let keyboard = new Keyboard();
const controlRef = document.getElementById("settings");
const imprintRef = document.getElementById("imprint");

/**
 * connects all menu buttons once the page has finished loading and restores the saved mute state
 * the play button stays hidden until every image is cached, so the game never starts on missing sprites
 */
window.addEventListener(`load`, async () => {
    document.getElementById(`mute-button`).addEventListener(`click`, toggleMute);
    document.getElementById(`start-game`).addEventListener(`click`, startGame);
    document.getElementById(`again`).addEventListener(`click`, startGame);
    document.getElementById(`home`).addEventListener(`click`, startScreen);
    document.getElementById(`controls`).addEventListener(`click`, showControls);
    document.getElementById(`imprint-button`).addEventListener(`click`, showImprint);
    loadMuteState();
    await preloadImages();
    document.getElementById("start-game").classList.remove("d_none");
    document.getElementById("loading").classList.add("d_none");
});

/**
 * creates a new world with the canvas, a fresh world is built on every start
 */
function init() {
    world = new World(canvas);
}

/**
 * loads every image of the Imagehub into the browser cache before the game can be started
 * each image gets its own promise, Promise.all waits until the last one is done
 * onerror also resolves, so one missing file never blocks the play button
 * @returns {Promise} Resolves once all images are loaded.
 */
function preloadImages() {
    const paths = [];
    Object.values(Imagehub).forEach((group) => {
        Object.values(group).forEach((set) => {
            Array.isArray(set) ? paths.push(...set) : paths.push(set);
        });
    });

    return Promise.all(
        paths.map(
            (path) =>
                new Promise((resolve) => {
                    const img = new Image();
                    img.onload = resolve;
                    img.onerror = resolve;
                    img.src = path;
                }),
        ),
    );
}

/**
 * shows the start screen again and hides the canvas and the end screens
 */
function startScreen() {
    document.getElementById("start").classList.toggle("d_none");
    document.getElementById("controls").classList.remove("d_none");
    document.getElementById("start-game").classList.remove("d_none");
    document.getElementById("again").classList.add("d_none");
    document.getElementById("won").classList.add("d_none");
    document.getElementById("lost").classList.add("d_none");
    document.getElementById("canvas").classList.add("d_none");
    document.getElementById("home").classList.add("d_none");
    document.getElementById("imprint-button").classList.remove("d_none");
    document.getElementById("overlay").classList.add("d_none");
    document.getElementById("end-lost").classList.add("d_none");
    document.getElementById("end-won").classList.add("d_none");
    document.getElementById("mute-button").classList.remove("d_none");
    document.getElementById("mute-button-container").style.right = `clamp(0.3125rem, -0.9375rem + 6.25vw, 1.875rem)`;
}

/**
 * builds the world, hides all menu overlays, starts the background music and shows the mobile controls if touch device
 */
function startGame() {
    init();
    document.getElementById("start-menu").classList.toggle("d_none");
    document.getElementById("won").classList.add("d_none");
    document.getElementById("lost").classList.add("d_none");
    document.getElementById("start").classList.add("d_none");
    document.getElementById("canvas").classList.remove("d_none");
    document.getElementById("imprint-button").classList.add("d_none");
    document.getElementById("overlay").classList.add("d_none");
    document.getElementById("end-lost").classList.add("d_none");
    document.getElementById("end-won").classList.add("d_none");
    document.getElementById("mute-button").classList.remove("d_none");
    document.getElementById("mute-button-container").style.right = `5px`;
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
 * the muted flag is set on every sound because iOS ignores volume changes and only honours muted
 */
function toggleMute() {
    MyAudio.muted = !MyAudio.muted;
    localStorage.setItem(`muted`, MyAudio.muted);
    document.getElementById("mute").classList.toggle("d_none");
    document.getElementById("unmute").classList.toggle("d_none");
    AudioHub.allSounds.forEach((sound) => {
        sound.file.muted = MyAudio.muted;
    });
}

/**
 * reads the saved mute state and shows the matching icon
 * local storage only holds strings, so the value is compared against the text "true"
 */
function loadMuteState() {
    MyAudio.muted = localStorage.getItem(`muted`) === `true`;
    AudioHub.allSounds.forEach((sound) => (sound.file.muted = MyAudio.muted));
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
    controlRef.innerHTML = dialogTemplate();
    controlRef.classList.add(`open`);
    controlRef.showModal();
    document.getElementById(`close`).addEventListener(`click`, closeControls);
    controlRef.addEventListener(`close`, () => {
        controlRef.classList.remove(`open`);
    });
    controlRef.addEventListener(`click`, (e) => {
        if (e.target === controlRef) controlRef.close();
    });
}

/**
 * closes the controls dialog
 */
function closeControls() {
    controlRef.close();
    controlRef.classList.remove("open");
}

/**
 * fills the dialog with the imprint template and opens it
 * the close button is connected here because it only exists after the template was inserted
 * a click on the backdrop closes the dialog, e.target is only the dialog itself when the backdrop was hit
 */
function showImprint() {
    imprintRef.innerHTML = imprintTemplate();
    imprintRef.classList.add(`open`);
    imprintRef.showModal();
    document.getElementById(`close-imprint`).addEventListener(`click`, closeImprint);
    imprintRef.addEventListener(`close`, () => {
        imprintRef.classList.remove(`open`);
    });
    imprintRef.addEventListener(`click`, (e) => {
        if (e.target === imprintRef) imprintRef.close();
    });
}

/**
 * closes the imprint dialog
 */
function closeImprint() {
    imprintRef.close();
    imprintRef.classList.remove("open");
}
