class Foreground {
  constructor(camera) {
    this.color_ = '#000000';
    this.camera_ = camera;
  }

  render() {
    ctx.fillStyle = this.color_;
    ctx.fillRect(0,0,canvas.width,canvas.height);
  }
}