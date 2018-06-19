class Ball {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;

    this.radius = options.radius;
    this.mass = this.radius / 10;
    this.area = Math.PI * this.radius * this.radius / 10000;

    this.velocity = {
      x: options.xVel || 0,
      y: options.yVel || 0
    };

    this.color = options.color || 'rgb(255, 255, 255)';
  }

  nextFrame() {
    const F = this.calculateForce();
    const a = this.calculateAcceleration(F);
    this.velocity.y += a / FRAME_RATE;

    if (this.objectIsFloating())
      return this.accelerateObject(this.velocity.x, this.velocity.y);
    
    this.applyFriction();

    this.x += this.velocity.x;
    this.y = HEIGHT - this.radius;
  };
  
  calculateForce() {
    const force = -0.5 * Cd * this.area * Rho * this.velocity.y * this.velocity.y * this.velocity.y / Math.abs(this.velocity.y);
    return (isNaN(force) ? 0 : force);
  };

  calculateAcceleration(force) {
    return ag + (force / this.mass);
  };

  accelerateObject(x, y) {
    this.x += x;
    this.y += y;
  };

  objectIsFloating() {
    return (this.y < HEIGHT - this.radius) ? true : false;
  };

  applyFriction() {
    this.objectIsGoingLeft() ? this.velocity.x += FRICTION : this.velocity.x -= FRICTION;
  };

  objectIsGoingLeft() {
    return this.velocity.x < 0 ? true : false;
  };
};
