function prettyTile(tiles, tile) {
  if (tile === tiles.air) {
    tile = `\u001b[38;5;232m${tile}\u001b[0m`;
  } else if (tile === tiles.sand) {
    tile = `\u001b[38;5;221m${tile}\u001b[0m`;
  } else if (tile === tiles.rock) {
    tile = `\u001b[38;5;232m\u001b[48;5;237m${tile}\u001b[0m`;
  } else if (tile === tiles.hole) {
    tile = `\u001b[37;1m${tile}\u001b[0m`;
  }

  return tile;
}

export function displayCave(cave, addFloorAt = 0) {
  console.log();

  // const hCoordsLine = Array(cave.width)
  //   .fill(null)
  //   .map((_, i) => i)
  //   .join("");

  // console.log(hCoordsLine);

  // puzzle 2
  const offsetX = addFloorAt ? addFloorAt * 10 : 0; // just an approx to have an idea
  const offsetY = addFloorAt;

  for (let j = 0; j < cave.height + offsetY; j += 1) {
    let line = "";

    if (addFloorAt && j === cave.height - 1 + addFloorAt) {
      line += Array(cave.width + 2 * offsetX + 1)
        .fill(prettyTile(cave.tiles, cave.tiles.rock))
        .join("");

      console.log(line);

      continue;
    }

    for (let i = -offsetX; i < cave.width + offsetX; i += 1) {
      const tile = cave.get(i, j);

      line += tile ? prettyTile(cave.tiles, tile) : cave.tiles.air;
    }

    // line += j;

    console.log(line);
  }

  // console.log(hCoordsLine);

  console.log();
}
