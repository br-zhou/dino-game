import { CanvasTools } from "./canvasTools.js";
import { tileSize } from "./tileMap.js";
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

    this.playerTileCollisionCheckRadius = new Vector2(
      Math.ceil(this.size.x / 4) + 1,
      Math.ceil(this.size.y / 4) + 1
    )

    console.log(this.playerTileCollisionCheckRadius);
  }

  update() {
    this.playerCenterPosition = {
      x: this.position.x + this.halfSize.x,
      y: this.position.y - this.halfSize.y
    }

    this.playerGridIndex = this.tileMap.positionToGridIndex(this.playerCenterPosition);
  }

  render() {
    for (let i = -this.playerTileCollisionCheckRadius.x; i <= this.playerTileCollisionCheckRadius.x; i++) {
      for (let j = -this.playerTileCollisionCheckRadius.y; j <= this.playerTileCollisionCheckRadius.y; j++) {
        this.tileMap.outlineGrid({
          x: this.playerGridIndex.x + i,
          y: this.playerGridIndex.y + j},
          "#ffff00"
        );
      }
    }

    new CanvasTools().drawCircle(this.playerCenterPosition, .15, "#FFFFFF");
  }
}