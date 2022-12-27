import { Canvas } from "./canvas.js";
import { Vec2 } from "./vec2.js";

/**
 * Represents the in-game camera
 */
export class Camera {
  constructor() {
    this.canvas = new Canvas();
    this.ctx = this.canvas.getContext();
    this.position = new Vec2();
    this.viewRange = 100;
  }

  get size() {
    return new Vec2(this.canvas.width, this.canvas.height);
  }
}