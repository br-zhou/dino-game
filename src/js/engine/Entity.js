import { Vector2 } from "./vector2.js";

/**
 * Represents an in-game entity
 * Base class
 */
export class Entity {
  /**
   * Creates a new enitity with given size at specified position
   * @param {Vector2} position 
   * @param {Vector2} size 
   */
  constructor(position = new Vector2(), size = new Vector2(1, 1)) {
    this.position_ = position;
    this.size_ = size;
    this.scene = null;
  }

  update(dtSec) {}
  render() {}
  destroy() {}
}