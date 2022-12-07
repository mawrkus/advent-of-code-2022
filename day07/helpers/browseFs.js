import { updateDirSize } from "./updateDirSize.js";

export function browseFs(cmdLines) {
  const fs = {
    "/": {
      name: "/",
      size: 0,
      content: [],
      parentDir: null,
    },
  };

  let currentDir = fs["/"];

  for (const cmdLine of cmdLines) {
    const [cmd, ...cmdOutput] = cmdLine;

    if (cmd === "ls") {
      currentDir.content = cmdOutput.map((dirOrFile) => {
        const dirMatches = dirOrFile.match(/dir (.+)/);

        if (dirMatches) {
          return {
            name: dirMatches[1],
            size: 0,
            content: [],
            parentDir: currentDir,
          };
        } else {
          const [, rawFileSize, fileName] = dirOrFile.match(/([0-9]+) (.+)/);

          const fileSize = Number(rawFileSize);

          updateDirSize(currentDir, fileSize);

          // Puzzle 1 optimisation
          // if (currentDir.size + fileSize > 100000) {
          //   console.log("Max size reached, done with %s.", currentDir.name);
          //   return null;
          // }

          return {
            name: fileName,
            size: fileSize,
            content: null,
            parentDir: currentDir,
          };
        }
      });
      // .filter(Boolean); // Puzzle 1 optimisation

      // console.log("ls from %s:", currentDir.name, currentDir.content);
      continue;
    }

    const matches = cmd.match(/cd (.+)/);

    if (!matches) {
      throw new Error(`Unknown command "${cmd}"!`);
    }

    const [, newDirName] = matches;
    let newDir;

    if (newDirName === "/") {
      newDir = fs["/"];
    } else if (newDirName === "..") {
      newDir = currentDir.parentDir;
    } else {
      newDir = currentDir.content.find(
        ({ name, content }) => content !== null && name === newDirName
      );

      if (!newDir) {
        throw new Error(
          `Directory "${newDirName}" does not exist in "${currentDir.name}"!`
        );
      }
    }

    currentDir = newDir;

    // console.log('%s (resolved to "%s")', cmd, newDir.name);
    continue;
  }

  return fs;
}
