export const adjacencyMoves = [];

const knightMovement = [
  [+1, +2],
  [+1, -2],
  [+2, +1],
  [+2, -1],
  [-1, +2],
  [-1, -2],
  [-2, +1],
  [-2, -1],
];

const MAX_CELL = 8;
for (let i = 0; i < MAX_CELL; i++) {
  const row = [];
  for (let j = 0; j < MAX_CELL; j++) {
    const square = [];
    knightMovement.forEach((move) => {
      const x = i + move[0];
      const y = j + move[1];
      if (x < MAX_CELL && x >= 0 && y < MAX_CELL && y >= 0) square.push([x, y]);
    });
    row.push(square);
  }
  adjacencyMoves.push(row);
}

const getSquare = (x, y) => {
  return adjacencyMoves[x][y];
};

const getPath = (pathObj, start, end) => {
  const steps = [end];
  let current = end;
  while (current !== start) {
    steps.push(pathObj[current]);
    current = pathObj[current];
  }
  return steps.reverse();
};

const displayPath = (path) => {
  const current = path[path.length - 1];
  console.log(`${path.length - 1} steps to find ${current}`);
  for (let i = 1; i < path.length; i++) {
    console.log(` ${i}: ${path[i]}`);
  }
};

export const breadthFirstTraversal = (start, end) => {
  const queue = [start];
  const pathNodes = {};
  while (queue.length > 0) {
    const current = queue.shift();
    if (current === end) {
      break;
    }
    const currentSquare = getSquare(...current);
    for (let i = 0; i < currentSquare.length; i++) {
      const square = currentSquare[i];
      if (!pathNodes.hasOwnProperty(square)) {
        pathNodes[square] = current;
        queue.push(currentSquare[i]);
      }
    }
  }

  const path = getPath(pathNodes, start, end);
  displayPath(path);
  return path;
};
