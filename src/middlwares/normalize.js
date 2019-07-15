const {DEFAULT_PREFIX} = require('../utils/utils');
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


/**
 * convert rover data to certain format
 * @param data coming from yargs
 * @returns {{landing: {x: *, y: *, direction: *}, instructions: *, name: *, error: boolean}}
 */
function convertRover(data) {
    const {landing: l, instructions: i, name} = data;
    const [x, y, direction] = l || [];
    const [instructions] = i || [];
    const le = !x || !y || !direction;
    const ie = !instructions;

    if (le) {
        console.error('Rover landing: incorrect arguments list, should be <x y direction>')
    }

    if (ie) {
        console.error('Rover instruction: incorrect arguments list, should be <LLMM>')
    }

    return {
        landing: {
            x,
            y,
            direction
        },
        instructions,
        name: name || DEFAULT_PREFIX,
        error: le || ie
    }
}

/**
 * convert plateau data to certain format
 * @param plateau array coming from yargs
 * @returns {{width: *, height: *, error: boolean}}
 */
function convertPlateau(p = []) {
    const [width, height] = p;
    const error = !width || !height;
    if (error) {
        console.error('Plateau: incorrect arguments list, should be <width height>')
    }
    return {
        width,
        height,
        error
    }

}

/**
 *
 * @param argv coming directly from yargs or from parsed file(see parseFile.js)
 * @returns {{plateau: {width: *, height: *, error: boolean}, rovers: *, globalError: *}}
 */
const normalize = (argv) => {
    const {_rovers, plateau, globalError: fileError} = argv;
    let rovers;
    let globalError = fileError;
    if (_rovers) {
        rovers = _rovers.map((r) => {
            const _r = convertRover(r);
            globalError = globalError || _r.error;
            return _r;
        });
    } else {
        const _r = convertRover(argv);
        globalError =_r.error;
        rovers = [_r];
    }
    const _plateau = convertPlateau(plateau);
    globalError = globalError || _plateau.error;

    return {
        plateau: _plateau,
        rovers,
        globalError
    };
};

module.exports = {
    normalize,
    convertRover,
    convertPlateau
};