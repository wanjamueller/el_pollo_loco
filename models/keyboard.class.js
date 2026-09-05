export class Keyboard {
    static UP = false;
    static DOWN = false;
    static LEFT = false;
    static RIGHT = false;
    static SPACE = false;
    static D = false;
}

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
    if (e.key == "d") {
        Keyboard.D = true;
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
    if (e.key == "d") {
        Keyboard.D = false;
    }
});
