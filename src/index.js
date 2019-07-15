#!/usr/bin/env node
const yargs = require('yargs');
const {normalize} = require('./middlwares/normalize');
const {parseFile} = require('./middlwares/parseFile');
const GroundControl = require('./objects/GroundControl');

/**
 * list of options for command line
 * @type {{[key in keyof yargs.Arguments<any & {[key in string]: yargs.InferredOptionType<{array: boolean, description: string, alias: string}>} & {[key in string]: yargs.InferredOptionType<{array: boolean, description: string, alias: string}>} & {[key in string]: yargs.InferredOptionType<{description: string, alias: string, array: boolean}>} & {[key in string]: yargs.InferredOptionType<{description: string, alias: string}>} & {[key in string]: yargs.InferredOptionType<{description: string, alias: string}>}>]: yargs.Arguments<any & {[key in string]: yargs.InferredOptionType<{array: boolean, description: string, alias: string}>} & {[key in string]: yargs.InferredOptionType<{array: boolean, description: string, alias: string}>} & {[key in string]: yargs.InferredOptionType<{description: string, alias: string, array: boolean}>} & {[key in string]: yargs.InferredOptionType<{description: string, alias: string}>} & {[key in string]: yargs.InferredOptionType<{description: string, alias: string}>}>[key]}}
 */
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

if (argv.globalError) {
    return console.error('Global error! Mission failed, please check out logs above');
}

const controller = new GroundControl(argv);
controller.moveRovers();


