import { CanvasTools } from "./canvasTools.js";
import { Vector2 } from "./vector2.js";

export const TILE_SIZE = 2;
const tileColor = "#000000";
/**
 * TileMap for ground
 */
export class TileMap {
  constructor() {
    this.mapData_ = null;
    this.tileGrid_ = null;
    this.tools = new CanvasTools();

    this.mapData_ = {
      name: "test map",
      width: 32,
      height: 16,
      tileData: {},
    };

    this.mapData_ = {"name":"test map","width":32,"height":16,"tileData":{"0":{"5":1,"15":1},"1":{"2":1,"8":1,"10":1,"12":1},"2":{"1":1,"3":1,"5":1,"10":1,"12":1,"13":1,"14":1},"3":{"4":1,"12":1,"15":1},"4":{"1":1,"4":1,"6":1,"10":1,"11":1,"12":1,"14":1,"15":1},"5":{"4":1,"7":1,"9":1,"12":1,"13":1,"14":1,"15":1},"6":{"2":1,"9":1,"11":1,"13":1},"7":{"0":1,"2":1,"4":1,"6":1,"8":1,"11":1,"13":1},"8":{"5":1,"7":1,"9":1},"9":{"0":1,"1":1,"6":1,"7":1,"14":1,"15":1},"10":{"0":1,"5":1,"7":1,"9":1},"11":{"5":1,"6":1,"15":1},"12":{"5":1,"6":1,"7":1,"9":1,"13":1,"14":1,"15":1},"13":{"0":1,"2":1,"4":1,"5":1,"10":1,"11":1},"14":{"2":1,"10":1,"11":1},"15":{"2":1,"7":1,"8":1,"10":1,"11":1,"14":1},"16":{"0":1,"8":1,"13":1,"14":1,"15":1},"17":{"0":1,"3":1,"4":1,"10":1},"18":{"4":1,"5":1,"6":1,"8":1,"9":1},"19":{"2":1,"3":1,"4":1,"13":1},"20":{"0":1,"1":1,"2":1,"4":1,"9":1,"12":1,"14":1},"21":{"1":1,"4":1,"10":1,"13":1,"14":1},"22":{"3":1,"5":1,"9":1,"10":1,"14":1},"23":{"4":1,"6":1,"8":1,"12":1,"14":1},"24":{"6":1,"12":1,"14":1},"25":{"3":1,"5":1,"11":1,"15":1},"26":{"3":1,"8":1,"9":1,"10":1,"15":1},"27":{"3":1,"6":1},"28":{"1":1,"3":1,"5":1,"7":1,"10":1,"15":1},"29":{"7":1,"8":1,"9":1,"10":1,"12":1,"13":1,"15":1},"30":{"0":1,"1":1,"2":1,"6":1,"7":1,"8":1,"9":1},"31":{"3":1,"4":1,"9":1,"10":1}}}

    this.tileGrid_ = this.mapData_.tileData;
    this.offsetX_ = 0;
    this.offsetY_ = 0;
  }

  render() {
    this.tools.drawRect(new Vector2(0, this.mapData_.height * TILE_SIZE), this.mapData_.width * TILE_SIZE, this.mapData_.height * TILE_SIZE)

    if (this.tileGrid_ != null) {
      // todo: optimize rendering to only show tiles visible to camera
      for (const gridX of Object.keys(this.tileGrid_)) {
        for (const gridY of Object.keys(this.tileGrid_[gridX])) {
          this.colorGrid({ x: gridX, y: gridY }, tileColor);
        }
      }
    }
  }

  /**
   * @param {x, y} position colors tile at index {x,y}
   * @param {string} color the specified color
   */
  colorGrid({ x, y }, color) {
    this.tools.drawRect(
      {
        x: x * TILE_SIZE + this.offsetX_,
        y: y * TILE_SIZE + this.offsetY_,
      },
      TILE_SIZE,
      TILE_SIZE,
      color
    );
  }

  /**
   * @param {x, y} position outlines tile at index {x,y}
   * @param {string} color the specified color
   */
  outlineGrid({ x, y }, color) {
    this.tools.drawRectOutline(
      {
        x: x * TILE_SIZE + this.offsetX_,
        y: y * TILE_SIZE + this.offsetY_,
      },
      TILE_SIZE,
      TILE_SIZE,
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
  positionToGridIndex({ x, y }) {
    const OffsetPosition = { x: x - this.offsetX_, y: y - this.offsetY_ };

    const gridIndex = {
      x: Math.floor(OffsetPosition.x / TILE_SIZE),
      y: Math.ceil(OffsetPosition.y / TILE_SIZE),
    };

    return gridIndex;
  }

  /**
   *
   * @param {number, number} gridIndex x and y indexes in tileGrid
   * @returns {number, number} world position of grid
   */
  gridIndexToPosition({ x, y }) {
    const worldPosition = {
      x: x * TILE_SIZE + this.offsetX_,
      y: y * TILE_SIZE + this.offsetY_,
    };

    return worldPosition;
  }

  /**
   *
   * @param {vector2} gridIndexPosition of block
   * @returns enitity that represents block
   * NOTE: altering the enitity does not alter the block
   */
  tileIndexToEntity({ x, y }) {
    return {
      position_: this.gridIndexToPosition(new Vector2(x, y)),
      size_: new Vector2(TILE_SIZE, TILE_SIZE),
    };
  }
}
