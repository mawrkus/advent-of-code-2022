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

const opsReduceLookup = {
  "+": "-",
  "-": "+",
  "*": "/",
  "/": "*",
};

function findX(node, path = []) {
  if (node.number === "x") {
    path.unshift(node);
    return path;
  }

  let found = null;

  if (node.left) {
    found = findX(node.left, path);

    if (found) {
      path.unshift(node);
      return found;
    }
  }

  if (node.right) {
    found = findX(node.right, path);

    if (found) {
      path.unshift(node);
      return found;
    }
  }

  return found;
}

function solve(root) {
  const path = findX(root);
  path.shift(); // root out

  const sideToEvaluate = root.left === path[0] ? "right" : "left";

  root[sideToEvaluate] = {
    name: root[sideToEvaluate].name,
    number: evaluate(root[sideToEvaluate]),
  };

  let mother = path.shift();
  let son = path.shift();

  while (son) {
    const sideToMove = son.name == mother.left.name ? "right" : "left";

    // 150 = n + x -> 150 - n = x
    // 150 = x + n -> 150 - n = x
    // 150 = n - x -> n - 150 = x !
    // 150 = x - n -> 150 + n = x
    // 150 = n * x -> 150 / n = x
    // 150 = x * n -> 150 / n = x
    // 150 = n / x -> n / 150 = x !
    // 150 = x / n -> 150 * n = x

    if (sideToMove === "left" && ["-", "/"].includes(mother.op)) {
      root[sideToEvaluate] = {
        name: root[sideToEvaluate].name,
        op: mother.op,
        left: mother[sideToMove],
        right: root[sideToEvaluate],
      };
    } else {
      root[sideToEvaluate] = {
        name: root[sideToEvaluate].name,
        op: opsReduceLookup[mother.op],
        left: root[sideToEvaluate],
        right: mother[sideToMove],
      };
    }

    mother[sideToMove] = null;

    mother = son;
    son = path.shift();
  }

  return evaluate(root[sideToEvaluate]);
}

input.root.op = "=";
input.humn.number = "x";

const tree = buildTree(input);

const output = solve(tree.root);

console.log("→", output);
