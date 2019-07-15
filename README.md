# Mars Rover implementation.
Please see detailed description [here](https://github.com/abdulg/Mars-Rover)

### Implementation details:
* Language: `node.js`
* Tests: `jest`

Assume you have `node 10+` and proper `npm` installed.

###How to run
You can land rovers from both command line or from file. 

Single rover from command line: 
```sh
$ npx myapp -l 1 2 N -p 5 5 -n MyNewRover -i LMLMLMLMM
```

Multiple rovers from file: 
```sh
$ npx myapp -f path/to/myfile.txt
```

| Command | Description |
| ------ | ------ |
| -l | rover landing. Must be an array from 3 items <x y direction> |
| -p | plateau max dimensions, array of 2 <width height> |
| -n | rover name[optional] |
| -i | instructions for rover, string |
| -f | file with instructions(example is in /test/files/input.txt) |

to run test, please use
Single rover from command line: 
```sh
$ npx jest
```