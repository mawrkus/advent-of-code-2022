export function displayChamber(
  chamber,
  addYValues = true,
  rock = null,
  rockX = null,
  rockY = null
) {
  console.log();

  const maxY = rock
    ? Math.max(
        rockY + rock.height - 1 - chamber.floorY,
        chamber.highestY - chamber.floorY
      )
    : chamber.highestY - chamber.floorY;

  for (let y = maxY; y >= 0; y -= 1) {
    let line = "|";

    for (let x = 0; x < chamber.width; x += 1) {
      if (
        rock &&
        x >= rockX &&
        x < rockX + rock.width &&
        y >= rockY &&
        y < rockY + rock.height
      ) {
        if (
          rock.shape[-y + chamber.floorY + rockY + rock.height - 1][
            x - rockX
          ] === "#"
        ) {
          line += "@";
          continue;
        }
      }

      line +=
        chamber.grid.get(y + chamber.floorY) & (1 << (chamber.width - x - 1))
          ? "#"
          : "·";
    }

    line += addYValues ? `| ${y}` : "|";

    console.log(line);
  }

  console.log("+%s+", Array(chamber.width).fill("-").join(""));

  console.log();
}
