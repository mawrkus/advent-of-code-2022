// import textInput from "./sample.js";
import textInput from "./input.js";

import { areInRightOrder } from "./areInRightOrder.js";

const dividerPackets = ["[[2]]", "[[6]]"];

const input = textInput
  .trim()
  .split("\n")
  .filter(Boolean)
  .concat(dividerPackets)
  .map(JSON.parse);

console.log(input);

input.sort((p1, p2) => (areInRightOrder(p1, p2) ? -1 : +1));

console.log("→", input);

let output = 1;
let n = dividerPackets.length;

for (let index = 1; index <= input.length; index += 1) {
  const packet = input[index - 1];
  const packetString = JSON.stringify(packet);

  if (
    packetString === dividerPackets[0] ||
    packetString === dividerPackets[1]
  ) {
    output *= index;

    n -= 1;

    if (!n) {
      break;
    }
  }
}

console.log("→", output);
