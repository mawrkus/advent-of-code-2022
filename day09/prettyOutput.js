export function prettyOutput(visited) {
  let [minX, maxX, minY, maxY] = [
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
  ];

  for (const stringPos of visited) {
    const [x, y] = stringPos.split(",").map(Number);

    if (x > maxX) {
      maxX = x;
    } else if (x < minX) {
      minX = x;
    }

    if (y > maxY) {
      maxY = y;
    } else if (y < minY) {
      minY = y;
    }
  }

  console.log("\n");

  for (let j = maxY + 1; j >= minY - 1; j -= 1) {
    let line = "";

    for (let i = minX - 1; i < maxX + 1; i += 1) {
      line += !i && !j ? "s" : visited.has(String([i, j])) ? "#" : "·";
    }

    console.log(line);
  }

  console.log("\n");
}
