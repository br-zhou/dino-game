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

    this.dxdt_ = Math.cos(this.direction_);
    this.dydt_ = Math.sin(this.direction_);
  }

  render() {
    const circleRadius = 0.25;
    const lineWidth = 3;
    const rayDistance = 5;
    const color = "#FFFF00";
    const endPoint = new Vector2(
      this.position_.x + this.dxdt_ * rayDistance,
      this.position_.y + this.dydt_ * rayDistance
    )
    this.tools.drawCircle(this.position_, circleRadius, color);
    this.tools.drawLine(this.position_, endPoint, color, lineWidth);
  }

  rayVsRect(rectangle) {
    const rectPosition = rectangle.position_;
    const rectSize = rectangle.size_;

    const leftSideIntersectT = (rectPosition.x - this.position_.x) / this.dxdt_;
    const rightSideIntersectT = (rectPosition.x + rectSize.x - this.position_.x) / this.dxdt_;

    const topSideIntersectT = (rectPosition.y - this.position_.y) / this.dydt_;
    const botSideIntersectT = ((rectPosition.y - rectSize.y) - this.position_.y) / this.dydt_;

    let nearTime = new Vector2(
      Math.min(leftSideIntersectT, rightSideIntersectT),
      Math.min(topSideIntersectT, botSideIntersectT)
    );
    
    let farTime = new Vector2(
      Math.max(leftSideIntersectT, rightSideIntersectT),
      Math.max(topSideIntersectT, botSideIntersectT)
    );


    return nearTime.x < farTime.y &&
      nearTime.y < farTime.x &&
      !(nearTime.x < 0 && nearTime.y < 0);
  }
}
