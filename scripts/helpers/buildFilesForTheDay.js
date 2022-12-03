import fs from "fs";
import path from "path";

export function buildFilesForTheDay(dayFolderPath, variables) {
  ["README.md"].forEach((fileName) => {
    const filePath = path.join(dayFolderPath, fileName);
    const rawContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    const content = Object.entries(variables).reduce(
      (acc, [key, value]) => acc.replaceAll(`{${key}}`, value),
      rawContent
    );

    fs.writeFileSync(filePath, content, { encoding: "utf-8" });
  });

  if (variables.partNumber === 1) {
    const readmePath = path.join(process.cwd(), "README.md");
    const readmeContent = fs.readFileSync(readmePath, { encoding: "utf-8" });

    const newReadmeContent = readmeContent.replace(
      new RegExp(`(Day ${variables.dayNumber}: )(\\?)`),
      `$1${variables.puzzleName}`
    );

    fs.writeFileSync(readmePath, newReadmeContent, { encoding: "utf-8" });
  }
}
