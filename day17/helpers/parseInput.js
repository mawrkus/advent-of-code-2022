import { toBits } from "./toBits.js";

export function parseInput(shapes, jetPattern) {
  const rocks = shapes
    .trim()
    .split("\n\n")
    .map((s) => {
      const rows = s.split("\n");
      const shape = rows.map((line) => line.split(""));

      return {
        shape,
        width: rows[0].length,
        height: rows.length,
        bits: [],
      };
    });

  rocks.forEach((rock) => {
    const { shape, width, height } = rock;

    for (let j = 0; j < height; j += 1) {
      rock.bits[j] = toBits(shape[j]);
    }
  });

  const jetPushes = jetPattern
    .trim()
    .split("")
    .map((c) => (c === "<" ? -1 : +1));

  return { rocks, jetPushes };
}
