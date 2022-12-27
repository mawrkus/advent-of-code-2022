// import textInput from "./sample.js";
import textInput from "./input.js";

const input = textInput
  .trim()
  .split("\n")
  .map((coords) => coords.split(",").map(Number));

console.log(input, input.length);

const lavaCoords = new Set(input.map(String));

let output = input.length * 6;

for (const [x, y, z] of input) {
  const connected = [
    [x + 1, y, z],
    [x - 1, y, z],
    [x, y + 1, z],
    [x, y - 1, z],
    [x, y, z + 1],
    [x, y, z - 1],
  ].filter((neighbour) => lavaCoords.has(String(neighbour)));

  if (connected.length) {
    lavaCoords.delete(String([x, y, z]));

    output -= connected.length * 2;
  }
}

console.log("→", output);
