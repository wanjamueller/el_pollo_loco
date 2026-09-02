// Fixed Audiohub

export class MyAudio {
    file;
    isLoaded;

    constructor(_file) {
        this.file = new Audio(_file);
    }
}

export class AudioHub {
    // audio files for all scenarios
    static CHARACTER_DAMAGE = new MyAudio(`./assets/audio/character/characterDamage.mp3`);
    static CHARACTER_DEAD = new MyAudio(`./assets/audio/character/characterDead.wav`);
    static CHARACTER_JUMP = new MyAudio(`./assets/audio/character/characterJump.wav`);
    static CHARACTER_RUN = new MyAudio(`./assets/audio/character/characterRun.mp3`);
    static CHARACTER_SNORING = new MyAudio(`./assets/audio/character/characterSnoring.mp3`);
    static CHICKEN_DEAD = new MyAudio(`./assets/audio/chicken/chickenDead.mp3`);
    static CHICKEN_DEAD_2 = new MyAudio(`./assets/audio/chicken/chickenDead2.mp3`);
    static BOTTLE_COLLECTED = new MyAudio(`./assets/audio/collectibles/bottleCollectSound.wav`);
    static COIN_COLLECTED = new MyAudio(`./assets/audio/collectibles/collectSound.wav`);
    static ENDBOSS_APPROACH = new MyAudio(`./assets/audio/endboss/endbossApproach.wav`);
    static GAME_START = new MyAudio(`./assets/audio/game/gameStart.mp3`);
    static BOTTLE_BREAK = new MyAudio(`./assets/audio/throwable/bottleBreak.mp3`);

    // Array with all defined audio files
    static allSounds = [
        AudioHub.CHARACTER_DAMAGE,
        AudioHub.CHARACTER_DEAD,
        AudioHub.CHARACTER_JUMP,
        AudioHub.CHARACTER_RUN,
        AudioHub.CHARACTER_SNORING,
        AudioHub.CHICKEN_DEAD,
        AudioHub.CHICKEN_DEAD_2,
        AudioHub.BOTTLE_COLLECTED,
        AudioHub.COIN_COLLECTED,
        AudioHub.ENDBOSS_APPROACH,
        AudioHub.GAME_START,
        AudioHub.BOTTLE_BREAK,
    ];

    // plays a specific audio file
    static playOne(sound) {
        sound.file.currentTime = 0;

        if (sound.file.readyState === 4 || sound.isLoaded) {
            sound.isLoaded = true;
            sound.file.play();
        }
    }

    // stops playing all audio files
    static stopAll() {
        AudioHub.allSounds.forEach((sound) => {
            sound.file.pause();
        });
    }

    // stops playing a specific audio file
    static stopOne(sound) {
        sound.file.pause();
    }
}
