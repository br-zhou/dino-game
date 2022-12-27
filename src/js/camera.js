import { Canvas } from "./canvas.js";
import { bindToolsToCam } from "./renderingTools.js";
import { Vec2 } from "./vec2.js";

/**
 * Represents the in-game camera
 */
export class Camera {
  constructor() {
    this.canvas_ = new Canvas();
    this.ctx_ = this.canvas_.getContext();
    this.position_ = new Vec2();
    this.windowSize_ = new Vec2(this.canvas_.width, this.canvas_.height);
    this.fov_ = 100;

    bindToolsToCam(this);
  }

  get windowSize() {
    this.windowSize_.x = this.canvas_.width;
    this.windowSize_.y = this.canvas_.height;
    return this.windowSize_;
  }

  get tools() {
    return {
      canvas: this.canvas_,
      ctx: this.ctx_,
      fov: this.fov_,
      camPos: this.position_,
      windowSize: {x: window.innerWidth, y: window.innerHeight},
    };
  }
}