export function toBits(shapeLine) {
  let shapeLineBits = 0b0000000;

  for (let i = shapeLine.length - 1, n = 1; i >= 0; i -= 1, n <<= 1) {
    if (shapeLine[i] === "#") {
      shapeLineBits |= n;
    }
  }

  return shapeLineBits;
}
