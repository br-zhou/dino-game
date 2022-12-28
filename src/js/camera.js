import { Canvas } from "./canvas.js";
import { CanvasTools } from "./canvasTools.js";
import { Vector2 } from "./vector2.js";

/**
 * Represents the in-game camera
 */
export class Camera {
  constructor() {
    this.canvas_ = new Canvas();
    this.ctx_ = this.canvas_.getContext();
    this.position_ = new Vector2();
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