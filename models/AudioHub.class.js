// Fixed Audiohub

class MyAudio{
    file;
    isLoaded;

    constructor(_file){
        this.file = new Audio(_file);
    }
}


export class AudioHub {
    // Audiodateien für Piano, Guitar, DRUMS
    static PIANO = new MyAudio('./assets/sounds/piano.mp3');
    static GUITAR = new MyAudio('./assets/sounds/guitar.mp3');
    static DRUMS = new MyAudio('./assets/sounds/drums.mp3');

    // Array, das alle definierten Audio-Dateien enthält
    static allSounds = [AudioHub.PIANO, AudioHub.GUITAR, AudioHub.DRUMS];


    // Spielt eine einzelne Audiodatei ab
    static playOne(sound) {
        sound.file.currentTime = 0;

        if (sound.file.readyState === 4 || sound.isLoaded) {
            sound.isLoaded = true;
            sound.file.play();
        }
    }


    // Stoppt das Abspielen aller Audiodateien
    static stopAll() {
        AudioHub.allSounds.forEach((sound) => {
            sound.file.pause();
        });
    }


    // Stoppt das Abspielen einer einzelnen Audiodatei
    static stopOne(sound) {
        sound.file.pause();
    }
}