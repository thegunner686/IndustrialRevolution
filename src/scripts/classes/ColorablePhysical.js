class ColorablePhysical {
    constructor(x, y, speed, direction, mass) {
        let colorable = new Colorable();
        colorable.parent(this);
        let physical = new Physical(x, y, speed, direction, mass);
        physical.parent(this);
    }
}