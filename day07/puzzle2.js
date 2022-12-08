// import textInput from "./sample.js";
import textInput from "./input.js";

import { parseCommandLines } from "./helpers/parseCommandLines.js";
import { updateDirSize } from "./helpers/updateDirSize.js";

const fs = {};
let currentPath = ["/"];

parseCommandLines(textInput, ({ newDir, fileSize }) => {
  if (newDir) {
    if (newDir === "/") {
      currentPath = ["/"];
    } else if (newDir === "..") {
      currentPath.pop();
    } else {
      currentPath.push(newDir);
    }

    return;
  }

  if (fileSize) {
    updateDirSize(fs, currentPath, fileSize);

    return;
  }
});

console.log(textInput);
console.log(fs);

let output = 0;

const totalAvailableSpace = 70000000;
const spaceNeeded = 30000000;

const usedSpace = fs["/"];
const unusedSpace = totalAvailableSpace - usedSpace;
const spaceToFree = spaceNeeded - unusedSpace;

console.log("\nused space\t= %d", usedSpace);
console.log("unused space\t= %d", unusedSpace);
console.log("space to free\t= %d\n", spaceToFree);

output = Number.POSITIVE_INFINITY;

Object.values(fs)
  .forEach((size) => {
    if (size >= spaceToFree) {
      if (size < output) {
        output = size;

        console.log("candidate:", size, '(best)');
      } else {
        console.log("candidate:", size);
      }
    }
  });

console.log("\n→", output);
