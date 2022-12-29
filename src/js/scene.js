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
    this.tileMap = new TileMap();
    this.sceneLoadedCallback_ = null;
    this.unloadedObjects_ = new Set();
    this.loaded_ = false;

    this.unloadedObjects_.add(this.tileMap);
  }

  /**
   * loads scene and all entities added to it. 
   * @param {function(boolean)} callback
   * @returns result as boolean to callback
   */
  load(callback) {
    this.sceneLoadedCallback_ = callback;
    console.log(this.sceneLoadedCallback_);
    this.tileMap.load(this.objectLoaded_);
  }

  /**
   * If every object in scene is loaded, calls sceneLoadedCallback
   * function with result
   * @param {string, boolean} result name of object loaded and result
   */
  objectLoaded_ = ({object, result}) => {
    this.unloadedObjects_.delete(object);

    console.log(this.unloadedObjects_.size);

    if (this.unloadedObjects_.size === 0) {
      this.loaded_ = true;
      this.sceneLoadedCallback_(result);
    }
  }

  /**
   * adds `entity` to list of entities
   * REQUIRES: can only be called before scene.load is called!
   */
  add(entity) {
    this.entities_.push(entity);
    entity.setScene(this);
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
    this.tileMap.render();
  }

  get camera() {
    return this.camera_;
  }
}