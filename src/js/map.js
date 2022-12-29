import { CanvasTools } from "./canvasTools.js";

const tileWidth = 2;
const tileColor = "#000000";
/**
 * TileMap for ground
 */
export class TileMap {
  constructor() {
    this.mapData_ = null;
    this.getMap();
  }

  async getMap() {
    try {
      const response = await fetch("./assets/map.json");
      this.mapData_ = await response.json()
      console.log(this.mapData_);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const tools = new CanvasTools();

    if (this.mapData_ != null) { // todo: optimize rendering to only show tiles visible to camera
      for (const gridX of Object.keys(this.mapData_)) {
        for (const gridY of Object.keys(this.mapData_[gridX])) {
          tools.drawRect(
            tileColor,
            gridX * tileWidth,
            gridY * tileWidth,
            tileWidth,
            tileWidth
          );
        }
      }
    }
  }
}