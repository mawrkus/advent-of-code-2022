export function detectColllision(chamber, rock, x, y) {
  if (x < 0 || y < chamber.floorY || x + rock.width > chamber.width) {
    return true;
  }

  for (let j = 0; j < rock.height; j += 1) {
    const gridRowBits = chamber.grid.get(y + rock.height - 1 - j);
    const shapeBits = rock.bits[j] << (chamber.width - rock.width - x);

    if (gridRowBits & shapeBits) {
      return true;
    }
  }

  return false;
}
