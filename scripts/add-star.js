import fs from "fs";
import path from "path";

import { parseDayNumber } from "./helpers/parseDayNumber.js";

addStar(parseDayNumber());

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
