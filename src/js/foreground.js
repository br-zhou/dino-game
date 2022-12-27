import { CanvasTools } from "./canvasTools.js";
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
    const tools = new CanvasTools();

    tools.ctx.fillStyle = this.color_;
    tools.ctx.fillRect(
      tools.worldToScreenPosX(0),tools.worldToScreenPosY(0),
      tools.worldToScreen(49), tools.worldToScreen(10)
    );
    
    tools.ctx.fillStyle = "red";
    tools.ctx.fillRect(
      100  + tools.windowSize.x / 2, 100 + tools.windowSize.y / 2,
      100, 100
    );
  }
}