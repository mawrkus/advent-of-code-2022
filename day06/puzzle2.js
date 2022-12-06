// import textInput from "./sample.js";
import textInput from "./input.js";

const input = textInput[0];

console.log(input);

let output = 0;

function hasUniqueChars(chars) {
  return new Set(chars).size === chars.length;
}

const marker = Array.from(input.slice(0, 14));
let i = marker.length;

while (!hasUniqueChars(marker)) {
  marker.shift();
  marker.push(input[i]);

  i += 1;
}

output = i;

console.log("→", output);
