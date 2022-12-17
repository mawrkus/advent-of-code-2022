// import textInput, { y } from "./sample.js";
import textInput, { y } from "./input.js";

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

  for (const [sensorPos, beaconPos] of input) {
    const [sx, sy] = sensorPos;
    const distance = Math.abs(beaconPos[0] - sx) + Math.abs(beaconPos[1] - sy);

    if (input.y < sy - distance || input.y > sy + distance) {
      continue;
    }

    const diffY = input.y - sy;
    const absDiffY = Math.abs(diffY);
    const newRangeX = [sx - distance + absDiffY, sx + distance - absDiffY];

    rangesX.push(newRangeX);
  }

  return rangesX;
}

function mergeSensorsData(rangesX) {
  const merged = [...rangesX];
  let count = merged.length;
  let hasMerged;

  do {
    for (let i = 0; i < count; i += 1) {
      const [ax1, ax2] = merged[i];
      hasMerged = false;

      for (let j = i + 1; j < count; j += 1) {
        const [bx1, bx2] = merged[j];

        // a is in b
        if (ax1 >= bx1 && ax2 <= bx2) {
          merged.splice(i, 1);
          hasMerged = true;
          break;
        }

        // b is in a
        if (bx1 >= ax1 && bx2 <= ax2) {
          merged.splice(j, 1);
          hasMerged = true;
          break;
        }

        // a + b
        if (ax1 < bx1 && ax2 >= bx1) {
          merged[i] = [ax1, bx2];
          merged.splice(j, 1);
          hasMerged = true;
          break;
        }

        // b + a
        if (ax1 <= bx2 && bx2 < ax2) {
          merged[i] = [bx1, ax2];
          merged.splice(j, 1);
          hasMerged = true;
          break;
        }
      }

      if (hasMerged) {
        break;
      }
    }

    count = merged.length;
  } while (hasMerged);

  return merged;
}

const rangesX = analyzeSensorsData(input);

console.log("→ ", rangesX, rangesX.length);

const [[x1, x2]] = mergeSensorsData(rangesX);

console.log("→ ", [x1, x2]);

const output = x2 - x1;

console.log("→ at y=%d:", input.y, output);
