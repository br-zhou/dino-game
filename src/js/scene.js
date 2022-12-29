import { Camera } from "./camera.js";
import { TileMap } from "./map.js";

/**
 * Represents a scene in the game. Holds all
 * drawable objects related to scene.
 */
export class Scene {
  constructor() {
    this.camera_ = new Camera(this);
    this.entities_ = [];
    this.backgroundColor_ = '#87CEEB';
    this.tileMap_ = new TileMap();
  }

  /**
   * adds enity to list of entities
   */
  add(entity) {
    this.entities_.push(entity);
  }

  render() {
    this.renderBackground_();
    this.renderForeground_();
  }

  renderBackground_() {
    const canvas = this.camera_.canvas_;
    const ctx = canvas.getContext();
    ctx.fillStyle = this.backgroundColor_;
    ctx.fillRect(0,0,canvas.width,canvas.height);
  }

  renderForeground_() {
    this.tileMap_.render();
  }

  get camera() {
    return this.camera_;
  }
}