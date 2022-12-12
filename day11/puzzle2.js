// import textInput from "./sample.js";
import textInput from "./input.js";

import { parseInput } from "./parseInput.js";

const monkeys = parseInput(textInput);

console.log(monkeys);

let output = 0;

const commonDivisor = monkeys.reduce((acc, { divisor }) => divisor * acc, 1);

const maxRounds = 10000;
let remainingRounds = maxRounds;

while (remainingRounds--) {
  for (const monkey of monkeys) {
    const { items, operationFn, recipientFn } = monkey;

    for (const item of items) {
      const worryLevel = operationFn(item) % commonDivisor;
      const recipient = recipientFn(worryLevel);

      monkeys[recipient].items.push(worryLevel);
    }

    monkey.inspectedCount += items.length;
    monkey.items = [];
  }
}

output = monkeys
  .sort((m1, m2) => m2.inspectedCount - m1.inspectedCount)
  .slice(0, 2)
  .reduce((acc, m) => acc * m.inspectedCount, 1);

console.log("→", output);
