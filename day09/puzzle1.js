// import textInput from "./sample1.js";
import textInput from "./input.js";

const input = textInput
  .trim()
  .split("\n")
  .map((line) => {
    const [dir, rawSteps] = line.split(" ");
    return [dir, Number(rawSteps)];
  });

console.log(input);

let output = 0;

const headPos = [0, 0];
const tailPos = [0, 0];
const visited = new Set([String(tailPos)]);

const dirsLookup = {
  R: [+1, 0],
  L: [-1, 0],
  U: [0, +1],
  D: [0, -1],
};

for (const [dir, steps] of input) {
  for (let step = 0; step < steps; step += 1) {
    const [incX, incY] = dirsLookup[dir];

    headPos[0] += incX;
    headPos[1] += incY;

    const diffX = headPos[0] - tailPos[0];
    const diffY = headPos[1] - tailPos[1];

    if (Math.abs(diffX) > 1 || Math.abs(diffY) > 1) {
      tailPos[0] += Math.sign(diffX);
      tailPos[1] += Math.sign(diffY);
    }

    visited.add(String(tailPos));
  }
}

output = visited.size;

console.log("→", output);
