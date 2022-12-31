import { Collisions } from "./collisions.js";
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

    this.entityTileCollisionCheckRadius = new Vector2(
      Math.ceil(this.size.x / (2 * tileSize)),
      Math.ceil(this.size.y / (2 * tileSize))
    );
  }

  update() {
    this.entityTileGridIndex = this.tileMap.positionToGridIndex(this.entityCenterPosition);
    this.collsionTiles_ = this.getCollidingMapTiles();
  }

  render() {
    // Render collision check grids
    for (let i = -this.entityTileCollisionCheckRadius.x; i <= this.entityTileCollisionCheckRadius.x; i++) {
      for (let j = -this.entityTileCollisionCheckRadius.y; j <= this.entityTileCollisionCheckRadius.y; j++) {
        this.tileMap.outlineGrid({
          x: this.entityTileGridIndex.x + i,
          y: this.entityTileGridIndex.y + j},
          "#ffff00"
        );
      }
    }

    // render active collision grids
    for (const tile of this.collsionTiles_) {
      this.tileMap.colorGrid(new Vector2(tile.x, tile.y), "rgba(255, 155, 0, 0.7)");
    }
  }

  /**
   * returns position of the center of entity's collision box
   */
  get entityCenterPosition() {
    return new Vector2(
      this.position.x + this.halfSize.x,
      this.position.y - this.halfSize.y
    )
  }

  /**
   * @returns a list of all grid indexes that touch enitity collision box
   */
  getCollidingMapTiles() {
    let collsionTiles = [];

    for (let i = -this.entityTileCollisionCheckRadius.x; i <= this.entityTileCollisionCheckRadius.x; i++) {
      for (let j = -this.entityTileCollisionCheckRadius.y; j <= this.entityTileCollisionCheckRadius.y; j++) {
        
        const boxIndex = new Vector2(
          i + this.entityTileGridIndex.x,
          j + this.entityTileGridIndex.y
        )

        if(this.tileMap.tileGrid_[boxIndex.x] === undefined) continue;
        if(!this.tileMap.tileGrid_[boxIndex.x][boxIndex.y]) continue;

        const gridEntity = this.tileMap.indexToEntity(boxIndex);

        if(Collisions.rectangleCollisionCheck(
          gridEntity,
          this.entity
          )) {
            collsionTiles.push(new Vector2(boxIndex.x, boxIndex.y));
        }
      }
    }

    return collsionTiles;
  }
}