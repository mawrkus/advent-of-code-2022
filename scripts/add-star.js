const fs = require("fs");
const path = require("path");
const { parseDayNumber } = require("./helpers/parseDayNumber");

const dayNumber = parseDayNumber();

addStar(dayNumber);

console.log("Yes!!\n");

function addStar(dayNumber) {
  const readmePath = path.join(process.cwd(), "README.md");
  const readmeContent = fs.readFileSync(readmePath, { encoding: "utf-8" });

  const newReadmeContent = readmeContent.replace(
    new RegExp(`(Day ${dayNumber}:.[^🧠\n]+)(🧠)`),
    "$1⭐"
  );

  fs.writeFileSync(readmePath, newReadmeContent, { encoding: "utf-8" });
}
