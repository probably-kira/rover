class Plateau {
    constructor({width, height}) {
        if (!width || !height) {
            return console.error('Plateau error: no dimensions')
        }
        this.width = width;
        this.height = height;
    }

    isExistingCoord(c, isX) {
        const edge = isX ? 'width' : 'height';
        return c >=0 && c <= this[edge];
    }

    contains(x, y) {
        return this.isExistingCoord(x, true) && this.isExistingCoord(y);
    }
}

module.exports = Plateau;
