import { CanvasModes } from "./canvas.js";
import { Vector2 } from "./vector2.js";

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
      fov: this.camFov,
      camPos: this.camPos,
      
    };
  }

  get camFov() {
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
    return this.worldToScreenConvert(positionX) + this.windowSize.x / 2;
  }

  
  /**
   * @param {number} positionY
   * @returns the world coordinate positionY converted to the window pixel
   */
  worldToScreenPosY(positionY) {
    return - this.worldToScreenConvert(positionY) + this.windowSize.y / 2;
  }

  /**
   * @param {Vector2} position position on screen
   * @returns position in world coordinates as Vector2
   */
  screenToWorld(position) {
    let referenceLength = 0;
    if (this.canvas.mode === CanvasModes.HORIZONATAL) {
      referenceLength = this.windowSize.x;
    } else {
      referenceLength = this.windowSize.y;
    }

    const xWorld = ((position.x / this.windowSize.x) - 0.5) * (this.windowSize.x / referenceLength) * this.camFov + this.camPos.x;
    const yWorld = (0.5 - (position.y / this.windowSize.y)) * (this.windowSize.y / referenceLength) * this.camFov + this.camPos.y;
    return new Vector2(xWorld, yWorld);
  }

  /**
   * @param {number} length 
   * @returns the world units converted to window pixel length
   */
  worldToScreenConvert(length) {
    if (this.canvas.mode === CanvasModes.HORIZONATAL) {
      return (length - this.camPos.x) / this.camFov * this.windowSize.x;
    } else {
      return (length - this.camPos.y) / this.camFov * this.windowSize.y;
    }
  }

  /**
   * Draws a rectangle of given width and height,
   * with the top left corner at the world postion x and y
   * @param {number} x x world position
   * @param {number} y y world position
   * @param {number} width width of rectangle
   * @param {number} height height of rectangle
   * @param {string} color String in the format '#000000'
   */
  drawRect({x, y}, width, height, color = "#FF0000") {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      this.worldToScreenPosX(x),this.worldToScreenPosY(y),
      this.worldToScreenConvert(width), this.worldToScreenConvert(height)
    );
  }

    /**
   * Draws a write rectangle of given width and height,
   * with the top left corner at the world postion x and y
   * @param {number} x x world position
   * @param {number} y y world position
   * @param {number} width width of rectangle
   * @param {number} height height of rectangle
   * @param {string} color String in the format '#000000'
   */
  drawRectOutline({x, y}, width, height, color = "#FF0000") {
    this.ctx.strokeStyle = color;
    this.ctx.strokeRect(
      this.worldToScreenPosX(x),this.worldToScreenPosY(y),
      this.worldToScreenConvert(width), this.worldToScreenConvert(height)
    );
  }
  
  drawCircle({x, y}, radius, color = "#FF0000") {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(
      this.worldToScreenPosX(x),
      this.worldToScreenPosY(y),
      this.worldToScreenConvert(radius),
      0,
      2 * Math.PI
    );

    this.ctx.fill();
  }

  /**
   * Draws a line from point1 to point2
   * @param {Vector2} point1 start point of line
   * @param {Vector2} point2 end point of line
   */
    drawLine(startPoint, endPoint, color = "#FF0000", width = 3) {
      const originalLineWidth = this.ctx.lineWidth;
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = width;
      this.ctx.beginPath();
      this.ctx.moveTo(
        this.worldToScreenPosX(startPoint.x),
        this.worldToScreenPosY(startPoint.y)
      );
      this.ctx.lineTo(
        this.worldToScreenPosX(endPoint.x),
        this.worldToScreenPosY(endPoint.y)
      );
      this.ctx.stroke();
      this.ctx.lineWidth = originalLineWidth;
    }
}