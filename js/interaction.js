frameRenderLoop();

let xStart;
let yStart;
let xEnd;
let yEnd;

window.addEventListener('mousedown', assignStartCoords);
window.addEventListener('mouseup', createObject);

function assignStartCoords(e) {
  [xStart, yStart] = [e.offsetX, e.offsetY];
};

function assignEndCoords(x, y) {
  [xEnd, yEnd] = [x, y];
};

function createObject(e) {
  assignEndCoords(e.offsetX, e.offsetY);
  let xVel = computeVelocity(xStart, xEnd);
  let yVel = computeVelocity(yStart, yEnd);

  const color = createRandomColor();
  const radius = Math.floor((Math.random() * 35) + 5);

  physicalObjects.push(new Ball({
    x: xStart,
    y: yStart,
    radius,
    xVel,
    yVel,
    color: `rgb(${color.red}, ${color.green}, ${color.blue})`
  }));

  resetCoords();
};

function computeVelocity(start, end) {
  return ((end - start) / 50);
};

function createRandomColor() {
  return {
    red: Math.floor((Math.random() * 205) + 50),
    green: Math.floor((Math.random() * 205) + 50),
    blue: Math.floor((Math.random() * 205) + 50)
  };
};

function resetCoords() {
  [xStart, yStart, xEnd, yEnd] = [0, 0, 0, 0];
};
