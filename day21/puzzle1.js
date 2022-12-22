// import textInput from "./sample.js";
import textInput from "./input.js";

import { buildTree } from "./helpers/buildTree.js";
import { evaluate } from "./helpers/evaluate.js";

const input = textInput
  .trim()
  .split("\n")
  .reduce((acc, line) => {
    const opMatches = line.match(/(.+): (.+) (\+|-|\*|\/) (.+)/);

    if (opMatches) {
      acc[opMatches[1]] = {
        name: opMatches[1],
        op: opMatches[3],
        leftName: opMatches[2],
        rightName: opMatches[4],
      };

      return acc;
    }

    const numberMatches = line.match(/(.+): (-?\d+)/);

    if (numberMatches) {
      acc[numberMatches[1]] = {
        name: numberMatches[1],
        number: Number(numberMatches[2]),
      };
    }

    return acc;
  }, {});

console.log(input);

const output = evaluate(buildTree(input).root);

console.log("→", output);
