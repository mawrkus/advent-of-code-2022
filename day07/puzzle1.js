// import textInput from "./sample.js";
import textInput from "./input.js";

import { parseCommandLines } from "./helpers/parseCommandLines.js";
import { browseFs } from "./helpers/browseFs.js";
import { traverseFs } from "./helpers/traverseFs.js";

const input = parseCommandLines(textInput);

console.log(input);

let output = 0;

const fs = browseFs(input);

traverseFs(fs["/"], (node, level) => {
  const tabSize = "  ".repeat(level);

  if (node.items) {
    console.log("%s- %s (dir, size=%d)", tabSize, node.name, node.size);

    if (node.size <= 100000) {
      output += node.size;
    }
  } else {
    console.log("%s- %s (file, size=%d)", tabSize, node.name, node.size);
  }

  return true;
});

console.log("→", output);
