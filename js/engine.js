const physicalObjects = [];

const canvas = document.querySelector('canvas');
[canvas.width, canvas.height] = [WIDTH, HEIGHT];
const ctx = canvas.getContext('2d');

const frameRender = function() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  physicalObjects.forEach((object, index, parent) => {
    if (object.x >= WIDTH + object.radius || object.x <= -object.width)
      parent.splice(index, 1);

    draw(object);
    object.nextFrame();
  });
};

function draw(obj) {
  ctx.fillStyle = obj.color;
  ctx.beginPath();
  ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.closePath();
};

const frameRenderLoop = function() {
  requestAnimationFrame(frameRenderLoop);
  frameRender();
};
