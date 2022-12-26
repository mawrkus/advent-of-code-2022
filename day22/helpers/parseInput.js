export function parseInput(input) {
  let [rawMap, rawPath] = input.split("\n\n");

  rawMap = rawMap.split("\n");
  rawMap.shift();

  const map = {
    width: rawMap[0].length,
    height: rawMap.length,
    tiles: {
      rows: new Map(),
      columns: new Map(),
    },
    walls: {
      rows: new Map(),
      columns: new Map(),
    },
  };

  const { tiles, walls } = map;

  rawMap.forEach((line, y) =>
    Array.from(line.matchAll(/([.#]+)/g)).forEach((matches) => {
      const [, lineTiles] = matches;
      const start = matches.index;
      const end = matches.index + lineTiles.length - 1;

      tiles.rows.set(y, { start, end });

      for (let x = start; x <= end; x += 1) {
        if (line[x] === "#") {
          const xMap = walls.rows.has(y) ? walls.rows.get(y) : new Set();
          xMap.add(x);
          walls.rows.set(y, xMap);

          const yMap = walls.columns.has(x) ? walls.columns.get(x) : new Set();
          yMap.add(y);
          walls.columns.set(x, yMap);
        }
      }
    })
  );

  for (let x = 0; x < map.width; x += 1) {
    let yStart = null;
    let yEnd = null;

    for (let y = 0; y < tiles.rows.size; y += 1) {
      const { start, end } = tiles.rows.get(y);

      if (yStart === null) {
        if (x >= start && x <= end) {
          yStart = y;
        }
      } else if (yEnd === null) {
        if (x < start || x > end) {
          yEnd = y - 1;
          break;
        }
      }
    }

    if (yEnd === null) {
      yEnd = tiles.rows.size - 1;
    }

    tiles.columns.set(x, { start: yStart, end: yEnd });
  }

  const path = Array.from(rawPath.trim().matchAll(/(\d+|L|R)/g)).map(([c]) =>
    ["R", "L"].includes(c) ? c : Number(c)
  );

  return {
    map,
    path,
  };
}
