export class MovableObject {
    x;
    y;
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
