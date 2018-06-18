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
    let F = this.calculateForce();
    let a = this.calculateAcceleration(F);
    this.velocity.y += a / FRAME_RATE;

    if (this.y < HEIGHT - this.radius) {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      return
    }
    
    if (this.velocity.x < 0)
      this.velocity.x = this.velocity.x < 0 ? this.velocity.x + FRICTION : 0;
    else
      this.velocity.x = this.velocity.x > 0 ? this.velocity.x - FRICTION : 0;

    this.x += this.velocity.x;
    this.y = HEIGHT - this.radius;
  };
  
  calculateForce() {
    let force = -0.5 * Cd * this.area * Rho * this.velocity.y * this.velocity.y * this.velocity.y / Math.abs(this.velocity.y);
    return (isNaN(force) ? 0 : force);
  };

  calculateAcceleration(force) {
    return ag + (force / this.mass);
  };
};
