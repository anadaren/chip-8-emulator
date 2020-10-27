class Speaker {
    constructor() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;

        this.audioCtx = new AudioContext();

        //Creates gain to change the volume
        this.gain = this.audioCtx.createGain();
        this.finish = this.audioCtx.destination;

        //Connects gain to audio context
        this.gain.connect(this.finish);
    }
    
    // Mute the audio
    this.gain.setValueAtTime(0, this.audioCtx.currentTime);
    // Unmute the audio
    this.gain.setValueAtTime(1, this.audioCtx.currentTime);

    play(frequency) {
        if (this.audioCtx && !this.oscillator) {
            this.oscillator = this.audioCtx.createOscillator();

            //Set the frequency
            this.oscillator.frequency.setValueAtTime(frequency || 440, this.audioCtx.currentTime);

            //Square wave
            this.oscillator.type = 'square';

            //Connect the gain and start the sound
            this.oscillator.connect(this.gain);
            this.oscillator.start();
        }
    }

    stop() {
        if (this.oscillator) {
            this.oscillator.stop();
            this.oscillator.disconnect();
            this.oscillator = null;
        }
    }

}

expoer default Speaker;