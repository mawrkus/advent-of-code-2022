// import textInput from "./sample.js";
import textInput from "./input.js";

import { parseInput } from "./helpers/parseInput.js";

// 8,0  > 10,0
// 10,0 v 10,5
// 10,5 > 3,5
// 3,5  v 3,7
// 3,7  > 7,7
// 7,7  v 7,5
// 7,5  > 7,5

function move(map, [x, y], [newX, newY], dirIndex) {
  const { tiles, walls } = map;

  // >
  if (dirIndex === 0) {
    const { start, end } = tiles.rows.get(y);

    if (newX > end) {
      newX = start;
    }

    if (walls.rows.get(y)?.has(newX)) {
      newX = x;
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
      newY = y;
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
      newX = x;
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
      newY = y;
    }

    return [newX, newY];
  }
}

const { map, path } = parseInput(textInput);

console.log("map.tiles", map.tiles);
console.log("map.walls", map.walls);
console.log("path", path, path.length);

const dirs = [
  { symbol: ">", fn: (pos, tilesCount) => [pos[0] + tilesCount, pos[1]] },
  { symbol: "v", fn: (pos, tilesCount) => [pos[0], pos[1] + tilesCount] },
  { symbol: "<", fn: (pos, tilesCount) => [pos[0] - tilesCount, pos[1]] },
  { symbol: "^", fn: (pos, tilesCount) => [pos[0], pos[1] - tilesCount] },
];

const turnFns = {
  L: (dirIndex) => (dirIndex === 0 ? dirs.length - 1 : dirIndex - 1),
  R: (dirIndex) => (dirIndex === dirs.length - 1 ? 0 : dirIndex + 1),
};

let pos = [map.tiles.rows.get(0).start, 0];
let dirIndex = 0; // >

for (const c of path) {
  if (turnFns[c]) {
    dirIndex = turnFns[c](dirIndex);
    continue;
  }

  for (let i = 0; i < c; i += 1) {
    const tentativePos = dirs[dirIndex].fn(pos, 1);
    const newPos = move(map, pos, tentativePos, dirIndex);

    if (pos[0] === newPos[0] && pos[1] === newPos[1]) {
      break;
    }

    pos = newPos;
  }
}

console.log("\nfinal position:", pos);
console.log("facing: %s (%d)", dirs[dirIndex].symbol, dirIndex);

const output = 1000 * (pos[1] + 1) + 4 * (pos[0] + 1) + dirIndex;

console.log("(1000 * %d) + (4 * %d) + %d\n", pos[1] + 1, pos[0] + 1, dirIndex);

console.log("→", output);
