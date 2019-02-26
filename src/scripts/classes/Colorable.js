class Colorable extends Parentable {
    constructor() {
        super();
        this.color = {};

        this.setColor = this.setColor;
        this.getColor = this.getColor;
        this.getColorWithOpacity = this.getColorWithOpacity;
        this.getColorWithDistortedR = this.getColorWithDistortedR;
        this.getColorWithDistortedG = this.getColorWithDistortedG;
        this.getColorWithDistortedB = this.getColorWithDistortedB;

        this.oGetColor = this.oGetColor;
        this.oGetColorWithOpacity = this.oGetColorWithOpacity;
        this.oGetColorWithDistortedR = this.oGetColorWithDistortedR;
        this.oGetColorWithDistortedG = this.oGetColorWithDistortedG;
        this.oGetColorWithDistortedB = this.oGetColorWithDistortedB;

        this.getColorWithValues = this.getColorWithValues;
    }

    setColor(r, g, b, a) {
        this.color = {
            r,
            g,
            b,
            a: a || 1
        };
    }

    getColor() {
        let { r, g, b, a } = this.color;
        return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    }

    getColorWithOpacity(op) {
        let { r, g, b } = this.color;
        return "rgba(" + r + ", " + g + ", " + b + ", " + op + ")";
    }

    getColorWithDistortedR(r) {
        let { g, b, a } = this.color;
        return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    }

    getColorWithDistortedG(g) {
        let { r, b, a } = this.color;
        return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    }

    getColorWithDistortedB(b) {
        let { r, g, a } = this.color;
        return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    }

    oGetColor() {
        return this.color;
    }

    oGetColorWithOpacity(op) {
        let { r, g, b } = this.color;
        return {
            r,
            g,
            b,
            a: op
        };
    }

    oGetColorWithDistortedR(r) {
        let { g, b, a } = this.color;
        return {
            r,
            g,
            b,
            a,
        };
    }

    oGetColorWithDistortedG(g) {
        let { r, b, a } = this.color;
        return {
            r,
            g,
            b,
            a
        };
    }

    oGetColorWithDistortedB(b) {
        let { r, g, a } = this.color;
        return {
            r,
            g,
            b,
            a
        };
    }

    getColorWithValues(r, g, b, a) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    }
}