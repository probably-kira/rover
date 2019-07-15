const DELTA = {
    x: 1,
    y: 1
};

const DIRECTIONS = {
    N: 90,
    S: 270,
    W: 180,
    E: 0
};

const DEFAULT_PREFIX = 'Rover';

const ANGLES = Object.keys(DIRECTIONS).reduce((result, key) => {
    const angle = DIRECTIONS[key];
    result[`${angle}`] = key;
    return result;
}, {});

const TURNS = {
    R: -90,
    L: 90
};

/**
 * small explanation why I used degree here, while js Math works with radians:
 * known issue of rounding Pi:
 * https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html
 * @param x - angle in degrees
 * @returns {number} sin or cos value of angle
 */
function sin(x) {
    return (Math.sin(x * Math.PI / 180) | 0 );
}

function cos(x) {
    return (Math.cos(x * Math.PI / 180) | 0 );
}

module.exports = {
    DELTA, DIRECTIONS, ANGLES, TURNS, cos, sin, DEFAULT_PREFIX
};