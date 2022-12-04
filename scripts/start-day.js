import fs from "fs";
import path from "path";

import { buildFilesForTheDay } from "./helpers/buildFilesForTheDay.js";
import { fetchPuzzle } from "./helpers/fetchPuzzle.js";
import { parseDayNumber } from "./helpers/parseDayNumber.js";

const dayNumber = parseDayNumber();
const dayFolderPath = createDayFolder(dayNumber);

fetchPuzzle(dayNumber, 1)
  .then((puzzleInfo) => buildFilesForTheDay(dayFolderPath, puzzleInfo))
  .then(() => console.log("Good luck for part one! :D\n"));

function createDayFolder(rawDayNumber) {
  const dayNumber = rawDayNumber < 10 ? `0${rawDayNumber}` : rawDayNumber;
  const dayFolderPath = path.join(process.cwd(), `day${dayNumber}`);

  fs.cpSync(path.join(process.cwd(), "templates"), dayFolderPath, {
    recursive: true,
  });

  return dayFolderPath;
}
