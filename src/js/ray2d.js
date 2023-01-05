import { CanvasTools } from "./canvasTools.js";
import { Vector2 } from "./vector2.js";

export class Ray2D {
  /**
   * 
   * @param {Vector2} position in world units
   * @param {number} direction in radians
   */
  constructor(position = new Vector2(), direction = 0) {
    this.position_ = position;
    this.direction_ = direction;
    this.tools = new CanvasTools();
  }

  render() {
    const circleRadius = 0.25;
    const lineWidth = 3;
    const rayDistance = 3;
    const color = "#FFFF00";
    const endPoint = new Vector2(
      this.position_.x + Math.sin(this.direction_) * rayDistance,
      this.position_.y + Math.cos(this.direction_) * rayDistance
    )
    this.tools.drawCircle(this.position_, circleRadius, color);
    this.tools.drawLine(this.position_, endPoint, color, lineWidth);
  }
}
