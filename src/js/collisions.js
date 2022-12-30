export class Collisions {
  static rectangleCollisionCheck(rect1, rect2) {
    return rect1.position_.x < rect2.position_.x + rect2.size_.x &&
    rect1.position_.x + rect1.size_.x > rect2.position_.x &&
    rect1.position_.y > rect2.position_.y - rect2.size_.y &&
    rect1.position_.y - rect1.size_.y < rect2.position_.y;
  }
}