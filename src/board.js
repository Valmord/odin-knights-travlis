export const routes = [];

// example
// [0,0] [1,2], [2,1]
// [4,4] [2,3] [2,5] [3,2] [3,6] [5,2] [5,6] [6,3] [6,5]

const MAX_CELL = 8;
for (let i = 0; i < MAX_CELL; i++) {
  let row = [];
  for (let j = 0; j < MAX_CELL; j++) {
    let route = [];
    if (i + 1 < MAX_CELL && j + 2 < MAX_CELL) route.push([i + 1, j + 2]);
    if (i + 1 < MAX_CELL && j - 2 >= 0) route.push([i + 1, j - 2]);
    if (i + 2 < MAX_CELL && j + 1 < MAX_CELL) route.push([i + 2, j + 1]);
    if (i + 2 < MAX_CELL && j - 1 >= 0) route.push([i + 2, j - 1]);
    if (i - 1 >= 0 && j + 2 < MAX_CELL) route.push([i - 1, j + 2]);
    if (i - 1 >= 0 && j - 2 >= 0) route.push([i - 1, j - 2]);
    if (i - 2 >= 0 && j + 1 < MAX_CELL) route.push([i - 2, j + 1]);
    if (i - 2 >= 0 && j - 1 >= 0) route.push([i - 2, j - 1]);
    row.push(route);
  }
  routes.push(row);
}

const getSquare = (x, y) => {
  return routes[x][y];
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
  const queue = [start]; // e.g. [1,1]
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
