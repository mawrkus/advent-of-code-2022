export function rebuildPath(lastPos) {
  const path = [];

  let currentPos = lastPos;

  while (currentPos) {
    path.unshift([currentPos.x, currentPos.y]);
    currentPos = currentPos.previous;
  }

  return path;
}
