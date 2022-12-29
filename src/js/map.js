import { CanvasTools } from "./canvasTools.js";

const tileWidth = 2;
const tileColor = "#000000";
/**
 * TileMap for ground
 */
export class TileMap {
  constructor() {
    this.mapData_ = null;
    this.tileData_ = null;
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
      this.tileData_ = this.mapData_.tileData;
      this.offsetX_ = - this.mapData_.width * tileWidth / 2;
      this.offsetY_ = - this.mapData_.height * tileWidth / 2;
      callbackArgument.result = true;
    } catch (err) {
      console.log(err);
    }

    callback(callbackArgument);
  }

  render() {
    const tools = new CanvasTools();

    if (this.tileData_ != null) { // todo: optimize rendering to only show tiles visible to camera
      for (const gridX of Object.keys(this.tileData_)) {
        for (const gridY of Object.keys(this.tileData_[gridX])) {
          tools.drawRect(
            tileColor,
            gridX * tileWidth + this.offsetX_,
            gridY * tileWidth + this.offsetY_,
            tileWidth,
            tileWidth
          );
        }
      }
    }
  }
}