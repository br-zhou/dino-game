import { getRenderTools } from "./renderingTools.js";
import { Vec2 } from "./vec2.js";

/**
 * Represents the ground that entities interact with
 */
export class Foreground {
  constructor(scene) {
    this.color_ = '#000000';
    this.scene_ = scene;
    this.position_ = new Vec2();
    this.size_ = new Vec2(90, 20);
  }

  render() {
    const tools = getRenderTools();

    tools.ctx.fillStyle = this.color_;
    tools.ctx.fillRect(this.worldToScreenX(0),this.worldToScreenY(0),
                      this.worldToScreenX(50), this.worldToScreenY(50));
  }

  worldToScreenX(number) {
    const tools = getRenderTools();

    return (number - tools.camPos.x) / tools.fov * tools.windowSize.x;
  }

  worldToScreenY(number) {
    const tools = getRenderTools();
    return (number - tools.camPos.y) / tools.fov * tools.windowSize.y;
  }
}