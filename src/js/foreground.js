import { CanvasTools } from "./canvasTools.js";
import { Vector2 } from "./vector2.js";

/**
 * Represents the ground that entities interact with
 */
export class Foreground {
  constructor(scene) {
    this.color_ = '#000000';
    this.scene_ = scene;
    this.position_ = new Vector2();
    this.size_ = new Vector2(10, 2);
    this.scene_.addGround(this);
  }

  render() {
    const tools = new CanvasTools();

    tools.drawRect(
      {x: this.position_.x, y: this.position_.y},
      this.size_.x, this.size_.y,
      this.color_
    );
  }
}