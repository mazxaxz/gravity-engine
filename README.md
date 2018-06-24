# Gravity Engine
It is a simple Gravity Engine created in ES6 Javascript. I have made it just for fun, if you want to expand this project or add your own functionalities, feel free to fork or contribute. Source code is 100% open.

---

![newton-announces-gravity-2](https://user-images.githubusercontent.com/32012952/41581767-df3963fe-739f-11e8-9bf0-f1a5dbd20232.jpg)
---

## How does it work?
Apart from that I'm drawing these on canvas, there is a `requestAnimationFrame()` loop which renders a frame 60 times per second based on `physicalObjects` array. I have made two classes that are inheriting from my own `Object` class.  
Constructor of the Object class looks like this:
```javascript
constructor(options) {
  this.x = options.x;
  this.y = options.y;

  this.radius = options.radius;
  this.mass = this.radius * 10;
  this.area = Math.PI * this.radius * this.radius / 10000;

  this.velocity = {
    x: options.xVel || 0,
    y: options.yVel || 0
  };
  this.color = options.color || 'rgb(255, 255, 255)';
}
```
Every instance has it's own **x** and **y** position on canvas, the **mass** is calculated based on **radius** (I'm sure there is a better way to do this) and frontal **area** of the `Object` which is a `Ball` is calculated.  
If there is no **velocity** provided, let it be 0. Same goes with the **color** of the `Ball`.  

---

The behaviour of the object is different on the Earth and in the Space.  
**Earth**:
```javascript
nextFrame() {
  const F = this.calculateForce();
  const a = this.calculateAcceleration(F);
  this.velocity.y += a / FRAME_RATE;

  if (this.objectIsFloating())
    return this.accelerateObject(this.velocity.x, this.velocity.y);
    
  this.handleGroundHit();
};
```
Every frame we are computing **F** (Force) based on the current velocity, because it changes every frame.  
Then the **a** (acceleration) is calculated based on the Force, after that we simply add acceleration divided by framerate to the **velocity**.  
You may ask how did you implement **Bouncing** effect? It is simple.  
```javascript
this.x += this.velocity.x;
this.velocity.y *= BOUNCE_FACTOR;
this.y = HEIGHT - this.radius;
```
We are inverting the **velocity** vector just by multiplying it by minus **BOUNCE_FACTOR** value.

**Space**:  
It is a little bit different than the Earth behaviour, but I will try to keep it simple.  
```javascript
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
    absorb(object, neighbour);
    return deleteObject(parent, neighbourIndex);
  }

  absorb(neighbour, object);
  deleteObject(parent, objectIndex);
});
```
As you can see we are working on two seperate objects, so it had to be handled while frame was being rendered.  
**Distance** is squared, because gravity is "exponential". Since gravity in space got that kind of properties, **force** needs to be calculated with **mass** and **distance squared**.  

Absorbing is even simpler, we just add the colider's **mass** and **radius** to absorbing object properties and then delete the less massive one.

## Distribution
After changing Javascript or css files you can use `npm run build` in `cmd` to bundle the files into dist folder.
`npm run build` is a shortcut for `gulp bundle` and `gulp mincss`.

## Constants
What is going on with [these](./js/definitions.js) constant values? Well, let me explain this for you.

```javascript
3  const FRAME_RATE = 60;
4  const FRICTION = 0.1;
5  const BOUNCE_FACTOR = -0.55;
6  const Cd = 0.47;  // Coefficient of drag (ball = 0.47)
7  const Rho = 1.22; // Air density
8  const ag = 9.81;  // Gravity
```

| Constant |  |
|:---------:|------|
| **FRAME_RATE** | Default framerate for browser's `requestAnimationFrame()` is 60 |
| **FRICTION** | I'm 100% sure there is physics equation for Friction and I might update this in the future (T = f*N). But for now let it be 0.1 |
| **BOUNCE_FACTOR** | It really depends on the used material, I just left it at -0.55 |
| **Cd** | Coefficient of drag, it depends on the shape of object. Ball is 0.47, Cube is 1.05 etc. |
| **Rho** | Air density. Air in 15 degrees of Celcius have density of 1.22, try 1000 for H<sub>2</sub>O |
| **ag** | Constant of the gravity acceleration, Earth have ~9.81. You can try other planets for example Mars - 3.71 (+ Rho = 0.02) |

## Acknowledgements
Since, I know no one is reading this documentation, I would like to thank to myself for writing these lines of text knowing it won't help anybody. Pozdro