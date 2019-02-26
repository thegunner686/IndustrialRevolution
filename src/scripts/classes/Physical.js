class Physical extends Parentable {
    constructor(x, y, speed, direction, mass) {
        super();
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.vx = Math.cos(direction) * speed;
        this.vy = Math.sin(direction) * speed;

        this.mass = mass || 0; // gravity purposes

        this.gravity = 0; // acceleration applied in the positive y direction
        this.friction = 1; // 0 - 1, generic friction

        // objects which this Physical is springing to
        this.springs = [];
        // objects which this Physical is gravitating to
        this.gravitations = [];

        this.setFriction = this.setFriction;
        this.getFriction = this.getFriction;
        this.setGravity = this.getGravity;
        this.getGravity = this.getGravity;
        this.getSpeed = this.getSpeed;
        this.setSpeed = this.setSpeed;
        this.getDirection = this.getDirection;
        this.setDirection = this.setDirection;
        this.accelerate = this.accelerate;
        this.distanceTo = this.distanceTo;
        this.angleTo = this.angleTo;
        this.addGravitation = this.addGravitation;
        this.removeGravitation = this.removeGravitation;
        this.handleGravitations = this.handleGravitations;
        this.gravitateTo = this.gravitateTo;
        this.addSpring = this.addSpring;
        this.removeSpring = this.removeSpring;
        this.handleSprings = this.handleSprings;
        this.springTo = this.springTo;
        this.update = this.update;
        this.collided = this.collided;
    }

    setFriction(f) {
        this.friction = f;
    }

    getFriction() {
        return this.friction;
    }

    setGravity(g) {
        this.gravity = g;
    }

    getGravity() {
        return this.g;
    }

    getSpeed() {
        return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    }

    setSpeed(speed) {
        let dir = this.getDirection();
		this.vx = Math.cos(dir) * speed;
		this.vy = Math.sin(dir) * speed;
    }

    getDirection() {
        return Math.atan2(this.vy, this.vx);
    }

    setDirection(dir) {
        var speed = this.getSpeed();
		this.vx = Math.cos(dir) * speed;
		this.vy = Math.sin(dir) * speed;
    }

    accelerate(ax, ay) {
        this.vx += ax;
        this.vy += ay;
    }

    distanceTo(x1, y1) {
        return Math.sqrt((this.x - x1) * (this.x - x1) + (this.y - y1) * (this.y - y1));
    }

    angleTo(x1, y1) {
        return Math.atan2(y1 - this.y, x1 - this.x);
    }

    /*
        oPhysical = Physical Object
    */

    addGravitation(oPhysical) {
        this.removeGravitation(oPhysical);
        this.gravitations.push(oPhysical);
    }

    removeGravitation(oPhysical) {
        for(let i = this.gravitations.length - 1; i >= 0; i--) {
            if(this.gravitations[i] === oPhysical) {
                this.gravitations.splice(i, 1);
            }
        }
    }

    handleGravitations() {
        for(let i = 0; i < this.gravitations.length; i++) {
            this.gravitateTo(this.gravitations[i]);
        }
    }

    gravitateTo(oPhysical) {
        let buffer = 50;
        let dx = oPhysical.x - this.x,
            dy = oPhysical.y - this.y,
            distSQ = dx * dx + dy * dy + buffer,
            dist = Math.sqrt(distSQ),
            force = oPhysical.mass / distSQ,
            ax = dx / dist * force,
            ay = dy / dist * force;

        this.accelerate(ax, ay);
    }

    /*
        SPRING
        {
            x,
            y,
            k,
            length
        }
    */

    addSpring(spring) {
        this.springs.push(spring);
    }

    removeSpring(spring) {
        for(let i = this.springs.length - 1; i >= 0; i--) {
            if(this.springs[i] === spring) {
                this.springs.splice(i, 1);
            }
        }
    }

    handleSprings() {
        for(let i = 0; i < this.springs.length; i++) {
            let { x, y, k, length } = this.springs[i];
            this.springTo(x, y, k, length);
        }
    }

    springTo(sx, sy, k, length) {
        let dx = sx - this.x,
            dy = sy - this.y,
            dist = Math.sqrt(dx * dx + dy * dy),
            springForce = (dist - length || 0) * k,
            ax = dx / dist * springForce,
            ay = dy / dist * springForce;

        this.accelerate(ax, ay);
    }

    update(fn) {
        if(fn) {
            fn();
        }
        this.handleSprings();
        this.handleGravitations();

        this.accelerate(0, this.gravity == null ? 0 : this.gravity);

        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;
    }

    // based on objects using a radius for bounds
    collided(x, y, radius, buffer) {
        if(this.distanceTo(x, y) < radius + this.radius + (buffer || 0)) {
            return true;
        }
        return false;
    }
}