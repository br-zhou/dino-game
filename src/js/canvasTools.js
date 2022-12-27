import { CanvasModes } from "./canvas.js";

/**
 * Gives tools needed to draw on canvas
 * Singleton class
 */
export class CanvasTools {
  constructor(camera) {
    if (CanvasTools.instance instanceof CanvasTools) {
      return CanvasTools.instance;
    }

    this.camera = camera;
    this.canvas = this.camera.canvas_;
    this.ctx = this.canvas.getContext();

    CanvasTools.instance = this;
  }

  /**
   * gives tools needed for rendering
   */
  get tools() {
    return {
      fov: this.fov,
      camPos: this.camPos,
      
    };
  }

  get fov() {
    return this.camera.fov;
  }

  get camPos() {
    return this.camera.position;
  }

  get windowSize() {
    return {x: window.innerWidth, y: window.innerHeight};
  }

  /**
   * @param {number} positionX 
   * @returns the world coordinate positionX converted to the window pixel
   */
  worldToScreenPosX(positionX) {
    return this.worldToScreen(positionX) + this.windowSize.x / 2;
  }

  
  /**
   * @param {number} positionY
   * @returns the world coordinate positionY converted to the window pixel
   */
  worldToScreenPosY(positionY) {
    return this.worldToScreen(positionY) + this.windowSize.y / 2;
  }

  /**
   * @param {number} length 
   * @returns the world units converted to window pixel length
   */
  worldToScreen(length) {
    if (this.canvas.mode === CanvasModes.HORIZONATAL) {
      return (length - this.camPos.x) / this.fov * this.windowSize.x;
    } else {
      return (length - this.camPos.y) / this.fov * this.windowSize.y;
    }
  }

  drawRect(color, x, y, width, length) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      this.worldToScreenPosX(x),this.worldToScreenPosY(y),
      this.worldToScreen(width), this.worldToScreen(length)
    );
  }
}