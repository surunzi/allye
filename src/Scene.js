import Proton from 'proton-js';
import util from './util';

export default class Scene {
    constructor() {
        let image = new Image();
        image.src = 'img/particle.png';
        image.onload = () => {
            this.init(image);
        }
        this.hasStart = false;
        this.isInit = false;
    }
    init(image) {
        this.isInit = true;
        let proton = this.proton = new Proton();
        let emitter = this.emitter = new Proton.Emitter();

        let canvas = util.$('#scene').get(0);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let context = canvas.getContext('2d');
        context.globalCompositeOperation = "lighter";

        emitter.rate = new Proton.Rate(new Proton.Span(5, 10), new Proton.Span(.05, .2));
        // emitter.addInitialize(new Proton.ImageTarget(image));
        emitter.addInitialize(new Proton.Life(2, 4));
        emitter.addInitialize(new Proton.V(new Proton.Span(0.5, 1.5), new Proton.Span(0, 360), 'polar'));
        emitter.addBehaviour(new Proton.Alpha(1, [.7, 1]));
        // emitter.addBehaviour(new Proton.Scale(1, 0));
        emitter.addBehaviour(new Proton.Color('random', 'random', Infinity, Proton.easeInSine));
        emitter.p.x = canvas.width / 2;
        emitter.p.y = canvas.height / 2;
        emitter.emit('once');
        proton.addEmitter(emitter);

        let renderer = new Proton.Renderer('canvas', proton, canvas);
		renderer.start();

        if (this.hasStart) this.start();
    }
    start() {
        if (!this.isInit) {
            this.hasStart = true;
            return;
        }

        this.tick();        
    }
    tick() {
        let raf = util.raf;

        raf(() => this.tick());

        this.proton.update();
    }
}