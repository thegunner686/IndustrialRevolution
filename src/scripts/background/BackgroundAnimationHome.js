class BackgroundAnimationHome {
    constructor(canvas, width, height) {
        // initializations
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = width || canvas.width;
        this.height = height || canvas.height;

        // bindings
        this.init = this.init.bind(this);
        this.update = this.update.bind(this);
        this.draw = this.draw.bind(this);

        // objects/references
        this.backgroundColor = "rgba(200, 255, 255, 1)";// white
        //this.backgroundColor = "rgba(20, 20, 20, 0.1)";

        this.fourierAnimationSet = false;
        this.smokesSet = false;

        this.fourierAnimation;

        this.smokes = [];

        this.init();
    }


    setupFourierAnimation() {
        this.fourierAnimationSet = true;
        this.fourierAnimation = new FourierAnimation(this.width, this.height);

        this.fourierAnimation.init();
        //console.log(this.fourierAnimation.fourierY);
    }

    setupSmokes() {
        for(let i = 0; i < 30; i++) {
            this.smokes.push(new Smoke(this.width, this.height));
        }
        this.smokesSet = true;
    }

    init() {
        //this.setupFourierAnimation();
        this.setupSmokes();
        this.draw();
    }

    update() {

    }

    draw() {
        this.update();

        this.ctx.fillStyle = this.backgroundColor;

        this.ctx.fillRect(0, 0, this.width, this.height);
        //this.ctx.clearRect(0, 0, this.width, this.height);

        if(this.fourierAnimationSet) {
            this.fourierAnimation.draw(this.ctx);
        }

        if(this.smokesSet) {
            this.smokes.map((smoke) => {
                smoke.update();
                smoke.draw(this.ctx);
            });
        }


        setTimeout(() => {
            requestAnimationFrame(this.draw);
        }, 20);
    }
}