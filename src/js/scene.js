import { Camera } from "./camera.js";

/**
 * Represents a scene in the game. Holds all
 * drawable objects related to scene.
 */
export class Scene {
  constructor() {
    this.camera_ = new Camera();
    this.entities_ = [];
    this.backgroundColor_ = 0x87ceeb;
  }

  /**
   * @param {Drawable} entity 
   */
  add(entity) {
    this.entities_.push(entity);
  }
}