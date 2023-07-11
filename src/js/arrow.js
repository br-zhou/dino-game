import { Entity } from "./engine/Entity.js";
import { Sprite } from "./engine/sprite.js";
import { Vector2 } from "./engine/vector2.js";

class Arrow extends Entity {
  constructor() {
    super();
    this.loaded = false;
    this.sprite = new Sprite({ name: "arrow", variant: "horizontal"}, (result) => {
      this.loaded = result;
    });
    this.sprite.size = 2;
    this.rotation = 45 * Math.PI / 180;
  }
  /** @override */
  update(dtSec) {}

  /** @override */
  render() {
    if (!this.loaded) return;

    this.sprite.render(this.position_, this.rotation);
  }
}

export default Arrow;
