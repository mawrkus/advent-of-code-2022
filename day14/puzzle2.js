// import textInput from "./sample.js";
import textInput from "./input.js";

import { parseInput } from "./parseInput.js";
import { scanCave } from "./helpers/scanCave.js";
import { displayCave } from "./helpers/displayCave.js";
const { paths, corners } = parseInput(textInput);

console.log(paths, corners);

const cave = scanCave(paths, corners);

displayCave(cave, +2);

const dirMoves = [
  [0, +1],
  [-1, +1],
  [+1, +1],
];

function move(cave, pos) {
  for (const [dX, dY] of dirMoves) {
    const tile = cave.get(pos[0] + dX, pos[1] + dY);
    const newPos = [pos[0] + dX, pos[1] + dY];

    if (
      tile === cave.tiles.air ||
      (tile == undefined && newPos[1] <= cave.height)
    ) {
      return { prevPos: pos, newPos, rest: false, done: false };
    }
  }

  return {
    prevPos: pos,
    newPos: pos,
    rest: true,
    done: pos[0] === cave.holePos[0] && pos[1] === cave.holePos[1],
  };
}

let moveResult;
let output = 0;

do {
  let sandPos = cave.holePos;

  do {
    moveResult = move(cave, sandPos);
    sandPos = moveResult.newPos;
  } while (!moveResult.rest);

  cave.setSandUnitPos(sandPos[0], sandPos[1]);

  output += 1;
} while (!moveResult.done);

displayCave(cave, true);

console.log("→", output);
