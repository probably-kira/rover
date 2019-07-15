class Plateau {
    constructor({width, height}) {
        if (!width || !height) {
            return console.error('Plateau error: no dimensions')
        }
        this.width = width;
        this.height = height;
    }

    /**
     * check if point belongs to the axis
     * @param c - Point value
     * @param isX - x-axis or not
     * @returns {boolean}
     */
    isExistingCoord(c, isX) {
        const edge = isX ? 'width' : 'height';
        return c >=0 && c <= this[edge];
    }

    /**
     * check if Plateaus contains x & y;
     * @param x
     * @param y
     * @returns {boolean}
     */
    contains(x, y) {
        return this.isExistingCoord(x, true) && this.isExistingCoord(y);
    }
}

module.exports = Plateau;
