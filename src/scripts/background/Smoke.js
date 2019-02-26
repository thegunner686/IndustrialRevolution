class Smoke {
    constructor(width, height) {
        this.nodes = [];

        this.width = width;
        this.height = height;

        this.x = width * 3 / 4 - width / 2 * Math.random();
        this.y = height + Math.random() * height * 2 + 100;
        this.interval = 0;
        let numNodes = 5 + Math.floor(Math.random() * 6);
        
        for(let i = 0; i < numNodes ; i++) {
            this.nodes.push({
                y: this.y + i * 10,
                x: this.x + (Math.random() < 0.5 ? -Math.random() : Math.random()) * 3
            });
        }
        this.incrementor = this.nodes.length - 1;
        this.update = this.update.bind(this);
        this.draw = this.draw.bind(this);
        this.speed = 2 + Math.random() * 5;
    }

    update() {
        this.y -= this.speed;
        if(this.interval % 1 == 0) {
            this.nodes[this.incrementor].x = this.x + (Math.random() < 0.5 ? -Math.random() : Math.random()) * 2;
            this.incrementor--;
            if(this.incrementor <= 0) {
                this.incrementor = this.nodes.length - 1;
            }
        }
        for(let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].y-=this.speed;
        }

        this.interval++;

        if(this.y <= -100) {
            this.y = this.height + Math.random() * this.height * 2 + 100;
            this.x = this.width * Math.random();
            this.nodes = [];
            let numNodes = 5 + Math.floor(Math.random() * 6);
            for(let i = 0; i < numNodes ; i++) {
                this.nodes.push({
                    y: this.y + i * 10,
                    x: this.x + (Math.random() < 0.5 ? -Math.random() : Math.random())
                });
            }
            this.incrementor = this.nodes.length - 1;
            this.interval = 0;
        }
    }

    draw(ctx) {
        this.update();
        ctx.strokeStyle = Math.random() < 0.1 ? "rgba(220, 20, 30, 0.9)" : "rgba(35, 0, 0, 0.7)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.nodes[this.nodes.length - 1].x,this.nodes[this.nodes.length - 1].y);
        for(let i = this.nodes.length - 2; i >= 0; i--) {
            ctx.lineTo(this.nodes[i].x, this.nodes[i].y);
        }
        ctx.stroke();
        ctx.closePath();
    }
}