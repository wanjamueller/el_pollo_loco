let canvas;
let ctx;
let world = new World();

function init() {
    canvas = document.getElementById(`canvas`);
    ctx = canvas.getContext(`2d`);

    console.log(`my world is`, world);
    console.log(`my character is`, world.character);
    console.log(`my enemies are`, world.enemies);
}
