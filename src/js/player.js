import { CanvasTools } from "./canvasTools.js";
import { Entity } from "./Entity.js";
import { Vec2 } from "./vec2.js";

export class Player extends Entity {
  constructor() {
    super();

    this.position_ = new Vec2(0, -5);
    this.size_ = new Vec2(2, 2);
    this.velocity_ = new Vec2();
  }

  /** @override */
  update(dtSec) {
    this.position_.x += this.velocity_.x * dtSec;
    this.position_.y += this.velocity_.y * dtSec;
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