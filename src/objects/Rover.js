const {DELTA, DIRECTIONS, ANGLES, TURNS, cos, sin} = require('../utils/utils');

class Rover {
    constructor(initialParams) {
        Object.keys(initialParams).forEach(k => this[k] = initialParams[k]);
    }

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

    move({x, y, direction}) {
        const a = DIRECTIONS[direction];
        return {
            x: +x + DELTA.x * cos(a),
            y: +y + DELTA.y * sin(a)
        };
    }

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