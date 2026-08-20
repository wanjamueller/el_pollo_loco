export class MovableObject {
    x;
    y;
    height;
    width;
    img;

    constructor() {}

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log(`moving right`);
    }

    moveLeft() {}
}
