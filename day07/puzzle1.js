// import textInput from "./sample.js";
import textInput from "./input.js";

import { browseFs } from "./helpers/browseFs.js";
import { traverseFs } from "./helpers/traverseFs.js";

const input = textInput
  .trim()
  .split("$")
  .filter(Boolean)
  .map((cmdLine) => cmdLine.trim().split("\n"));

console.log(input);

let output = 0;

const fs = browseFs(input);

traverseFs(fs["/"], (node, level) => {
  const tabSize = "  ".repeat(level);

  if (node.content) {
    console.log("%s- %s (dir, size=%d)", tabSize, node.name, node.size);

    if (node.size <= 100000) {
      output += node.size;
    }
  } else {
    console.log("%s- %s (file, size=%d)", tabSize, node.name, node.size);
  }
});

console.log("→", output);
