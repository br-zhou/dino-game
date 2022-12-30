import { CanvasTools } from "./canvasTools.js";
import { Collisions } from "./collisions.js";
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

    this.entityTileCollisionCheckRadius = new Vector2(
      Math.ceil(this.size.x / 4) + 1,
      Math.ceil(this.size.y / 4) + 1
    )

    console.log(this.entityTileCollisionCheckRadius);
  }

  update() {
    this.playerCenterPosition = {
      x: this.position.x + this.halfSize.x,
      y: this.position.y - this.halfSize.y
    }

    this.playerGridIndex = this.tileMap.positionToGridIndex(this.playerCenterPosition);

    this.collsionTiles_ = [];

    for (let i = -this.entityTileCollisionCheckRadius.x; i <= this.entityTileCollisionCheckRadius.x; i++) {
      for (let j = -this.entityTileCollisionCheckRadius.y; j <= this.entityTileCollisionCheckRadius.y; j++) {

        const boxIndex = new Vector2(
          i + this.playerGridIndex.x,
          j + this.playerGridIndex.y
        )

        const gridEntity = this.tileMap.indexToEntity(boxIndex);

        if(Collisions.rectangleCollisionCheck(
          gridEntity,
          this.entity
          )) {
            this.collsionTiles_.push(new Vector2(boxIndex.x, boxIndex.y));
        }
      }
    }
  }

  render() {
    // Render collision check grids
    for (let i = -this.entityTileCollisionCheckRadius.x; i <= this.entityTileCollisionCheckRadius.x; i++) {
      for (let j = -this.entityTileCollisionCheckRadius.y; j <= this.entityTileCollisionCheckRadius.y; j++) {
        this.tileMap.outlineGrid({
          x: this.playerGridIndex.x + i,
          y: this.playerGridIndex.y + j},
          "#ffff00"
        );
      }
    }

    // render active collision grids
    for (const tile of this.collsionTiles_) {
      this.tileMap.colorGrid(new Vector2(tile.x, tile.y), "#FFFFFF");
    }

    // draw a circle at entity's center position
    new CanvasTools().drawCircle(this.playerCenterPosition, .15, "#FFFFFF");
  }
}