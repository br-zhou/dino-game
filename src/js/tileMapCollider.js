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

  update() {
    this.position = this.entity.position_;
    this.tilesInRange = this.getMapTilesInRange();
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
 getMapTilesInRange() { // todo update so that this considers velocity as well
    const currentEntityTileGridIndex = this.tileMap.positionToGridIndex(this.entityCenterPosition);
    let tiles = [];

    for (let i = -this.entityTileCollisionCheckRadius.x; i <= this.entityTileCollisionCheckRadius.x; i++) {
      for (let j = -this.entityTileCollisionCheckRadius.y; j <= this.entityTileCollisionCheckRadius.y; j++) {
        
        const boxIndex = new Vector2(
          i + currentEntityTileGridIndex.x,
          j + currentEntityTileGridIndex.y
        )

        if(this.tileMap.tileGrid_[boxIndex.x] === undefined) continue;
        if(!this.tileMap.tileGrid_[boxIndex.x][boxIndex.y]) continue;

        tiles.push(new Vector2(boxIndex.x, boxIndex.y));
      }
    }

    return tiles;
  }
}