/**
 * Represents an in-game entity
 * Base class
 */
export class Entity {
  constructor() {
    this.position_;
    this.size_;
  }

  update(dtSec) {}
  render() {}
}