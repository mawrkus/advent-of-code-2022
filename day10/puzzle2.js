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

let output = "";

let X = 1;
let cyclesCount = 1;

const cyclesPerInstruction = {
  noop: 1,
  addx: 2,
};

const CRT = {
  width: 40,
  height: 6,
};

for (let i = 0; i < input.length; i += 1) {
  const [instruction, arg] = input[i];

  for (let j = 0; j < cyclesPerInstruction[instruction]; j += 1) {
    const pixelPosition = (cyclesCount - 1) % CRT.width;
    const isSpriteVisible = pixelPosition >= X - 1 && pixelPosition <= X + 1;

    output += isSpriteVisible ? "#" : "·";

    if (cyclesCount % CRT.width === 0) {
      output += "\n";
    }

    cyclesCount += 1;
  }

  if (arg) {
    X += arg;
  }
}

console.log("→");
console.log(output);
