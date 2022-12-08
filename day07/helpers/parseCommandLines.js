export function parseCommandLines(textInput, callbackFn) {
  return textInput
    .trim()
    .split("$")
    .filter(Boolean)
    .map((cmdLine) => cmdLine.trim().split("\n"))
    .forEach(([cmd, ...output]) => {
      if (cmd === "ls") {
        output.forEach((dirOrFile) => {
          const fileMatches = dirOrFile.match(/([0-9]+) (.+)/);

          if (fileMatches) {
            callbackFn({ fileSize: Number(fileMatches[1]) });
          }
        });

        return;
      }

      const cdMatches = cmd.match(/cd (.+)/);

      if (cdMatches) {
        return callbackFn({ newDir: cdMatches[1] });
      }

      throw new Error(`Unknown command "${cmd}"!`);
    });
}
