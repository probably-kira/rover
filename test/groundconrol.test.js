const GroundControl = require('../src/objects/GroundControl');


test('GroundControl obj: should have plateau and rovers', () => {
    const c = new GroundControl({
        plateau: {width: 5, height: 5},
        rovers: []
    });

    expect(!!c.plateau).toBe(true);
    expect(!!c.rovers).toBe(true);
});

test('GroundControl obj: should be able land a rover in given coords', () => {
    const c = new GroundControl({
        plateau: {width: 5, height: 5},
        rovers: []
    });

    const rover = {
        landing: {x: 3, y: 3}
    }
    const result = c.tryToLandRover(rover);

    expect(result).toBe(rover);
});

test('GroundControl obj: should not be able land a rover in invalid coords', () => {
    const c = new GroundControl({
        plateau: {width: 5, height: 5},
        rovers: []
    });

    const result = c.tryToLandRover({
        landing: {x: 30, y: 30}
    });

    expect(result).toBe(null);
});

test('GroundControl obj: should not be able land a rover in invalid coords', () => {
    const c = new GroundControl({
        plateau: {width: 5, height: 5},
        rovers: []
    });

    const result = c.tryToLandRover({
        landing: {x: 30, y: 30}
    });

    expect(result).toBe(null);
});
