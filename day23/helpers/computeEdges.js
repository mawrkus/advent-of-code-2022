export function computeEdges(elves) {
  let [minX, maxX, minY, maxY] = [
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
  ];

  for (const elf of elves) {
    const [x, y] = elf.split(",").map(Number);

    minX = Math.min(x, minX);
    maxX = Math.max(x, maxX);
    minY = Math.min(y, minY);
    maxY = Math.max(y, maxY);
  }

  return [minX, maxX, minY, maxY];
}
