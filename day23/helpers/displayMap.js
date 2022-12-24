import { computeEdges } from "./computeEdges.js";

export function displayMap(round, elves) {
  const [minX, maxX, minY, maxY] = computeEdges(elves);
  const extraWidth = 1;
  const extraHeight = 1;

  console.log("\nend of round %d", round);

  for (let y = minY - extraHeight; y <= maxY + extraHeight; y += 1) {
    let line = "";

    for (let x = minX - extraWidth; x <= maxX + extraWidth; x += 1) {
      line += elves.has(String([x, y])) ? "#" : ".";
    }

    console.log(line);
  }

  console.log();
}
