function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function oRandomColor() {
    return {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
        a: Math.random()
    };
}

function randomColor() {
    let { r, g, b, a } = oRandomColor();
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

function addAnchorSpring(obj, x, y) {
    let offset = 5,
        length = 10,
        k = 0.001;

    // top left
    obj.addSpring({
        x: x - offset,
        y: y - offset,
        k,
        length
    });

    // top
    obj.addSpring({
        x,
        y: y - offset,
        k,
        length
    });

    // top right
    obj.addSpring({
        x: x + offset,
        y: y - offset,
        k,
        length
    });

    // left
    obj.addSpring({
        x: x - offset,
        y,
        k,
        length
    });

    // right
    obj.addSpring({
        x: x + offset,
        y,
        k,
        length
    });

    // bottom left
    obj.addSpring({
        x: x - offset,
        y: y + offset,
        k,
        length
    });

    // bottom
    obj.addSpring({
        x,
        y: y - offset,
        k,
        length
    });

    // bottom right
    obj.addSpring({
        x: x + offset,
        y: y + offset,
        k,
        length
    });
}