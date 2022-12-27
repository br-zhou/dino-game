import { CanvasTools } from "./canvasTools.js";
import { Vec2 } from "./vec2.js";

/**
 * Represents the ground that entities interact with
 */
export class Foreground {
  constructor(scene) {
    this.color_ = '#000000';
    this.scene_ = scene;
    this.position_ = new Vec2();
    this.size_ = new Vec2(10, 2);
  }

  render() {
    const tools = new CanvasTools();

    tools.drawRect(
      this.color_,
      this.position_.x, this.position_.y,
      this.size_.x, this.size_.y
    );
  }
}