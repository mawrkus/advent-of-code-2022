import { buildFilesForTheDay } from "./helpers/buildFilesForTheDay.js";
import { fetchPuzzle } from "./helpers/fetchPuzzle.js";
import { getDayFolderPath } from "./helpers/getDayFolderPath.js";
import { parseDayNumber } from "./helpers/parseDayNumber.js";

const dayNumber = parseDayNumber();
const dayFolderPath = getDayFolderPath(dayNumber);

fetchPuzzle(dayNumber, 2)
  .then((puzzleInfo) => buildFilesForTheDay(dayFolderPath, puzzleInfo))
  .then(() => console.log("Good luck for part two!! :D\n"));
