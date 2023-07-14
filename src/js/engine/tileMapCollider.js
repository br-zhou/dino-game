import { tileSize } from "./tileMap.js";
import { Vector2 } from "./vector2.js";

export class TileMapCollider {
  constructor(entity) {
    this.entity = entity;
    this.size = entity.size_;
    this.tileMap = entity.scene.tileMap;

    this.halfSize = {
      x: this.size.x / 2,
      y: this.size.y / 2
    }
    
    this.entityTileCollisionCheckRadius = new Vector2(
      Math.ceil(this.size.x / (2 * tileSize)),
      Math.ceil(this.size.y / (2 * tileSize))
    );

    this.tilesInRange = [];
  }

  update(dtSec, targetPosition) {
    this.position = Vector2.copy(this.entity.position_);
    this.targetPosition = Vector2.copy(targetPosition);
    this.tilesInRange = this.getMapTilesInRange_V2();
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
   * returns position of entity's center bottom of collision box
   */
  get entityFeetPosition() {
    return new Vector2(
      this.position.x + this.halfSize.x,
      this.position.y - this.size.y
    );
  }

  get feetTileIndex() {
    return this.tileMap.positionToGridIndex(this.entityFeetPosition);;
  }

  isGrounded() {
    if(this.tileMap.tileGrid_[this.feetTileIndex.x] === undefined) return false;
    if(!this.tileMap.tileGrid_[this.feetTileIndex.x][this.feetTileIndex.y]) return false;
    return true;
  }

  /**
   * @returns a list of all grid indexes that are close to enitity collision box
   */
  getMapTilesInRange_V2() {
    let tiles = [];

    const topLeft = new Vector2(
      Math.min(this.position.x, this.targetPosition.x) - 1,
      Math.max(this.position.y, this.targetPosition.y) + 1
    );
    const botRight = new Vector2(
      Math.max(this.position.x + this.size.x, this.targetPosition.x + this.size.x) + 1,
      Math.min(this.position.y - this.size.y, this.targetPosition.y - this.size.x) - 1
    );

    const tlgi = this.tileMap.positionToGridIndex(topLeft);
    const brgi = this.tileMap.positionToGridIndex(botRight);
    const ecr = Vector2.copy(this.entityTileCollisionCheckRadius);
    
    for (let i = tlgi.x - ecr.x; i <= brgi.x + ecr.x; i++) {
      for (let j = tlgi.y + ecr.y; j >= brgi.y - ecr.y; j--) {
        if(this.tileMap.tileGrid_[i] === undefined) continue;
        if(!this.tileMap.tileGrid_[i][j]) continue;

        tiles.push(new Vector2(i, j));
      }
    }
    return tiles;
  }
}