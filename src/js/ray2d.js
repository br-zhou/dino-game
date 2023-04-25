import { Entity } from "./Entity.js";
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
    const color = "#FF00FF";
    const endPoint = new Vector2(
      this.position_.x + this.dxdt_ * rayDistance,
      this.position_.y + this.dydt_ * rayDistance
    )
    this.tools.drawCircle(this.position_, circleRadius, color);
    this.tools.drawLine(this.position_, endPoint, color, lineWidth);
  }

  /**
   * 
   * @param {Entity} rectangle 
   * @param {number} maxDist the maximum distance of ray cast 
   * @returns object with collision point and normal, or false if no collision
   * NOTE: still returns true if the start of ray is inside rectangle
   */
  vsRect(rectangle, maxDist = 0) {
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


    const isColliding = nearTime.x < farTime.y &&
      nearTime.y < farTime.x &&
      !(farTime.x < 0 || farTime.y < 0);

    if (!isColliding) return false;
    
    const collisionTime = Math.max(nearTime.x, nearTime.y);

    let collisionPoint = new Vector2(
      this.position_.x + this.dxdt_ * collisionTime,
      this.position_.y + this.dydt_ * collisionTime
    );

    if (maxDist != 0) {

      if (Vector2.subtract(collisionPoint, this.position_).magnitude() > maxDist) {
        return false;
      }
    }

    const normaldirection = new Vector2();
    
    if (nearTime.x > nearTime.y) {
      normaldirection.x = Math.sign(this.dxdt_) * -1;
    } else {
      normaldirection.y = Math.sign(this.dydt_) * -1;
    }
    
    return {
      point: collisionPoint,
      normal: normaldirection
    };
  }

  /**
   * 
   * @param {Entity} dynamicRect 
   * @param {Entity} staticRect 
   */
  static expandRect(dynamicRect, staticRect) {
    const newPos = new Vector2(
      staticRect.position_.x - dynamicRect.size_.x/2,
      staticRect.position_.y + dynamicRect.size_.y/2
    );

    const newSize = new Vector2(
      staticRect.size_.x + dynamicRect.size_.x,
      staticRect.size_.y + dynamicRect.size_.y
    );
    
    return new Entity(newPos,newSize);
  }
}
