import { Canvas } from "./canvas.js";
import { Vec2 } from "./vec2.js";

/**
 * Represents the in-game camera
 */
export class Camera {
  constructor() {
    this.canvas_ = new Canvas();
    this.position = new Vec2();
    this.viewRange = 100;
  }

  render() {
    // render background

    // render foreground

    // render entities
  }
}