// import textInput from "./sample.js";
import textInput from "./input.js";

import { displayMap } from "./helpers/displayMap.js";
import { elevationsLookup } from "./helpers/elevationsLookup.js";
import { findShortestPath } from "./helpers/findShortestPath.js";
import { rebuildPath } from "./helpers/rebuildPath.js";

const input = textInput
  .trim()
  .split("\n")
  .map((line) => line.split(""));

console.log(textInput);

const possibleStartCoords = [];
let endCoords;

input.forEach((row, y) =>
  row.forEach((elevation, x) => {
    if (["a", "S"].includes(elevation)) {
      possibleStartCoords.push({ x, y });
    } else if (elevation === "E") {
      endCoords = { x, y };
    }
  })
);

let bestStepsCount = Number.POSITIVE_INFINITY;
let bestPath;

for (const startCoords of possibleStartCoords) {
  const unvisited = input.reduce((acc, row, y) => {
    row.forEach((elevation, x) => {
      const posData = {
        x,
        y,
        elevation,
        height: elevationsLookup[elevation],
        tentativeDistance: Number.POSITIVE_INFINITY,
        previous: null,
      };

      if (x === startCoords.x && y === startCoords.y) {
        posData.tentativeDistance = 0;
      }

      acc[[x, y]] = posData;
    });

    return acc;
  }, {});

  const lastPos = findShortestPath(startCoords, endCoords, unvisited);

  const path = rebuildPath(lastPos);

  if (!path.length) {
    continue;
  }

  const stepsCount = path.length - 1;

  if (stepsCount < bestStepsCount) {
    bestStepsCount = stepsCount;
    bestPath = path;

    console.log("→ %d steps", bestStepsCount);
  }
}

displayMap(input, bestPath);
