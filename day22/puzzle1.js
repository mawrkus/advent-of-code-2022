// import textInput from "./sample.js";
import textInput from "./input.js";

import { parseInput } from "./helpers/parseInput.js";
import { dirs, turnFns } from "./helpers/dirs.js";

function move(map, [x, y], [newX, newY], dirIndex) {
  const { tiles, walls } = map;

  // >
  if (dirIndex === 0) {
    const { start, end } = tiles.rows.get(y);

    if (newX > end) {
      newX = start;
    }

    if (walls.rows.get(y)?.has(newX)) {
      return null;
    }

    return [newX, newY];
  }

  // v
  if (dirIndex === 1) {
    const { start, end } = tiles.columns.get(x);

    if (newY > end) {
      newY = start;
    }

    if (walls.columns.get(x)?.has(newY)) {
      return null;
    }

    return [newX, newY];
  }

  // <
  if (dirIndex === 2) {
    const { start, end } = tiles.rows.get(y);

    if (newX < start) {
      newX = end;
    }

    if (walls.rows.get(y)?.has(newX)) {
      return null;
    }

    return [newX, newY];
  }

  // ^
  if (dirIndex === 3) {
    const { start, end } = tiles.columns.get(x);

    if (newY < start) {
      newY = end;
    }

    if (walls.columns.get(x)?.has(newY)) {
      return null;
    }

    return [newX, newY];
  }
}

const { map, path } = parseInput(textInput);

console.log("map.tiles", map.tiles);
console.log("map.walls", map.walls);
console.log("path", path, path.length);

let pos = [map.tiles.rows.get(0).start, 0];
let dirIndex = 0; // >

for (const c of path) {
  if (turnFns[c]) {
    dirIndex = turnFns[c](dirIndex);
    continue;
  }

  for (let i = 0; i < c; i += 1) {
    const tentativePos = dirs[dirIndex].move(pos, 1);
    const newPos = move(map, pos, tentativePos, dirIndex);

    if (newPos === null) {
      break;
    }

    pos = newPos;
  }
}

console.log("\nfinal position:", pos);
console.log("direction: %s\n", dirs[dirIndex].symbol);

const output = 1000 * (pos[1] + 1) + 4 * (pos[0] + 1) + dirIndex;

console.log(
  "→ (1000 * %d) + (4 * %d) + %d =",
  pos[1] + 1,
  pos[0] + 1,
  dirIndex,
  output
);
