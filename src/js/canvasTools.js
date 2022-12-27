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
  worldToScreenX(positionX) {
    return (positionX - this.camPos.x) / this.fov * this.windowSize.x;
  }

  
  /**
   * @param {number} positionY
   * @returns the world coordinate positionY converted to the window pixel
   */
  worldToScreenY(positionY) {
    console.log(this.canvas.mode);
    return (positionY - this.camPos.y) / this.fov * this.windowSize.y;
  }
}