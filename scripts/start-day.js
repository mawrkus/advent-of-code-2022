const fs = require("fs");
const path = require("path");

const [, , rawDayNumber] = process.argv;

const dayNumber = Number(rawDayNumber);

if (Number.isNaN(dayNumber)) {
  throw new Error(
    "Please provide a valid day number: npm run start:day [day number]"
  );
}

if (dayNumber < 1 || dayNumber > 25) {
  throw new Error(
    "Please provide a day number between 1 and 25: npm run start:day [day number between 1 and 25]"
  );
}

buildFiles(createDayFolder(dayNumber), { dayNumber });

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
