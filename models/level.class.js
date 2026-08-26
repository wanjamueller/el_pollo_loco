export class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_start_x = -620; // fix for now, want to improve so levels can have different lengths
    level_end_x = 1540; // fix for now, want to improve so levels can have different lengths

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}
