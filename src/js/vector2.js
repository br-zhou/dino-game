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
}