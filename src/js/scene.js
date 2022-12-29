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
   * adds `entity` to list of entities
   */
  add(entity) {
    this.entities_.push(entity);
  }

  /**
   * updates all entities in scene
   */
  update(dtSec, elapsedTimeSec) {
    for (const entitiy of this.entities_) {
      entitiy.update(dtSec, elapsedTimeSec);
    }
  }

  /**
   * renders background, foreground, the entities onto canvas
   */
  render() {
    this.renderBackground_();
    this.renderForeground_();

    for (const entitiy of this.entities_) {
      entitiy.render();
    }
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