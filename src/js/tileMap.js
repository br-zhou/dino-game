import { CanvasTools } from "./canvasTools.js";
import { Vector2 } from "./vector2.js";

export const tileSize = 2;
const tileColor = "#000000";
/**
 * TileMap for ground
 */
export class TileMap {
  constructor() {
    this.mapData_ = null;
    this.tileGrid_ = null;
    this.tools = new CanvasTools();
  }

  /**
   * tries loading map data and returns success to callback
   * @param {function({type: string, result: boolean})} callback function that receives result
   */
  async load(callback) {
    let callbackArgument = {object: this, result: false};
    
    try {
      const response = await fetch("./assets/map.json");
      this.mapData_ = await response.json()
      this.tileGrid_ = this.mapData_.tileData;
      this.offsetX_ = - this.mapData_.width * tileSize / 2;
      this.offsetY_ = - this.mapData_.height * tileSize / 2;
      callbackArgument.result = true;
    } catch (err) {
      console.log(err);
    }

    callback(callbackArgument);
  }

  render() {
    if (this.tileGrid_ != null) { // todo: optimize rendering to only show tiles visible to camera
      for (const gridX of Object.keys(this.tileGrid_)) {
        for (const gridY of Object.keys(this.tileGrid_[gridX])) {
          this.colorGrid({x: gridX, y: gridY}, tileColor);
        }
      }
    }
  }

  /**
   * @param {x, y} position colors tile at index {x,y}
   * @param {string} color the specified color
   */
  colorGrid({x, y}, color) {
    this.tools.drawRect(
      x * tileSize + this.offsetX_,
      y * tileSize + this.offsetY_,
      tileSize,
      tileSize,
      color
    );
  }

  /**
   * @param {x, y} position outlines tile at index {x,y}
   * @param {string} color the specified color
   */
  outlineGrid({x, y}, color) {
    this.tools.drawRectOutline(
      x * tileSize + this.offsetX_,
      y * tileSize + this.offsetY_,
      tileSize,
      tileSize,
      color
    );
  }

  get offsetX() {
    return this.offsetX_;
  }

  get offsetY() {
    return this.offsetY_;
  }

  /**
   * @param {number, number} position world position
   * @returns {number, number} index in tileGrid
   */
  positionToGridIndex({x, y}) {
    const OffsetPosition = {x: x - this.offsetX_, y: y - this.offsetY_};

    const gridIndex = {
      x: Math.floor(OffsetPosition.x / tileSize),
      y: Math.ceil(OffsetPosition.y / tileSize)
    }

    return gridIndex;
  }

  /**
   * 
   * @param {number, number} gridIndex x and y indexes in tileGrid
   * @returns {number, number} world position of grid
   */
  gridIndexToPosition({x, y}) {
    const worldPosition = {
      x: x * tileSize + this.offsetX_,
      y: y * tileSize + this.offsetY_
    }

    return worldPosition;
  }

  indexToEntity({x, y}) {
    return {
      position_: this.gridIndexToPosition(new Vector2(x, y)),
      size_: new Vector2(tileSize, tileSize)
    }
  }
}