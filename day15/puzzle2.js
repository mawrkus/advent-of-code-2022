// import textInput, { y, limits } from "./sample.js";
import textInput, { y, limits } from "./input.js";

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
input.limits = limits;

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

    if (newRangeX[0] < input.limits[0]) {
      newRangeX[0] = input.limits[0];
    }

    if (newRangeX[1] > input.limits[1]) {
      newRangeX[1] = input.limits[1];
    }

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

let distressBeaconPos;

for (let y = 0; y <= input.limits[1]; y += 1) {
  input.y = y;

  const rangesX = analyzeSensorsData(input);

  const mergedData = mergeSensorsData(rangesX);

  if (mergedData.length > 1) {
    distressBeaconPos = [mergedData[0][1] + 1, y];
  }
}

const output = distressBeaconPos[0] * 4000000 + distressBeaconPos[1];

console.log("→ %s found with limits", distressBeaconPos, input.limits);
console.log("→ ", output);
