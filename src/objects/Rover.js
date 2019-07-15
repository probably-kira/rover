const {DELTA, DIRECTIONS, ANGLES, TURNS, cos, sin} = require('../utils/utils');

class Rover {
    /**
     * initialize instance with instruction, name, landing
     * @param initialParams
     */
    constructor(initialParams) {
        Object.keys(initialParams).forEach(k => this[k] = initialParams[k]);
    }

    /**
     * Move rover corresponding to it's instructions
     * @returns {{x: *, y: *, direction: *}} final coords
     */
    followInstructions() {
        const {x, y, direction} = this.landing;
        return this.instructions.split('')
            .reduce((result, letter) => {
                let modificator = {};
                if (letter === 'M') {
                    modificator = this.move(result)
                } else {
                    modificator = this.turn(result, letter);
                }
                const newR = {
                    ...result,
                    ...modificator
                }
                return newR;
            }, {x, y, direction});
    }

    /**
     * move rover to one point in known direction
     * @param x
     * @param y
     * @param direction
     * @returns {{x: number, y: number}} new x/y
     */
    move({x, y, direction}) {
        const a = DIRECTIONS[direction];
        return {
            x: +x + DELTA.x * cos(a),
            y: +y + DELTA.y * sin(a)
        };
    }

    /**
     * Turns rover without moving
     * @param x
     * @param y
     * @param direction
     * @param letter - L or R
     * @returns {*} new direction(N/W/S/E)
     */
    turn({x, y, direction}, letter) {
        const turn = TURNS[letter];
        //unknown letter
        if (!turn) {
            return {}
        }
        let newDir = DIRECTIONS[direction] + turn;
        if (newDir >= 360) {
            newDir -= 360;
        }
        if (newDir < 0) {
            newDir = 360 + newDir;
        }

        return {
            direction: ANGLES[newDir]
        }
    }
}

module.exports = Rover;