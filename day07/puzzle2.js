// import textInput from "./sample.js";
import textInput from "./input.js";

import { parseCommandLines } from "./helpers/parseCommandLines.js";
import { browseFs } from "./helpers/browseFs.js";
import { traverseFs } from "./helpers/traverseFs.js";

const input = parseCommandLines(textInput);

console.log(input);

let output = 0;

const fs = browseFs(input);

const totalAvailableSpace = 70000000;
const spaceNeeded = 30000000;

const usedSpace = fs["/"].size;
const unusedSpace = totalAvailableSpace - usedSpace;
const spaceToFree = spaceNeeded - unusedSpace;

console.log("\nused space\t= %d", usedSpace);
console.log("unused space\t= %d", unusedSpace);
console.log("space to free\t= %d\n", spaceToFree);

output = Number.POSITIVE_INFINITY;

traverseFs(fs["/"], (node) => {
  if (node.items && node.size >= spaceToFree) {
    if (node.size < output) {
      output = node.size;

      console.log("candidate:", node.name, node.size, '(best)');
    } else {
      console.log("candidate:", node.name, node.size);
    }

    return true;
  }

  return false;
});

console.log("\n→", output);
