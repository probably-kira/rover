const {convertPlateau, convertRover, normalize} = require('../src/middlwares/normalize');
const {DEFAULT_NAME} = require('../src/utils/utils');
/**
 *  Full list of passesd arguments, coming from yargs
 { _: [],
   l: [ 1, 2, 'N' ],
   landing: [ 1, 2, 'N' ],
   p: [ 5, 5 ],
   plateau: [ 5, 5 ],
   i: [ 'LMLMLMLMM' ],
   instructions: [ 'LMLMLMLMM' ],
   n: 'MyNewRover',
   name: 'MyNewRover',
   '$0': 'myapp' }
 *
 */


test('Plateau dimensions: should have width and height', () => {
    const converted = convertPlateau([5, 5]);
    expect(converted).toEqual({
        width: 5,
        height: 5,
        error: false
    });
});

test('Plateau dimensions: return error if dimensions are absent', () => {
    const converted = convertPlateau();
    expect(converted.error).toBe(true);
});

test('Plateau dimensions: return error when only one argument been passed', () => {
    const converted = convertPlateau([6]);
    expect(converted.error).toBe(true);
});

test('Rover name: should take given value', () => {
    const converted = convertRover({name: 'MyNewRover'});
    expect(converted.name).toEqual('MyNewRover');
});

test('Rover name: should take default if not passed any', () => {
    const converted = convertRover({});
    expect(converted.name).toEqual(DEFAULT_NAME);
});

test('Rover landing: should convert landing coords into proper object', () => {
    const converted = convertRover({landing: [1, 2, 'N']});
    expect(converted.landing).toEqual({x: 1, y: 2, direction: 'N'});
});

test('Rover landing: should return an error when no args passed', () => {
    const converted = convertRover({
        plateau: [5, 5],
        instructions: [ 'LMLMLMLMM' ]
    });
    expect(converted.error).toBe(true);
});

test('Normalize middlware: should no return global error if all args are valid', () => {
    const converted = normalize({ _: [],
        l: [ 1, 2, 'N' ],
        landing: [ 1, 2, 'N' ],
        p: [ 5, 5 ],
        plateau: [ 5, 5 ],
        i: [ 'LMLMLMLMM' ],
        instructions: [ 'LMLMLMLMM' ],
        n: 'MyNewRover',
        name: 'MyNewRover',
        '$0': 'myapp' });
    expect(converted.globalError).toBe(false);
});

test('Normalize middlware: should return global error if any of required arg is missed', () => {
    const converted1 = normalize({ _: [],
        l: [ 1, 2, 'N' ],
        landing: [ 1, 2, 'N' ],
        p: [ 5, 5 ],
        plateau: [ 5, 5 ],
        n: 'MyNewRover',
        name: 'MyNewRover',
        '$0': 'myapp' });

    const converted2 = normalize({ _: [],
        p: [ 5, 5 ],
        plateau: [ 5, 5 ],
        i: [ 'LMLMLMLMM' ],
        instructions: [ 'LMLMLMLMM' ],
        n: 'MyNewRover',
        name: 'MyNewRover',
        '$0': 'myapp' });

    const converted3 = normalize({ _: [],
        l: [ 1, 2, 'N' ],
        landing: [ 1, 2, 'N' ],
        i: [ 'LMLMLMLMM' ],
        instructions: [ 'LMLMLMLMM' ],
        n: 'MyNewRover',
        name: 'MyNewRover',
        '$0': 'myapp' });

    expect(converted1.globalError).toBe(true);
    expect(converted2.globalError).toBe(true);
    expect(converted3.globalError).toBe(true);
});


