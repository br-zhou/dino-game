import { Entity } from "./Entity.js";
import { Rigibody } from "./rigibody.js";
import { Vector2 } from "./vector2.js";

/**
 * Class used to collision detection
 */
export class CollisionMath {

  /**
   * @param {Entity} rect1 
   * @param {Entity} rect2 
   * @returns true when the rectangles are touching. 
   * NOTE: returns false when only edges are touching
   */
  static rectVsRect(rect1, rect2) {
    return rect1.position_.x < rect2.position_.x + rect2.size_.x &&
    rect1.position_.x + rect1.size_.x > rect2.position_.x &&
    rect1.position_.y > rect2.position_.y - rect2.size_.y &&
    rect1.position_.y - rect1.size_.y < rect2.position_.y;
  }

  /**
   * @param {Entity} main 
   * @param {Entity} other 
   * returns the minimum distance for x and y 'other' should move to stop colliding with 'main'
   */
  static rectOverlapDepth(main, other) {
    if (!this.rectVsRect(main, other)) return new Vector2();
    
    const dx1 = main.position_.x - (other.position_.x + other.size_.x);
    const dx2 = (main.position_.x + main.size_.x) - other.position_.x;
    const dy1 = main.position_.y - (other.position_.y - other.size_.y);
    const dy2 = (main.position_.y - main.size_.y) - other.position_.y;

    const dx = (Math.abs(dx1) < Math.abs(dx2) ? dx1 : dx2);
    const dy = (Math.abs(dy1) < Math.abs(dy2) ? dy1 : dy2);
    
    return new Vector2(dx, dy);
  }

  /**
   * 
   * @param {Rigibody} rb1 
   * @param {Rigibody} rb2 
   */
  rectVsRectRay(rb1, rb2) {
    const v1 = Vector2.copy(rb1.velocity_);
    const v2 = Vector2.copy(rb2.velocity_);
    const distance = Vector2.subtract(rb2, rb1);
  }

  /**
   * @param {Vector2} point in world coordinates
   * @param {Entity} rect 
   * @returns true when a point lies within  given rectangle
   * NOTE: returns false if point is on rectangle's edge
   */
  static pointVsRect(point, rect) {
    return point.x > rect.position_.x &&
    point.x < rect.position_.x + rect.size_.x &&
    point.y < rect.position_.y &&
    point.y > rect.position_.y - rect.size_.y;
  }
}