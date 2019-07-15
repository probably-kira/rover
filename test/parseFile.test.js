const {parseParams, getName, parseFile } = require('../src/middlwares/parseFile');
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

test('parseFile: should return unchanged list of args if no file passed', () => {
    const converted = parseFile({ _: [],
        l: [ 1, 2, 'N' ],
        landing: [ 1, 2, 'N' ],
        p: [ 5, 5 ],
        plateau: [ 5, 5 ],
        i: [ 'LMLMLMLMM' ],
        instructions: [ 'LMLMLMLMM' ],
        n: 'MyNewRover',
        name: 'MyNewRover',
        '$0': 'myapp' });

    expect(converted).toEqual( { _: [],
        l: [ 1, 2, 'N' ],
        landing: [ 1, 2, 'N' ],
        p: [ 5, 5 ],
        plateau: [ 5, 5 ],
        i: [ 'LMLMLMLMM' ],
        instructions: [ 'LMLMLMLMM' ],
        n: 'MyNewRover',
        name: 'MyNewRover',
        '$0': 'myapp' });
});

test('parseFile: should parsed data for valid input', () => {
    const converted = parseFile({
        file: '../test/files/input.txt'
    });
    expect(converted.plateau).toEqual(['5', '5']);
    expect(converted._rovers.length).toEqual(2);
});

test('parseFile: should return an error for empty file', () => {
    const converted = parseFile({
        file: '../test/files/empty.txt'
    });
    expect(converted.globalError).toBe(true);
});

test('parseParams: should return param name and value', () => {
    const converted = parseParams('Plateau:5 5');
    expect(converted).toEqual({plateau: ['5', '5']});
});

test('getName: should return name started from given prefix', () => {
    const converted = getName('Rover1 Instructions:LMLMLMLMM', 'Rover');
    expect(converted).toEqual('Rover1');
});

test('getName: should return undefined if no match appears', () => {
    const converted = getName('Plateau:5 5', 'Rover');
    expect(converted).toEqual(undefined);
});
