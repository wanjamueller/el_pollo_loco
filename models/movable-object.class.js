export class MovableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {};

    constructor() {}

    // images need loading before drawing in world()
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log(`moving right`);
    }

    moveLeft() {}
}
