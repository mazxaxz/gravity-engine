class Ball extends Object {
  constructor(options) {
    super(options);
  }

  nextFrame() {
    const F = this.calculateForce();
    const a = this.calculateAcceleration(F);
    this.velocity.y += a / FRAME_RATE;

    if (this.objectIsFloating())
      return this.accelerateObject(this.velocity.x, this.velocity.y);
    
    this.handleGroundHit();
  };
  
  calculateForce() {
    const force = -0.5 * Cd * this.area * Rho * this.velocity.y * this.velocity.y * this.velocity.y / Math.abs(this.velocity.y);
    return (isNaN(force) ? 0 : force);
  };

  calculateAcceleration(force) {
    return ag + (force / this.mass);
  };

  objectIsFloating() {
    return (this.y <= HEIGHT - this.radius) ? true : false;
  };

  accelerateObject(x, y) {
    this.x += x;
    this.y += y;
  };

  handleGroundHit() {
    this.applyFriction();

    this.x += this.velocity.x;
    this.velocity.y *= BOUNCE_FACTOR;
    this.y = HEIGHT - this.radius;
  };

  applyFriction() {
    this.objectIsGoingLeft() ? this.velocity.x += FRICTION : this.velocity.x -= FRICTION;
  };

  objectIsGoingLeft() {
    return this.velocity.x < 0 ? true : false;
  };
};
