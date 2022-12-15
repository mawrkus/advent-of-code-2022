export function parseInput(textInput) {
  let [minX, maxX, minY, maxY] = [
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    0,
    Number.NEGATIVE_INFINITY,
  ];

  const paths = textInput
    .trim()
    .split("\n")
    .map((line) =>
      line.split("->").map((coords) => {
        const [rawX, rawY] = coords.split(",");
        const [x, y] = [Number(rawX), Number(rawY)];

        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;

        return [x, y];
      })
    );

  return {
    paths,
    corners: [minX, maxX, minY, maxY],
  };
}
