export function parseCommandLines(textInput) {
  return textInput
    .trim()
    .split("$")
    .filter(Boolean)
    .map((cmdLine) => cmdLine.trim().split("\n"))
    .map(([cmd, ...output]) => {
      if (cmd === "ls") {
        return {
          cmd: "ls",
          output: output.map((dirOrFile) => {
            const dirMatches = dirOrFile.match(/dir (.+)/);

            if (dirMatches) {
              return {
                name: dirMatches[1],
                size: 0,
                items: {},
                parentDir: null,
              };
            }

            const fileMatches = dirOrFile.match(/([0-9]+) (.+)/);

            if (fileMatches) {
              return {
                name: fileMatches[0],
                size: Number(fileMatches[1]),
              };
            }

            throw new Error(`Unknown item type "${dirOrFile}"!`);
          }),
        };
      }

      const cdMatches = cmd.match(/cd (.+)/);

      if (cdMatches) {
        return {
          cmd: "cd",
          arg: cdMatches[1],
        };
      }

      throw new Error(`Unknown command "${cmd}"!`);
    });
}
