class Parentable {
    constructor() {
        this.parent = this.parent;
    }

    parent(child) {
        Object.keys(this).map((key) => {
            if(this[key].bind) {
                child[key] = this[key].bind(child);
            } else {
                child[key] = this[key];
            }
        });
    }
}