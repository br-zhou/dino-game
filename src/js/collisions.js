/**
 * Class used to collision detection
 */
export class Collisions {

  /**
   * @param {Entity} rect1 
   * @param {Entity} rect2 
   * @returns true when the rectangles are touching. 
   * NOTE: returns false when only edges are touching
   */
  static rectangleCollisionCheck(rect1, rect2) {
    return rect1.position_.x < rect2.position_.x + rect2.size_.x &&
    rect1.position_.x + rect1.size_.x > rect2.position_.x &&
    rect1.position_.y > rect2.position_.y - rect2.size_.y &&
    rect1.position_.y - rect1.size_.y < rect2.position_.y;
  }

  /**
   * @param {Vector2} point in world coordinates
   * @param {Entity} rect 
   * @returns true when a point lies within  given rectangle
   * NOTE: returns false if point is on rectangle's edge
   */
  static pointInRectangleCheck(point, rect) {
    return point.x > rect.position_.x &&
    point.x < rect.position_.x + rect.size_.x &&
    point.y < rect.position_.y &&
    point.y > rect.position_.y - rect.size_.y;
  }
}