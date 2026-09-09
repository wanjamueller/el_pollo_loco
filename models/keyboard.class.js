/**
 * holds the current state of every key used to control the game
 * @class
 */
export class Keyboard {
    static UP = false;
    static DOWN = false;
    static LEFT = false;
    static RIGHT = false;
    static SPACE = false;
    static D = false;
}

/**
 * connects one on screen button to a key of the Keyboard class
 * touchcancel is needed so the key is released when the browser interrupts the touch, otherwise PEPE would keep running
 * @param {string} id - Id of the button element in the HTML.
 * @param {string} key - Name of the Keyboard property the button controls, for example LEFT or SPACE.
 */
export function mobileButtons(id, key) {
    const btn = document.getElementById(id);
    btn.addEventListener(`touchstart`, (e) => {
        e.preventDefault();
        Keyboard[key] = true;
    });
    btn.addEventListener(`touchend`, (e) => {
        e.preventDefault();
        Keyboard[key] = false;
    });
    btn.addEventListener(`touchcancel`, () => {
        Keyboard[key] = false;
    });
    btn.addEventListener(`mousedown`, () => (Keyboard[key] = true));
    btn.addEventListener(`mouseup`, () => (Keyboard[key] = false));
    btn.addEventListener(`mouseleave`, () => (Keyboard[key] = false));
}

/**
 * sets the matching Keyboard property to true while a key is held down
 */
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
        e.preventDefault();
        Keyboard.SPACE = true;
    }
    if (e.key == "d") {
        Keyboard.D = true;
    }
});

/**
 * sets the matching Keyboard property back to false when a key is released
 */
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
    if (e.key == "d") {
        Keyboard.D = false;
    }
});
