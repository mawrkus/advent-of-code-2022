// import textInput, { y } from "./sample.js";
import textInput, { y } from "./input.js";

import { mergeSensorsData } from "./mergeSensorsData.js";

const input = textInput
  .trim()
  .split("\n")
  .map((line) => {
    const matches = line.match(
      /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/
    );

    return [
      [Number(matches[1]), Number(matches[2])],
      [Number(matches[3]), Number(matches[4])],
    ];
  });

input.y = y;

console.log(input);

function analyzeSensorsData(input) {
  let rangesX = [];
  const gears = new Set();

  for (const [sensorPos, beaconPos] of input) {
    const [sx, sy] = sensorPos;
    const distance = Math.abs(beaconPos[0] - sx) + Math.abs(beaconPos[1] - sy);

    if (sy === input.y) {
      gears.add(sx);
    }

    if (beaconPos[1] === input.y) {
      gears.add(beaconPos[0]);
    }

    if (input.y < sy - distance || input.y > sy + distance) {
      continue;
    }

    const absDiffY = Math.abs(input.y - sy);
    const newRangeX = [sx - distance + absDiffY, sx + distance - absDiffY];

    if (gears.has(newRangeX[0]) || gears.has(newRangeX[1])) {
      if (gears.has(newRangeX[0]) && gears.has(newRangeX[1])) {
        continue;
      }

      if (gears.has(newRangeX[0])) {
        newRangeX[0] -= 1;
      } else if (gears.has(newRangeX[1])) {
        newRangeX[1] -= 1;
      }
    }

    rangesX.push(newRangeX);
  }

  return rangesX;
}

const rangesX = analyzeSensorsData(input);

const [[x1, x2]] = mergeSensorsData(rangesX);

console.log("→ range at y=%d", input.y, [x1, x2]);

const output = x2 - x1;

console.log("→ count at y=%d:", input.y, output);
