import { Canvas } from "./canvas.js";
import { CanvasTools } from "./canvasTools.js";
import { Vec2 } from "./vec2.js";

/**
 * Represents the in-game camera
 */
export class Camera {
  constructor() {
    this.canvas_ = new Canvas();
    this.ctx_ = this.canvas_.getContext();
    this.position_ = new Vec2();
    this.fov_ = 100;

    void new CanvasTools(this);
  }

  get fov() {
    return this.fov_;
  }

  get position() {
    return this.position_;
  }
}