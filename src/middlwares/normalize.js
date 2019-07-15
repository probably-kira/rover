const {DEFAULT_NAME} = require('../utils/utils');

function convertRover(data) {
    const {landing: l, instructions: i, name} = data;
    const [x, y, direction] = l || [];
    const [instructions] = i || [];
    const le = !x || !y || !direction;
    const ie = !instructions;

    if (le) {
        console.error('Landing: incorrect arguments list, should be <x y direction>')
    }

    if (ie) {
        console.error('Landing: incorrect arguments list, should be <LLMM>')
    }

    return {
        landing: {
            x,
            y,
            direction
        },
        instructions,
        name: name || DEFAULT_NAME,
        error: le || ie
    }
}

function convertPlateau(p = []) {
    const [width, height] = p;
    return {
        width,
        height,
        error: !width || !height
    }

}

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