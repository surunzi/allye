import Player from './Player';
import "./style.css";

class Allye {
    constructor() {
        this.player = new Player();
        this.player.play();
    }   
}

new Allye();