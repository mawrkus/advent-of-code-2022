import { dirs } from "./dirs.js";

const positionsHistory = new Map();

export function displayMap(map, cubeSideEdges, pos, dirIndex) {
  positionsHistory.set(String(pos), dirs[dirIndex].symbol);

  console.log();

  const xAxisValues = new Array(map.width)
    .fill(null)
    .map((_, i) => i % 10)
    .join("");

  console.log(" %s", xAxisValues);

  for (let y = 0; y < map.height; y += 1) {
    let line = y % 10;
    const wallCols = map.walls.rows.get(y);

    for (let x = 0; x < map.width; x += 1) {
      const dir = positionsHistory.get(String([x, y]));

      if (dir) {
        line += dir;
      } else if (wallCols?.has(x)) {
        line += "#";
      } else {
        line +=
          cubeSideEdges.findIndex(
            ({ rangeX, rangeY }) =>
              x >= rangeX[0] &&
              x <= rangeX[1] &&
              y >= rangeY[0] &&
              y <= rangeY[1]
          ) === -1
            ? " "
            : ".";
      }
    }

    console.log(line);
  }

  console.log(" %s", xAxisValues);

  console.log();
}
