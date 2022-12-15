export function scanCave(input, [minX, maxX, minY, maxY]) {
  const caveWidth = maxX - minX + 1;
  const caveHeight = maxY - minY + 1;

  const tiles = {
    air: "·",
    hole: "+",
    rock: "#",
    sand: "o",
  };

  const map = Array(caveHeight)
    .fill(null)
    .map(() => Array(caveWidth).fill(tiles.air));

  const cave = {
    width: caveWidth,
    height: caveHeight,
    map,
    tiles,
    setScanPoint: (x, y, symbol = tiles.rock) => {
      map[y][x - minX] = symbol;
      return [x - minX, y];
    },
    setSandUnitPos: (x, y, symbol = tiles.sand) => {
      map[y] = map[y] || Array(cave.width).fill(undefined); // puzzle 2
      map[y][x] = symbol;
    },
    get: (x, y) => map[y]?.[x],
  };

  cave.holePos = cave.setScanPoint(500, 0, tiles.hole);

  for (const path of input) {
    for (let i = 0; i < path.length - 1; i += 1) {
      const [a, b] = [path[i], path[i + 1]];
      let [incX, incY] = [b[0] - a[0], b[1] - a[1]];
      const [dirX, dirY] = [-Math.sign(incX), -Math.sign(incY)];

      while (incX) {
        cave.setScanPoint(a[0] + incX, a[1]);
        incX += dirX;
      }

      while (incY) {
        cave.setScanPoint(a[0], a[1] + incY);
        incY += dirY;
      }

      cave.setScanPoint(a[0], a[1]);
    }
  }

  return cave;
}
