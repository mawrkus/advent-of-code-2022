const fs = require("fs");
const path = require("path");
const { parseDayNumber } = require("./helpers/parseDayNumber");

const dayNumber = parseDayNumber();
const dayFolder = createDayFolder(dayNumber);

buildFiles(dayFolder, { dayNumber });

function createDayFolder(rawDayNumber) {
  const dayNumber = rawDayNumber < 10 ? `0${rawDayNumber}` : rawDayNumber;
  const dayFolderPath = path.join(process.cwd(), `day${dayNumber}`);

  fs.cpSync(path.join(process.cwd(), "templates"), dayFolderPath, {
    recursive: true,
  });

  return dayFolderPath;
}

function buildFiles(dayFolder, variables) {
  ["README.md"].forEach((fileName) => {
    const filePath = path.join(dayFolder, fileName);
    const rawContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    const content = Object.entries(variables).reduce(
      (acc, [key, value]) => acc.replaceAll(`{${key}}`, value),
      rawContent
    );

    fs.writeFileSync(filePath, content, { encoding: "utf-8" });
  });
}
