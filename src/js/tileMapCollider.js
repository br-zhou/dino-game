import { CanvasTools } from "./canvasTools.js";
import { tileWidth } from "./tileMap.js";
import { Vector2 } from "./vector2.js";

export class TileMapCollider {
  constructor(entity) {
    this.entity = entity;
    this.position = entity.position_;
    this.size = entity.size_;
    this.halfSize = {
      x: this.size.x / 2,
      y: this.size.y / 2
    }
    this.tileMap = entity.scene.tileMap;
  }

  update() {
    this.playerGridIndex = this.positionToGridIndex(Vector2.add(this.position, this.halfSize));
  }

  render() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.tileMap.outlineGrid({
          x: this.playerGridIndex.x - 1 + i,
          y: this.playerGridIndex.y - 1 + j},
          "#ffff00"
        );
      }
    }

    let trueCenter = {
      x: this.position.x + this.halfSize.x,
      y: this.position.y - this.halfSize.y
    }

    new CanvasTools().drawCircle(trueCenter, .15, "#FFFFFF");
  }

  /**
   * @param {number, number} position world position
   * @returns {number, number} index in tileGrid
   */
  positionToGridIndex({x, y}) {
    const gridOffsetX = this.tileMap.offsetX;
    const gridOffsetY = this.tileMap.offsetY;

    const OffsetPosition = {x: x - gridOffsetX, y: y - gridOffsetY};

    const gridIndex = {
      x: Math.floor(OffsetPosition.x / tileWidth),
      y: Math.floor(OffsetPosition.y / tileWidth)
    }

    return gridIndex;
  }

  /**
   * 
   * @param {number, number} gridIndex x and y indexes in tileGrid
   * @returns {number, number} world position of grid
   */
  gridIndexToPosition({x, y}) {
    const gridOffsetX = this.tileMap.offsetX;
    const gridOffsetY = this.tileMap.offsetY;

    const worldPosition = {
      x: x * tileWidth + gridOffsetX,
      y: y * tileWidth + gridOffsetY
    }

    return worldPosition;
  }
}