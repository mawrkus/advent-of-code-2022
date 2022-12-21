// import { jetPattern, shapes } from "./sample.js";
import { jetPattern, shapes } from "./input.js";

import { parseInput } from "./helpers/parseInput.js";
import { detectColllision } from "./helpers/detectColllision.js";
import { displayChamber } from "./helpers/displayChamber.js";

const { rocks, jetPushes } = parseInput(shapes, jetPattern);
const maxRocksCount = Number(process.argv[2]) || 1000000000000;

console.log(rocks, jetPattern, jetPushes);
console.log("number of rocks = %d", maxRocksCount);

const chamber = {
  jetPushes,
  width: 7,
  grid: new Map(),
  floorY: 0,
  highestY: -1,
  startPosX: 2,
  startDiffPosY: 4,
  cycles: {
    lookup: new Map(),
    lastPositions: [],
    found: false,
  },
};

function skipCycles(x, y, r) {
  if (chamber.cycles.found) {
    return r;
  }

  chamber.cycles.lastPositions.push({ x, y });

  if (chamber.cycles.lastPositions.length < rocks.length * 2) {
    return r;
  }

  const distances = [];

  for (let i = 0; i < rocks.length * 2; i += 1) {
    for (let j = i; j < rocks.length * 2; j += 1) {
      distances.push(
        (chamber.cycles.lastPositions[i].x -
          chamber.cycles.lastPositions[j].x) **
          2 +
          (chamber.cycles.lastPositions[i].y -
            chamber.cycles.lastPositions[j].y) **
            2
      );
    }
  }

  chamber.cycles.lastPositions = [];

  const lookupKey = String(distances);
  const lookupResult = chamber.cycles.lookup.get(lookupKey);

  if (!lookupResult) {
    chamber.cycles.lookup.set(lookupKey, {
      r,
      highestY: chamber.highestY,
    });

    return r;
  }

  chamber.cycles.found = true;

  const cycleLengthInRocks = r - lookupResult.r;
  const cycleLengthInY = chamber.highestY - lookupResult.highestY;
  const remainingRocks = maxRocksCount - r;
  const cyclesToSkip = Math.trunc(remainingRocks / cycleLengthInRocks);

  const newR = r + cyclesToSkip * cycleLengthInRocks;
  const newHighewstY = chamber.highestY + cyclesToSkip * cycleLengthInY;

  for (let j = 0; j < cycleLengthInY; j += 1) {
    chamber.grid.set(newHighewstY - j, chamber.grid.get(chamber.highestY - j));
  }

  chamber.highestY = newHighewstY;

  return newR;
}

let pushIndex = 0;
let rockIndex = 0;

for (let r = 0; r < maxRocksCount; r += 1) {
  const rock = rocks[rockIndex];

  let [x, y] = [chamber.startPosX, chamber.highestY + chamber.startDiffPosY];

  do {
    const newX = x + chamber.jetPushes[pushIndex++ % chamber.jetPushes.length];

    if (!detectColllision(chamber, rock, newX, y)) {
      x = newX;
    }

    const newY = y - 1;

    if (detectColllision(chamber, rock, x, newY)) {
      break;
    }

    y = newY;
  } while (true);

  chamber.highestY = Math.max(chamber.highestY, y + rock.height - 1);

  for (let j = 0; j < rock.height; j += 1) {
    const gridRowBits = chamber.grid.get(y + j) || 0;
    const shapeBits =
      rock.bits[rock.height - 1 - j] << (chamber.width - rock.width - x);

    chamber.grid.set(y + j, gridRowBits | shapeBits);
  }

  r = skipCycles(x, y, r, pushIndex);

  rockIndex = (rockIndex + 1) % rocks.length;
}

const output = chamber.highestY + 1;

console.log("→", output);
