import { CanvasTools } from "./engine/canvasTools.js";
import { Vector2 } from "./engine/vector2.js";

/**
 * Represents the ground that entities interact with
 */
export class Foreground {
  constructor(
      scene,
      position = new Vector2(),
      size = new Vector2(1, 1),
      color = "#000000"
    ) {
    this.color_ = color;
    this.scene_ = scene;
    this.position_ = position;
    this.size_ = size;
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