// import textInput from "./sample.js";
import textInput from "./input.js";

import { areInRightOrder } from "./areInRightOrder.js";

const input = textInput
  .trim()
  .split("\n\n")
  .map((pairs) => pairs.split("\n").map(JSON.parse));

console.log(input);

let output = 0;

for (let index = 1; index <= input.length; index += 1) {
  const [left, right] = input[index - 1];

  if (areInRightOrder(left, right)) {
    output += index;
  }
}

console.log("→", output);
