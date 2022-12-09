import { prettyOutput } from "./prettyOutput.js";

// import textInput from "./sample2.js";
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

const knots = Array(10).fill(null).map(() => [0, 0]); // ;)
const head = knots[0];
const tail = knots[knots.length - 1];

const visited = new Set([String(tail)]);

const dirsLookup = {
  R: [+1, 0],
  L: [-1, 0],
  U: [0, +1],
  D: [0, -1],
};

for (const [dir, steps] of input) {
  for (let step = 0; step < steps; step += 1) {
    const [incX, incY] = dirsLookup[dir];

    head[0] += incX;
    head[1] += incY;

    let front = head;

    for (let i = 1; i < knots.length; i += 1) {
      const current = knots[i];

      const diffX = front[0] - current[0];
      const diffY = front[1] - current[1];

      if (Math.abs(diffX) > 1 || Math.abs(diffY) > 1) {
        current[0] += Math.sign(diffX);
        current[1] += Math.sign(diffY);
      } else {
        break;
      }

      front = current;
    }

    visited.add(String(tail));
  }
}

output = visited.size;

console.log("→", output);

// prettyOutput(visited);
