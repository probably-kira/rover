const Rover = require('../src/objects/Rover');


test('Rover obj: can turn left', () => {
    const r = new Rover({
        landing: {
            x: 2,
            y: 3,
            direction: 'N'
        }
    });
    const result = r.turn({
        x: 2,
        y: 3,
        direction: 'N'
    }, 'L')

    expect(result).toEqual({direction: 'W'});
});

test('Rover obj: can turn right', () => {
    const r = new Rover({
        landing: {
            x: 2,
            y: 3,
            direction: 'N'
        }
    });
    const result = r.turn({
        x: 2,
        y: 3,
        direction: 'N'
    }, 'R')

    expect(result).toEqual({direction: 'E'});
});

test('Rover obj: do nothing if happens unknown letter', () => {
    const r = new Rover({
        landing: {
            x: 2,
            y: 3,
            direction: 'N'
        }
    });
    const result = r.turn({
        x: 2,
        y: 3,
        direction: 'N'
    }, 'Y')

    expect(result).toEqual({});
});

test('Rover obj: can move on N', () => {
    const r = new Rover({
        landing: {
            x: 2,
            y: 3,
            direction: 'N'
        }
    });

    const result = r.move({
        x: 2,
        y: 3,
        direction: 'N'
    })

    expect(result).toEqual({x: 2, y: 4});
});

test('Rover obj: can move on W', () => {
    const r = new Rover({
        landing: {
            x: 2,
            y: 3,
            direction: 'N'
        }
    });

    const result = r.move({
        x: 2,
        y: 3,
        direction: 'W'
    })

    expect(result).toEqual({x: 1, y: 3});
});

test('Rover obj: can move on E', () => {
    const r = new Rover({
        landing: {
            x: 2,
            y: 3,
            direction: 'N'
        }
    });

    const result = r.move({
        x: 2,
        y: 3,
        direction: 'E'
    })

    expect(result).toEqual({x: 3, y: 3});
});


test('Rover obj: can move on S', () => {
    const r = new Rover({
        landing: {
            x: 2,
            y: 3,
            direction: 'N'
        }
    });

    const result = r.move({
        x: 2,
        y: 3,
        direction: 'S'
    })

    expect(result).toEqual({x: 2, y: 2});
});

test('Rover obj: return new coords when complete instructions', () => {
    const r = new Rover({
        landing: {
            x: 2,
            y: 3,
            direction: 'N'
        },
        instructions: 'MMRRM'
    });

    const result = r.followInstructions();

    expect(result).toEqual({x: 2, y: 4, direction: 'S'});
});
