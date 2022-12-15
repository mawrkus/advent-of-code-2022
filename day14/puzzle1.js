// import textInput from "./sample.js";
import textInput from "./input.js";

import { parseInput } from "./parseInput.js";
import { scanCave } from "./helpers/scanCave.js";
import { displayCave } from "./helpers/displayCave.js";

const { paths, corners } = parseInput(textInput);

console.log(paths, corners);

const cave = scanCave(paths, corners);

displayCave(cave);

const dirMoves = [
  [0, +1],
  [-1, +1],
  [+1, +1],
];

function move(cave, pos) {
  for (const [dX, dY] of dirMoves) {
    const newPos = [pos[0] + dX, pos[1] + dY];
    const tile = cave.get(newPos[0], newPos[1]);

    if (tile === cave.tiles.air) {
      return { prevPos: pos, newPos, rest: false, done: false };
    }

    // into the void
    if (tile === undefined) {
      return { prevPos: pos, newPos, rest: true, done: true };
    }
  }

  return { prevPos: pos, newPos: pos, rest: true, done: false };
}

let moveResult;
let output = 0;

do {
  let sandPos = cave.holePos;

  do {
    moveResult = move(cave, sandPos);
    sandPos = moveResult.newPos;
  } while (!moveResult.rest);

  if (!moveResult.done) {
    cave.setSandUnitPos(sandPos[0], sandPos[1]);
    output += 1;
  }
} while (!moveResult.done);

displayCave(cave);

console.log("→", output);
