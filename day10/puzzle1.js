// import textInput from "./sample.js";
import textInput from "./input.js";

const input = textInput
  .trim()
  .split("\n")
  .map((line) => {
    const [instruction, rawArg] = line.split(" ");
    return rawArg ? [instruction, Number(rawArg)] : [instruction];
  });

console.log(input);

let output = 0;

let X = 1;
let cyclesCount = 1;

const cyclesPerInstruction = {
  noop: 1,
  addx: 2,
};

const cycleProbes = {
  20: true,
  60: true,
  100: true,
  140: true,
  180: true,
  220: true,
};

for (let i = 0; i < input.length; i += 1) {
  const [instruction, arg] = input[i];

  for (let j = 0; j < cyclesPerInstruction[instruction]; j += 1) {
    const signalStrength = cyclesCount * X;

    if (cycleProbes[cyclesCount]) {
      output += signalStrength;
    }

    cyclesCount += 1;
  }

  if (arg) {
    X += arg;
  }
}

console.log("→", output);
