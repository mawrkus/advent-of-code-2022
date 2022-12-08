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

output = Object.values(fs)
  .filter((size) => size <= 100000)
  .reduce((acc, size) => acc + size, 0);

console.log("→", output);
