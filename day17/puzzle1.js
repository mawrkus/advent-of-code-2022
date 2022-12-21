// import { jetPattern, shapes } from "./sample.js";
import { jetPattern, shapes } from "./input.js";

import { parseInput } from "./helpers/parseInput.js";
import { detectColllision } from "./helpers/detectColllision.js";
import { displayChamber } from "./helpers/displayChamber.js";

const { rocks, jetPushes } = parseInput(shapes, jetPattern);
const maxRocksCount = Number(process.argv[2]) || 2022;

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
};

let pushIndex = 0;

for (let r = 0; r < maxRocksCount; r += 1) {
  const rock = rocks[r % rocks.length];

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

  // free some memory, if needed
  // if ((chamber.grid.get(y) | chamber.grid.get(y - 1)) === 127) {
  //   for (let n = y - 1; n >= chamber.floorY; n -= 1) {
  //     chamber.grid.delete(n);
  //   }

  //   chamber.floorY = y;
  // }
}

const output = chamber.highestY + 1;

console.log("→", output);
