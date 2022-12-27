// import textInput from "./sample.js";
import textInput from "./input.js";

const input = textInput
  .trim()
  .split("\n")
  .map((coords) => coords.split(",").map(Number));

console.log(input, input.length);

const lavaCoords = new Set();

let [minX, maxX, minY, maxY, minZ, maxZ] = [
  Number.POSITIVE_INFINITY,
  Number.NEGATIVE_INFINITY,
  Number.POSITIVE_INFINITY,
  Number.NEGATIVE_INFINITY,
  Number.POSITIVE_INFINITY,
  Number.NEGATIVE_INFINITY,
];

input.forEach(([x, y, z]) => {
  lavaCoords.add(String([x, y, z]));

  minX = Math.min(minX, x);
  maxX = Math.max(maxX, x);

  minY = Math.min(minY, y);
  maxY = Math.max(maxY, y);

  minZ = Math.min(minZ, z);
  maxZ = Math.max(maxZ, z);
});

minX -= 1;
maxX += 1;
minY -= 1;
maxY += 1;
minZ -= 1;
maxZ += 1;

let output = 0;

const startPoint = [minX, minY, minZ];
const toVisit = [startPoint];
const visited = new Set(toVisit.map(String));

while (toVisit.length) {
  const [x, y, z] = toVisit.pop();

  for (const nextPoint of [
    [x + 1, y, z],
    [x - 1, y, z],
    [x, y + 1, z],
    [x, y - 1, z],
    [x, y, z + 1],
    [x, y, z - 1],
  ]) {
    if (
      nextPoint[0] < minX ||
      nextPoint[0] > maxX ||
      nextPoint[1] < minY ||
      nextPoint[1] > maxY ||
      nextPoint[2] < minZ ||
      nextPoint[2] > maxZ
    ) {
      continue;
    }

    const nextPointKey = String(nextPoint);

    if (lavaCoords.has(nextPointKey)) {
      output += 1;
      continue;
    }

    if (!visited.has(nextPointKey)) {
      visited.add(nextPointKey);

      toVisit.push(nextPoint);
    }
  }
}

console.log("→", output);
