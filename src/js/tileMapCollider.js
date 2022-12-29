import { CanvasTools } from "./canvasTools.js";
import { tileWidth } from "./tileMap.js";

export class TileMapCollider {
  constructor(entity) {
    this.entity = entity;
    this.position = entity.position_;
    this.size = entity.size_;
    this.tileMap = entity.scene.tileMap;
  }

  update() {
    const playerGridIndex = this.positionToGridIndex(this.position);
    this.tileMap.colorGrid({x:0, y:0}, "#FFFFFF");
  }

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
}