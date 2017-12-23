import util from './util';
import Scene from './Scene';

export default class Player {
    constructor() {
        let $audio = util.$('#music');
        this.audio = $audio.get(0);
        this.scene = new Scene();
        this.scene.start();
    }
    play() {
        this.audio.play();
    }
    pause() {
        this.audio.pause();
    }
    stop() {
        this.audio.currentTime = 0;
        this.pause();
    }
}