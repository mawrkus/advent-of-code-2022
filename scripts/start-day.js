import fs from "fs";
import fetch from "node-fetch";
import path from "path";
import { load } from "cheerio";

import { parseDayNumber } from "./helpers/parseDayNumber.js";

const dayNumber = parseDayNumber();
const dayFolder = createDayFolder(dayNumber);

fetchPuzzle(dayNumber)
  .then((puzzleInfo) => buildFiles(dayNumber, dayFolder, puzzleInfo))
  .then(() => console.log("Good luck! :D\n"));

function createDayFolder(rawDayNumber) {
  const dayNumber = rawDayNumber < 10 ? `0${rawDayNumber}` : rawDayNumber;
  const dayFolderPath = path.join(process.cwd(), `day${dayNumber}`);

  fs.cpSync(path.join(process.cwd(), "templates"), dayFolderPath, {
    recursive: true,
  });

  return dayFolderPath;
}

function fetchPuzzle(dayNumber) {
  return fetch(`https://adventofcode.com/2022/day/${dayNumber}`)
    .then((response) => response.text())
    .then((rawHtml) => {
      const $ = load(rawHtml);

      const html = $("main article")
        .html()
        .replace(/<\/p>/g, "\n")
        .replace(/<li>/g, "- ")
        .replace(/<code><em>/g, "**`")
        .replace(/<\/em>.*<\/code>/g, "`**")
        .replace(/<pre><code>/g, "```text\n")
        .replace(/<\/code>.*<\/pre>/g, "```\n")
        .replace(/(<code>|<\/code>)/g, "`")
        .replace(/(<em[^>]*>|<\/em>)/g, "**");

      const text = load(html).text();

      const [title, puzzleName] = text.match(/--- Day.+: (.+) ---/);

      return {
        dayNumber,
        puzzleName,
        firstPuzzleText: text.replace(title, ""),
      };
    });
}

function buildFiles(dayNumber, dayFolder, variables) {
  ["README.md"].forEach((fileName) => {
    const filePath = path.join(dayFolder, fileName);
    const rawContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    const content = Object.entries({ variables }).reduce(
      (acc, [key, value]) => acc.replaceAll(`{${key}}`, value),
      rawContent
    );

    fs.writeFileSync(filePath, content, { encoding: "utf-8" });
  });

  const readmePath = path.join(process.cwd(), "README.md");
  const readmeContent = fs.readFileSync(readmePath, { encoding: "utf-8" });

  const newReadmeContent = readmeContent.replace(
    new RegExp(`(Day ${dayNumber}: )(\\?)`),
    `$1${variables.puzzleName}`
  );

  fs.writeFileSync(readmePath, newReadmeContent, { encoding: "utf-8" });
}
