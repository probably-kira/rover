const Plateau = require('./Plateau');
const Rover = require('./Rover');

class GroundControl {
    constructor({rovers = [], plateau = {}}) {
        this.plateau = new Plateau(plateau);
        this.rovers = rovers;
    }

    /**
     * Validate position of each rover
     * @param rover
     * @returns {*}
     */
    tryToLandRover(r) {
        const {name, landing: {x, y, direction}} = r;
        if (this.plateau.contains(x, y)) {
            return r;
        }
        console.error(`${name} error: coords doesn't exist`);
        return null
    }

    /**
     * Takes all rovers, validate their position,
     * and move in agree with instructions
     */
    moveRovers() {
        this.rovers.map(data => {
            const r = new Rover(data);
            if (this.tryToLandRover(r)) {
                return r;
            }
            return null;
        }).filter(r => !!r)
            .map(r => {
                const {x, y, direction} = r.followInstructions();
                const {name} = r;
                if (this.plateau.contains(x, y)) {
                    console.log(`${name}: ${x} ${y} ${direction}`);
                    return {x, y, direction};
                }
                console.error(`${name} error: ${x} ${y} ${direction} are out of plateau`);
                return null;
            })
    }

}

module.exports = GroundControl;

