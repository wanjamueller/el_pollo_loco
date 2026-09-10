/**
 * wraps one audio file together with the state needed to control it
 * @class
 */
export class MyAudio {
    file;
    isLoaded;
    isPlaying = false;
    volume = 0.3;
    static muted = false;

    /**
     * creates the audio element and resets the playing flag once the file has finished
     * @param {string} _file - Path to the audio file.
     */
    constructor(_file) {
        this.file = new Audio(_file);
        this.file.addEventListener(`ended`, () => {
            this.isPlaying = false;
        });
    }
}

/**
 * holds every sound of the game and the methods to play and stop them
 * @class
 */
export class AudioHub {
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
    static BACKGROUND = new MyAudio(`./assets/audio/background.mp3`);

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
        AudioHub.BACKGROUND,
    ];

    /**
     * plays a single sound from the start, the mute flag is applied per sound
     * volume is set separately because iOS ignores volume changes and only honours muted
     * @param {MyAudio} sound - The sound to play.
     * @param {boolean} [retrigger=false] - True restarts a sound that is already running, used for short effects like jumping or collecting.
     */
    static playOne(sound, retrigger = false) {
        if (sound.isPlaying && !retrigger) return;
        sound.isPlaying = true;
        sound.file.currentTime = 0;
        sound.file.muted = MyAudio.muted;
        sound.file.volume = sound.volume;
        sound.file.play().catch(() => {
            sound.isPlaying = false;
        });
    }

    /**
     * pauses every sound of the game and clears their playing flags, used at game over
     */
    static stopAll() {
        AudioHub.allSounds.forEach((sound) => {
            sound.file.pause();
            sound.file.isPlaying = false;
            sound.isPlaying = false;
        });
    }

    /**
     * pauses one single sound and clears its playing flag
     * @param {MyAudio} sound - The sound to stop.
     */
    static stopOne(sound) {
        sound.file.pause();
        sound.file.isPlaying = false;
        sound.isPlaying = false;
    }
}
