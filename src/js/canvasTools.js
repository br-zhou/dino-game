/**
 * Gives tools needed to draw on canvas
 * Singleton class
 */
export class CanvasTools {
  constructor(camera) {
    if (CanvasTools.instance instanceof CanvasTools) {
      return CanvasTools.instance;
    }

    this.camera_ = camera;
    this.canvas_ = this.camera_.canvas_;
    this.ctx_ = this.canvas_.getContext();
    this.fov_ = this.camera_.fov;
    this.camPos_ = camera.position;

    CanvasTools.instance = this;
  }

  /**
   * gives tools needed for rendering
   */
  get tools() {
    return {
      canvas: this.canvas_,
      ctx: this.ctx_,
      fov: this.fov_,
      camPos: this.camPos_,
      windowSize: {x: window.innerWidth, y: window.innerHeight},
    };
  }

  /**
   * @param {number} positionX 
   * @returns the world coordinate positionX converted to the window pixel
   */
  worldToScreenX(positionX) {
    return (positionX - tools.camPos.x) / tools.fov * tools.windowSize.x;
  }

  
  /**
   * @param {number} positionY
   * @returns the world coordinate positionY converted to the window pixel
   */
  worldToScreenY(positionY) {
    return (positionY - tools.camPos.y) / tools.fov * tools.windowSize.y;
  }
}