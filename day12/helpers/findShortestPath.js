const sortDistanceFn = (a, b) => a.tentativeDistance - b.tentativeDistance;

export function findShortestPath(startCoord, endCoords, unvisited) {
  const priorityQueue = {};

  let currentPos = unvisited[[startCoord.x, startCoord.y]];

  while (
    currentPos &&
    (currentPos.x !== endCoords.x || currentPos.y !== endCoords.y)
  ) {
    [
      unvisited[[currentPos.x + 1, currentPos.y]],
      unvisited[[currentPos.x - 1, currentPos.y]],
      unvisited[[currentPos.x, currentPos.y + 1]],
      unvisited[[currentPos.x, currentPos.y - 1]],
    ]
      .filter(
        (possiblePos) =>
          possiblePos && possiblePos.height <= currentPos.height + 1
      )
      .forEach((nextPos) => {
        const tentativeDistance = currentPos.tentativeDistance + 1;

        if (tentativeDistance < nextPos.tentativeDistance) {
          nextPos.tentativeDistance = tentativeDistance;
          nextPos.previous = currentPos;

          priorityQueue[[nextPos.x, nextPos.y]] = nextPos;
        }
      });

    delete unvisited[[currentPos.x, currentPos.y]];
    delete priorityQueue[[currentPos.x, currentPos.y]];

    // TODO: optimize?
    currentPos = Object.values(priorityQueue).sort(sortDistanceFn)[0];
  }

  return currentPos;
}
