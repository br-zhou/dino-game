import { Camera } from "./camera.js";

/**
 * Represents a scene in the game. Holds all
 * drawable objects related to scene.
 */
export class Scene {
  constructor() {
    this.camera_ = new Camera(this);
    this.entities_ = [];
    this.backgroundColor_ = '#87CEEB';
  }

  /**
   * adds enity to list of entities
   */
  add(entity) {
    this.entities_.push(entity);
  }

  renderBackground() {
    const canvas = this.camera_.canvas;
    const ctx = canvas.getContext();
    ctx.fillStyle = this.backgroundColor_;
    ctx.fillRect(0,0,canvas.width,canvas.height);
  }
}