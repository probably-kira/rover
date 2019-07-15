#!/usr/bin/env node
const yargs = require('yargs');
const {normalize} = require('./middlwares/normalize');
const {parseFile} = require('./middlwares/parseFile');
const GroundControl = require('./objects/GroundControl');

const argv = yargs
    .command('$0', 'the default command', () => {}, () => {}, [parseFile, normalize])
    .option('p', { // document options.
        array: true, // even single values will be wrapped in [].
        description: 'Plateau size',
        alias: 'plateau'
    })
    .option('l', {
        array: true,
        description: 'Landing coords',
        alias: 'landing'
    })
    .option('i', {
        description: 'Rover instructions',
        alias: 'instructions',
        array: true
    })
    .option('f', {
        description: 'File to load',
        alias: 'file'
    })
    .option('n', {
        description: 'Name of rover',
        alias: 'name'
    })
    .argv;
console.log(argv)
if (argv.globalError) {
    return console.error('Global error! Mission failed, please check out logs above')
}
const controller = new GroundControl(argv);
controller.moveRovers();


