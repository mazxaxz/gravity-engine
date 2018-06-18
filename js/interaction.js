frameRenderLoop();

let xStart;
let yStart;
let xEnd;
let yEnd;

window.addEventListener('mousedown', (e) => [xStart, yStart] = [e.offsetX, e.offsetY]);
window.addEventListener('mouseup', (e) => {
  [xEnd, yEnd] = [e.offsetX, e.offsetY];
  let xVel = (xEnd - xStart) / 50;
  let yVel = (yEnd - yStart) / 50;

  const r = Math.floor((Math.random() * 205) + 50);
  const g = Math.floor((Math.random() * 205) + 50);
  const b = Math.floor((Math.random() * 205) + 50);

  const radius = Math.floor((Math.random() * 35) + 5);

  physicalObjects.push(new Ball({
    x: xStart,
    y: yStart,
    radius,
    xVel,
    yVel,
    color: `rgb(${r}, ${g}, ${b})`
  }));

  [xStart, yStart, xEnd, yEnd] = [0, 0, 0, 0];
});
