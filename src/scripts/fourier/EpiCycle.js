class EpiCycle extends ColorablePhysical {
    constructor(x, y, speed, direction, mass, rotation, values) {
        super(x, y, speed, direction, mass);

        this.rotation = rotation;
        this.fourier = [];
        this.values = values;

        //this.setColor(255, 255, 255, 1); //white
        this.setColor(0, 0, 0, 1); // black
        //this.setColor(120, 50, 35, 1); // red


        this.init();
    }

    init() {
        this.fourier = this.dft(this.values);
        this.fourier.sort((a, b) => {
            return b.amp - a.amp;
        });
    }

    setValues(vals) {
        this.values = vals;
    }

    dft(x) {
        let X = [],
            N = x.length;
        for(let k = 0; k < N; k++) {
            let re = 0,
                im = 0;
            for(let n = 0; n < N; n++) {
                let phi = (2 * Math.PI * k  * n) / N
                re += x[n] * Math.cos(phi);
                im -= x[n] * Math.sin(phi);
            }

            re = re / N;
            im = im / N;

            let freq = k,
                amp = Math.sqrt(re * re + im * im) ,
                phase = Math.atan2(im, re);

            X[k] = {
                re,
                im,
                freq,
                amp,
                phase
            };
        }

        return X;
    }

    drawAndUpdate(ctx, time) {
        this.update();
        let x = this.baseX,
            y = this.baseY,
            cx = this.x,
            cy = this.y;

        for(let i = 0; i < this.fourier.length; i++) {
            
            let prevX = x,
                prevY = y,
                prevCX = cx,
                prevCY = cy,
                freq = this.fourier[i].freq,
                radius = this.fourier[i].amp,
                phase = this.fourier[i].phase,
                a = 1,
                b = 0;

                x += radius * Math.cos(freq * time + phase + this.rotation)
                y += radius * Math.sin(freq * time + phase + this.rotation)
                //x += radius * Math.cos(freq * time + phase + this.rotation) * Math.cos(time * 50) + Math.random() / 2;
                //y += radius * Math.sin(freq * time + phase + this.rotation) + Math.random() / 2;
                cx -= radius / 4 * Math.cos(freq * time + phase + this.rotation);
                cy -= radius / 4 * Math.sin(freq * time + phase + this.rotation);



                ctx.strokeStyle = this.getColorWithOpacity(0.7);
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(prevCX, prevCY, radius / 4, 0, Math.PI * 2);
                ctx.stroke();
                ctx.closePath();

                ctx.beginPath();
                ctx.moveTo(prevCX, prevCY);
                ctx.lineTo(cx, cy);
                ctx.stroke();
                ctx.closePath();
        }
        return { x, y, cx, cy };
    }
}