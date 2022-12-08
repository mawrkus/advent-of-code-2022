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

            const [, rawFileSize, fileName] = dirOrFile.match(/([0-9]+) (.+)/);

            return {
              name: fileName,
              size: Number(rawFileSize),
            };
          }),
        };
      }

      const [, arg] = cmd.match(/cd (.+)/);

      return {
        cmd: "cd",
        arg,
      };
    });
}
