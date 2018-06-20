const physicalObjects = [];

const canvas = document.querySelector('canvas');
[canvas.width, canvas.height] = [WIDTH, HEIGHT];
const ctx = canvas.getContext('2d');

const frameRender = function() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  physicalObjects.forEach((object, objectIndex, parent) => {
    if (objectLeftScreen(object))
      return deleteObject(parent, objectIndex);

    if (object instanceof Celestial) {
      physicalObjects.forEach((neighbour, neighbourIndex) => {
        if (object === neighbour) return;

        const diff = computeDifference(object, neighbour);
        const distSquared = diff.x*diff.x + diff.y*diff.y;
        const dist = Math.sqrt(distSquared);
        
        if (areNotColiding(object, neighbour, dist)) {
          const force = neighbour.mass / distSquared;
          return applyGravity(object, force, diff, dist);
        }

        if (object.mass >= neighbour.mass) {
          absorbSmaller(object, neighbour);
          return deleteObject(parent, neighbourIndex);
        }

        absorbSmaller(neighbour, object);
        deleteObject(parent, objectIndex);
      });
    }
    
    draw(object);
    object.nextFrame();
  });
};

function objectLeftScreen(object) {
  if (environment === 'space')
    (objectLeftXAxis(object) || objectLeftYAxis(object)) ? true : false;
  
  return objectLeftXAxis(object);
};

function objectLeftXAxis(object) {
  return (object.x >= WIDTH + object.radius || object.x <= -object.radius) ? true : false;
};

function objectLeftYAxis(object) {
  return (object.y <= -object.radius || object.y >= HEIGHT + object.radius) ? true : false;
};

function computeDifference(start, end) {
  return {
    x: end.x - start.x,
    y: end.y - start.y
  };
};

function areNotColiding(object, colidor, distance) {
  return (distance > object.radius + colidor.radius) ? true : false;
};

function applyGravity(object, force, diff, distance) {
  object.velocity.x += force * diff.x / distance;
  object.velocity.y += force * diff.y / distance;
};

function absorbSmaller(absorber, taken) {
  absorber.mass += taken.mass;
  absorber.radius += taken.radius;
};

function deleteObject(parent, index) {
  parent.splice(index, 1);
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
