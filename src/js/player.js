import { CanvasTools } from "./canvasTools.js";
import { Entity } from "./Entity.js";
import { Vector2 } from "./vector2.js";
import { World } from "./world.js";

export class Player extends Entity {
  constructor() {
    super();
    this.scene = null;
    this.position_ = new Vector2(0, -5);
    this.size_ = new Vector2(2, 2);
    this.velocity_ = new Vector2(0, 3);
  }

  setScene(scene) {
    this.scene = scene;
  }

  /** @override */
  update(dtSec) {
    this.position_.x -= this.velocity_.x * dtSec;
    this.position_.y -= this.velocity_.y * dtSec;

    this.velocity_.y += World.GRAVITY * dtSec;
  }

  /** @override */
  render() {
    const tools = new CanvasTools();
    
    tools.drawRect(
      "#FF0000",
      this.position_.x,
      this.position_.y,
      this.size_.x,
      this.size_.y
    );
  }
}