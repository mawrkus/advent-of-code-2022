import { updateDirSize } from "./updateDirSize.js";

export function browseFs(commands) {
  const fs = {
    "/": {
      name: "/",
      size: 0,
      items: [],
      parentDir: null,
    },
  };

  let currentDir = fs["/"];

  for (const { cmd, arg, output } of commands) {
    if (cmd === "cd") {
      let newDir;

      if (arg === "/") {
        newDir = fs["/"];
      } else if (arg === "..") {
        newDir = currentDir.parentDir;
      } else {
        newDir = currentDir.items[arg];
      }

      if (!newDir) {
        throw new Error(
          `Directory "${arg}" does not exist in "${currentDir.name}"!`
        );
      }

      currentDir = newDir;

      // console.log('cd %s (resolved to "%s")', arg, newDir.name);
      continue;
    }

    if (cmd === "ls") {
      if (Object.keys(currentDir.items).length) {
        continue;
      }

      currentDir.items = output.reduce((acc, { name, size, items }) => {
        if (items) {
          acc[name] = {
            name,
            size,
            items,
            parentDir: currentDir,
          };

          return acc;
        }

        updateDirSize(currentDir, size);

        acc[name] = {
          name,
          size,
        };

        return acc;
      }, {});

      // console.log("ls from %s:", currentDir.name, currentDir.items);
      continue;
    }

    throw new Error(`Unknown command "${cmd}"!`);
  }

  return fs;
}
