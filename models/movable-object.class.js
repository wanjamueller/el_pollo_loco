export class MovableObject {
    x;
    y;
    height;
    width;
    img;

    constructor() {}

    // images need loading before drawing in world()
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log(`moving right`);
    }

    moveLeft() {}
}
