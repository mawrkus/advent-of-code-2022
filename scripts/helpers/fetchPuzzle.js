import fetch from "node-fetch";
import { load } from "cheerio";
import * as dotenv from 'dotenv'

export function fetchPuzzle(dayNumber, partNumber) {
  if (partNumber === 2) {
    dotenv.config()
  }

  return fetch(`https://adventofcode.com/2022/day/${dayNumber}`, {
    headers: {
      cookie: process.env.ADVENT_COOKIE,
    },
  })
    .then((response) => response.text())
    .then((rawHtml) => {
      const $ = load(rawHtml);

      const html = $("main article.day-desc")
        .eq(partNumber - 1)
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
