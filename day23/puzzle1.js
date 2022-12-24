// import textInput from "./sample.js";
import textInput from "./input.js";

import { displayMap } from "./helpers/displayMap.js";
import { computeEdges } from "./helpers/computeEdges.js";

const elves = new Set();

const input = textInput
  .trim()
  .split("\n")
  .map((r, y) => {
    const row = r.split("");

    for (let x = 0; x < row.length; x += 1) {
      if (row[x] === "#") {
        elves.add(String([x, y]));
      }
    }

    return row;
  });

console.log(input);
console.log(elves, elves.size);

const dirs = {
  E: [+1, 0],
  SE: [+1, +1],
  S: [0, +1],
  SW: [-1, +1],
  W: [-1, 0],
  NW: [-1, -1],
  N: [0, -1],
  NE: [+1, -1],
};

const dontMoveRule = {
  adjacentPositions: ["E", "SE", "S", "SW", "W", "NW", "N", "NE"],
  moveTo: null,
};
const rules = [
  { adjacentPositions: ["N", "NE", "NW"], moveTo: "N" },
  { adjacentPositions: ["S", "SE", "SW"], moveTo: "S" },
  { adjacentPositions: ["W", "NW", "SW"], moveTo: "W" },
  { adjacentPositions: ["E", "NE", "SE"], moveTo: "E" },
];
const ruleFn = (elfPos, d) => {
  const dir = dirs[d];
  const scanPos = [elfPos[0] + dir[0], elfPos[1] + dir[1]];
  return !elves.has(String(scanPos));
};

const maxRounds = Number(process.argv[2]) || 10;

for (
  let round = 0, rulesOffset = 0;
  round < maxRounds;
  round += 1, rulesOffset = (rulesOffset + 1) % rules.length
) {
  const moves = new Map();

  displayMap(round, elves);

  for (const elf of elves) {
    const elfPos = elf.split(",").map(Number);
    const dontMove = dontMoveRule.adjacentPositions.every((d) =>
      ruleFn(elfPos, d)
    );

    if (dontMove) {
      const m = moves.get(elf) || [];

      m.push(elf);

      moves.set(elf, m);

      continue;
    }

    for (let r = rulesOffset; r < rulesOffset + rules.length; r += 1) {
      const { adjacentPositions, moveTo } = rules[r % rules.length];

      const check = adjacentPositions.every((d) => ruleFn(elfPos, d));

      if (check) {
        const newElfPos = [
          elfPos[0] + dirs[moveTo][0],
          elfPos[1] + dirs[moveTo][1],
        ];

        const m = moves.get(String(newElfPos)) || [];

        m.push(elf);

        moves.set(String(newElfPos), m);

        break;
      }
    }
  }

  for (const [newElfPos, elfPositions] of moves) {
    if (elfPositions.length === 1) {
      elves.delete(elfPositions[0]);
      elves.add(newElfPos);
    }
  }
}

displayMap(maxRounds, elves);

const [minX, maxX, minY, maxY] = computeEdges(elves);
const output = (maxX - minX + 1) * (maxY - minY + 1) - elves.size;

console.log("→ after %d rounds:", maxRounds, output);
