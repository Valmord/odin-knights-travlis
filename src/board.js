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

export const bfs = (start, end) => {
  const visited = [];
  const queue = [start];
  while (queue.length > 0) {
    let current = queue.shift();
    console.log(current);
    if (String(current) === String(end)) {
      console.log("hello!");
    }
    let currentSquare = routes[current[0]][current[1]];
    // console.log("current", current, "currentSquare", currentSquare);
    currentSquare.forEach((option) => {
      if (!visited.includes(option)) {
        visited.push(option);
        queue.push(option);
      }
    });
  }
};

const getSquare = (array) => {
  return routes[array[0]][array[1]];
};

const getPath = (pathObj, start, end) => {
  const steps = [end];
  let current = String(end);
  while (current !== String(start)) {
    steps.push(pathObj[current].split(",").map((value) => parseInt(value)));
    current = pathObj[current];
  }
  return steps.reverse();
};

const displayPath = (path) => {
  const current = path[0];
  console.log(`${path.length - 1} steps to find ${current}`);
  for (let i = 1; i < path.length; i++) {
    console.log(` ${i}: ${path[i]}`);
  }
};

export const bfsv2 = (start, end) => {
  const queue = [start]; // e.g. [1,1]
  const pathNodes = { start: null };

  while (queue.length > 0) {
    const current = queue.shift();
    // console.log(current);
    if (String(current) === String(end)) {
      console.log(pathNodes);
      console.log("found!");
      // return;
    }
    const currentSquare = getSquare(current);
    for (let i = 0; i < currentSquare.length; i++) {
      const square = String(currentSquare[i]);
      if (!pathNodes.hasOwnProperty(square)) {
        pathNodes[square] = String(current);
        queue.push(currentSquare[i]);
      }
    }
  }

  const path = getPath(pathNodes, start, end);
  displayPath(path);
  return path;
};

export function dfs(start, end, visited = new Set()) {
  visited.add(String(start));
  let current = routes[start[0]][start[1]];
  let test = "";
  for (let i = 0; i < current.length; i++) {
    let option = current[i];
    if (String(option) === String(end)) {
      return [option];
    }
    if (!visited.has(String(option))) {
      test = dfs(option, end, visited);

      if (Array.isArray(test)) {
        test.push(option);
        if (String(start) === [...visited][0]) {
          console.log(test);
          continue;
        }
        return test;
      }
    }
  }
}
