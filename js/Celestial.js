class Celestial extends Object {
  constructor(options) {
    super(options);
  }

  nextFrame() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  };
};
