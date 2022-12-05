import fetch from "node-fetch";
import { load } from "cheerio";
import * as dotenv from "dotenv";

export function fetchPuzzle(dayNumber, partNumber) {
  if (partNumber === 2) {
    dotenv.config();

    if (!process.env.ADVENT_COOKIE) {
      throw new Error("Don't forget the cookies! ;)");
    }
  }

  return fetch(`https://adventofcode.com/2022/day/${dayNumber}`, {
    headers: {
      cookie: process.env.ADVENT_COOKIE,
      "user-agent": "mawrkus/1.0",
      "x-whomai": "just an automated bot created by @crossrecursion",
      "x-purpose":
        "fetching the puzzles description of the day to generate a nice README file for my creator's repo in GitHub",
      "x-thanks": "thank you for building Advent of Code, I owe you my life!",
    },
  })
    .then((response) => response.text())
    .then((rawHtml) => {
      const $ = load(rawHtml);

      const html = $("main article.day-desc")
        .eq(partNumber - 1)
        .html()
        .trim()
        .replace(/<\/p>/g, "\n")
        .replace(/<ul>[^<]*/g, "")
        .replace(/<li>/g, "- ")
        .replace(/<code><em>/g, "**`")
        .replace(/<\/em><\/code>/g, "`**")
        .replace(/<pre><code>/g, "```text\n")
        .replace(/<\/code>.*<\/pre>/g, "```\n")
        .replace(/(<code>|<\/code>)/g, "`")
        .replace(/(<em[^>]*>|<\/em>)/g, "**");

      const text = load(html).text().trim();

      if (partNumber === 1) {
        const [title, puzzleName] = text.match(/--- Day.+: (.+) ---/);

        return {
          dayNumber,
          partNumber,
          puzzleName,
          firstPuzzleText: text.replace(title, ""),
        };
      }

      return {
        dayNumber,
        partNumber,
        secondPuzzleText: text.replace("--- Part Two ---", ""),
      };
    });
}
