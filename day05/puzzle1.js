// import textInput from "./sample.js";
import textInput from "./input.js";

const input = textInput.split("\n");

console.log(input);

let output = "";

function buildStacks(lines) {
  const stacks = [[], [], []];
  let i;

  for (i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    if (!line.length) {
      continue;
    }

    if (line[1] === "1") {
      break;
    }

    let stackIndex = 0;

    for (let j = 1; j < line.length; j += 4) {
      stacks[stackIndex] = stacks[stackIndex] || [];

      if (line[j] !== " ") {
        stacks[stackIndex].push(line[j]);
      }

      stackIndex += 1;
    }
  }

  console.log("stacks", stacks);

  return {
    stacks,
    lines,
    i,
  };
}

function moveCrates({ stacks, lines, i }) {
  for (i += 2; i < lines.length; i += 1) {
    const line = lines[i];

    if (!line.length) {
      continue;
    }

    const [, rawCount, rawFrom, rawTo] = line.match(
      /move ([0-9]+) from ([0-9]+) to ([0-9]+)/
    );

    const count = Number(rawCount);
    const from = Number(rawFrom) - 1;
    const to = Number(rawTo) - 1;

    for (let j = 0; j < count; j += 1) {
      stacks[to].unshift(stacks[from].shift());
    }
  }

  console.log("stacks", stacks);

  return stacks;
}

const stacks = moveCrates(buildStacks(input));

output = stacks.reduce((acc, stack) => acc + stack[0], "");

console.log("→", output);
