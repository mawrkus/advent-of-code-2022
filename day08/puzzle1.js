// import textInput from "./sample.js";
import textInput from "./input.js";

const input = textInput
  .trim()
  .split("\n")
  .map((line) => line.split("").map(Number));

console.log(input);

let output = 0;

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

    const [up, left, down, right] = [
      input[0][i],
      input[j][0],
      input[w - 1][i],
      input[j][h - 1],
    ];

    if (value < up && value < left && value < down && value < right) {
      continue; // invisible
    }

    for (const [incX, incY] of allDirIncrements) {
      let x = i + incX;
      let y = j + incY;

      let visible = true;

      while (x >= 0 && x < w && y >= 0 && y < h) {
        if (input[y][x] >= value) {
          visible = false;
          break;
        }

        x += incX;
        y += incY;
      }

      if (visible) {
        output += 1;
        break;
      }
    }
  }
}

output += (w + h) * 2 - 4;

console.log("→", output);
