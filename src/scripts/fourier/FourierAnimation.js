class FourierAnimation extends Colorable {
    constructor(width, height) {
        super();
        this.x = [];
        this.y = [];
        this.fourierX;
        this.fourierY;


        this.width = width;
        this.height = height;


        this.time = 0;

        //this.setColor(255, 255, 255, 1); // white
        this.setColor(0, 0, 0, 1); // black
        //this.setColor(240, 100, 70, 1); // red

        this.path = [];

        this.epiCycleX = null;
        this.epiCycleY = null;
        this.epiRadius = 0;
    }

    init() {
        let xs = [],
            ys = [];
        //console.log(TEST_DATA.length);
        // for(let i = 0; i < TEST_DATA.length; i+=50) {
        //         xs.push(TEST_DATA[i].x);
        //         ys.push(TEST_DATA[i].y);
        // }

        this.epiRadius = this.width / 2;
        for(let i = 0; i < 100; i++) {
            let angle = (i / 100) * Math.PI * 2;
            xs.push(this.epiRadius * Math.cos(angle) * Math.sin(angle));
            //xs.push(Math.random() * 100);
        }
        for(let i = 0; i < 100; i++) {
            let angle = (i / 100) * Math.PI * 2;
            ys.push(this.epiRadius * Math.sin(angle) * Math.sin(angle));
            //ys.push(Math.random() * 100);
        }

        this.epiCycleX = new EpiCycle(
            this.width / 2, // x
            50, // y
            0.1,  // speed
            Math.random() * Math.PI * 2, // dir
            20, // mass
            0, // rotation angle
            xs // values
        );


        this.epiCycleY = new EpiCycle(
            this.width / 6, // x
            this.height / 3, // y
            0.1,  // speed
            Math.random() * Math.PI * 2, // dir
            20, // mass
            Math.PI / 2, // rotation angle
            ys // values
        );

        let sunMass = 100,
            sunX = this.width / 2,//this.width / 2,
            sunY = this.height / 2;//this.height / 2;

        this.epiCycleX.addGravitation({
            x: sunX,
            y: sunY,
            mass: sunMass
        });

        this.epiCycleY.addGravitation({
            x: sunX,
            y: sunY,
            mass: sunMass
        });



    }
    
    draw(ctx) {
        let x = this.centerX,
            y = this.centerY,
            dt = 1;

        let ex = this.epiCycleX.drawAndUpdate(ctx, this.time),
            ey = this.epiCycleY.drawAndUpdate(ctx, this.time);

        this.path.unshift({x: ex.x, y: ey.y, a: 0.1 + Math.random() / 10});

        let offsetX = 0,//-this.epiRadius / 2.4,
            offsetY = 0,//-this.epiRadius / 1.8,
            scl = 0.4;
        
        ctx.strokeStyle = this.getColorWithOpacity(0.1);
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(ex.cx, ex.cy);


        ctx.save();
        ctx.translate(offsetX, offsetY);
        ctx.lineTo(this.path[0].x, this.path[0].y);
        ctx.restore();


        ctx.stroke();
        ctx.closePath();


        ctx.beginPath();
        ctx.moveTo(ey.cx, ey.cy);


        ctx.save();
        ctx.translate(offsetX, offsetY);
        ctx.lineTo(this.path[0].x, this.path[0].y);

        ctx.stroke();
        ctx.closePath();

        for(let i = 1; i < this.path.length; i++) {
            ctx.beginPath();
            ctx.moveTo(this.path[i - 1].x, this.path[i - 1].y)
            ctx.strokeStyle = this.getColorWithOpacity(this.path[i].a);
            ctx.lineTo(this.path[i].x, this.path[i].y);
            ctx.stroke();
            ctx.closePath();
        }
        //ctx.stroke();
        ctx.restore();

        // TEST_DATA
        // for(let i = 0; i < this.path.length; i++) {
        //     let dp = TEST_DATA[i * 50];
        //     ctx.fillStyle = this.epiCycleX.getColorWithValues(dp.r, dp.g, dp.b, dp.a);
        //     ctx.beginPath();
        //     ctx.arc(this.path[i].x, this.path[i].y, 1, 0, Math.PI * 2);
        //     ctx.fill();
        //     ctx.closePath();
        // }

        // while(this.path.length > this.fourierY.length * 40) {
        //     this.path.splice(this.path.length - 1, 1);
        // }

        dt =  Math.PI * 2 / this.epiCycleX.fourier.length / 100;
        this.time += dt;
    }
}