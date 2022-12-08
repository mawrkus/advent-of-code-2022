// import textInput from "./sample.js";
import textInput from "./input.js";

const input = textInput
  .trim()
  .split("\n")
  .map((line) => line.split("").map(Number));

console.log(input);

let output = Number.NEGATIVE_INFINITY;

const w = input[0].length;
const h = input.length;

const allDirIncrements = [
  [0, -1], // up
  [-1, 0], // left
  [0, +1], // down
  [+1, 0], // right
];

for (let j = 1; j < h - 1; j += 1) {
  for (let i = 1; i < w - 1; i += 1) {
    const value = input[j][i];

    let scenicScore = 1;

    for (const [incX, incY] of allDirIncrements) {
      let x = i + incX;
      let y = j + incY;

      let distance = 1;

      while (x > 0 && x < w - 1 && y > 0 && y < h - 1 && input[y][x] < value) {
        distance += 1;

        x += incX;
        y += incY;
      }

      scenicScore *= distance;
    }

    if (scenicScore > output) {
      output = scenicScore;
    }
  }
}

console.log("→", output);
