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

let startCoords;
let endCoords;

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

    if (elevation === "S") {
      startCoords = { x, y };
      posData.tentativeDistance = 0;
    } else if (elevation === "E") {
      endCoords = { x, y };
    }

    acc[[x, y]] = posData;
  });

  return acc;
}, {});

console.log("start %o → end %o", startCoords, endCoords);

const lastPos = findShortestPath(startCoords, endCoords, unvisited);

const path = rebuildPath(lastPos);

console.log("\n→", path);
console.log("→ %d steps", path.length - 1);

displayMap(input, path);
