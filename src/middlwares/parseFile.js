const fs = require('fs');
const path = require('path');
const DEFAULT_PREFIX = 'Rover';

function bufferFile(relPath) {
    // must be fileSync bcs it's console app
    console.log(path.resolve(relPath))
    return fs.readFileSync(path.resolve(relPath), { encoding: 'utf8' });
}

function parseParams(param) {
    const pair = param.split(':') ;
    const name = pair[0].toLowerCase();
    return {
        [name]: pair[1].split(' ')
    }
}

function getName(line, prefix) {
    const pattern = `\^${prefix}\\w+`;
    return (line.match(new RegExp(pattern, 'g')) || []).pop();
}

/**
 * assume that line format is 'roverName param:[paramData]' where roverName could be absent
 * @param lines
 */

function parseData(lines, prefix) {
    const _rovers = {};
    const parsed = lines.reduce((res, line) => {
        if (line) {
            const firstWordMatchName = getName(line, prefix)
            if (firstWordMatchName) {
                const params = parseParams(line.replace(`${firstWordMatchName} `, ''));
                params.name = firstWordMatchName;
                const obj = _rovers[firstWordMatchName] || {};
                _rovers[firstWordMatchName] = {
                    ...obj,
                    ...params
                }
            } else {
                return {
                    ...res,
                    ...parseParams(line)
                }
            }
        }
        return res;
    }, {});
    parsed._rovers = Object.values(_rovers);
    parsed.globalError = !parsed._rovers.length || !parsed.plateau;
    return parsed;
}

const parseFile = (argv) => {
    if (argv.file) {
        const prefix = argv.name || DEFAULT_PREFIX;
        // Buffer mydata
        const b = bufferFile(`${argv.file}`);
        const data = parseData(b.split('\n'), prefix);
        return data
    }

    return argv
};

module.exports = {
    parseFile,
    getName,
    parseParams,
    bufferFile
};
