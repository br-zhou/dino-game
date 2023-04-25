/**
 * Represents a 2d vector
 */
export class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * @param {Vector2} a first vector
   * @param {Vector2} b second vector
   * @returns the sum of the given vectors
   */
  static add(a, b) {
    return new Vector2(
      a.x + b.x,
      a.y + b.y
    );
  }

  /**
   * @param {Vector2} a 
   * @param {Vector2} b 
   * @returns the difference of b from a
   */
  static subtract(a, b) {
    return new Vector2(
      a.x - b.x,
      a.y - b.y
    );
  }

  

  static copy(vector) {
    return new Vector2(vector.x, vector.y);
  }

  toRadians() {
    return Math.atan2(this.y, this.x);
  }

  magnitude() {
    return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y, 2));
  }
}