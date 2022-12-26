export const dirs = [
  {
    index: 0,
    symbol: ">",
    angle: 0,
    move: (pos, tilesCount) => [pos[0] + tilesCount, pos[1]],
  },
  {
    index: 1,
    symbol: "v",
    angle: 90,
    move: (pos, tilesCount) => [pos[0], pos[1] + tilesCount],
  },
  {
    index: 2,
    symbol: "<",
    angle: 180,
    move: (pos, tilesCount) => [pos[0] - tilesCount, pos[1]],
  },
  {
    index: 3,
    symbol: "^",
    angle: 270,
    move: (pos, tilesCount) => [pos[0], pos[1] - tilesCount],
  },
];

dirs.forEach((dir) => {
  dirs[dir.symbol] = dir;
});

export const turnFns = {
  L: (dirIndex) => (dirIndex === 0 ? dirs.length - 1 : dirIndex - 1),
  R: (dirIndex) => (dirIndex === dirs.length - 1 ? 0 : dirIndex + 1),
};
