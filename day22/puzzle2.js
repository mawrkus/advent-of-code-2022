// import textInput from "./sample.js";
// import {
//   cubeSideEdges,
//   cubeSideLength,
//   warpsLookup,
// } from "./helpers/cube.sample.js";

import textInput from "./input.js";
import {
  cubeSideEdges,
  cubeSideLength,
  warpsLookup,
} from "./helpers/cube.input.js";

import { parseInput } from "./helpers/parseInput.js";
import { dirs, turnFns } from "./helpers/dirs.js";

function computeWarp({ pos, fromSide, toSide, fromDir, toDir }) {
  const [absX, absY] = pos;
  const fromSideEdges = cubeSideEdges[fromSide - 1];
  const [localX, localY] = [
    absX - fromSideEdges.rangeX[0],
    absY - fromSideEdges.rangeY[0],
  ];

  const angle = fromDir.angle - toDir.angle;
  let rotatedPos;

  if (angle === 0) {
    rotatedPos = [localX, localY];
  } else if (angle === 90 || angle === -270) {
    rotatedPos = [localY, localX];
  } else if (angle === 180 || angle === -180) {
    rotatedPos = [cubeSideLength - 1 - localX, cubeSideLength - 1 - localY];
  } else if (angle === 270 || angle === -90) {
    rotatedPos = [cubeSideLength - 1 - localY, localX];
  }

  const warpPos = [];
  const toSideEdges = cubeSideEdges[toSide - 1];

  if (toDir.symbol === ">") {
    warpPos[0] = toSideEdges.rangeX[0];
    warpPos[1] = rotatedPos[1] + toSideEdges.rangeY[0];
  } else if (toDir.symbol === "v") {
    warpPos[0] = rotatedPos[0] + toSideEdges.rangeX[0];
    warpPos[1] = toSideEdges.rangeY[0];
  } else if (toDir.symbol === "<") {
    warpPos[0] = toSideEdges.rangeX[1];
    warpPos[1] = rotatedPos[1] + toSideEdges.rangeY[0];
  } else if (toDir.symbol === "^") {
    warpPos[0] = rotatedPos[0] + toSideEdges.rangeX[0];
    warpPos[1] = toSideEdges.rangeY[1];
  }

  return [warpPos, toDir.index];
}

function warpToNextCubeSide([x, y], newPos, dirIndex) {
  const cubeSide =
    cubeSideEdges.findIndex(
      ({ rangeX, rangeY }) =>
        x >= rangeX[0] && x <= rangeX[1] && y >= rangeY[0] && y <= rangeY[1]
    ) + 1;

  const dir = dirs[dirIndex];
  const warp = warpsLookup[cubeSide][dir.symbol];

  return computeWarp({
    pos: newPos,
    fromSide: cubeSide,
    fromDir: dir,
    toSide: warp[0],
    toDir: dirs[warp[1]],
  });
}

function move(map, [x, y], [newX, newY], dirIndex) {
  const { tiles, walls } = map;

  let warpPos;
  let newDirIndex = dirIndex;

  // >
  if (dirIndex === 0) {
    const { end } = tiles.rows.get(y);

    if (newX > end) {
      [warpPos, newDirIndex] = warpToNextCubeSide(
        [x, y],
        [newX, newY],
        dirIndex
      );

      [newX, newY] = warpPos;
    }

    if (walls.rows.get(newY)?.has(newX)) {
      return null;
    }

    return [newX, newY, newDirIndex];
  }

  // v
  if (dirIndex === 1) {
    const { end } = tiles.columns.get(x);

    if (newY > end) {
      [warpPos, newDirIndex] = warpToNextCubeSide(
        [x, y],
        [newX, newY],
        dirIndex
      );

      [newX, newY] = warpPos;
    }

    if (walls.columns.get(newX)?.has(newY)) {
      return null;
    }

    return [newX, newY, newDirIndex];
  }

  // <
  if (dirIndex === 2) {
    const { start } = tiles.rows.get(y);

    if (newX < start) {
      [warpPos, newDirIndex] = warpToNextCubeSide(
        [x, y],
        [newX, newY],
        dirIndex
      );

      [newX, newY] = warpPos;
    }

    if (walls.rows.get(newY)?.has(newX)) {
      return null;
    }

    return [newX, newY, newDirIndex];
  }

  // ^
  if (dirIndex === 3) {
    const { start } = tiles.columns.get(x);

    if (newY < start) {
      [warpPos, newDirIndex] = warpToNextCubeSide(
        [x, y],
        [newX, newY],
        dirIndex
      );

      [newX, newY] = warpPos;
    }

    if (walls.columns.get(newX)?.has(newY)) {
      return null;
    }

    return [newX, newY, newDirIndex];
  }
}

const { map, path } = parseInput(textInput);

console.log("map: %dx%d", map.width, map.height);
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
    const newPosAndDir = move(map, pos, tentativePos, dirIndex);

    if (newPosAndDir === null) {
      break;
    }

    const [newX, newY, newDirIndex] = newPosAndDir;

    pos = [newX, newY];
    dirIndex = newDirIndex;
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
