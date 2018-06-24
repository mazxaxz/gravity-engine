class Object {
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
};
