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

    this.position = this.entity.position_;

    this.tilesInRange = [];
  }

  /**
   * @returns a list of all grid indexes that are between entity position and target position
   */
  getMapTilesInRange_V2(targetPosition) {
    this.position = Vector2.copy(this.entity.position_);
    this.targetPosition = Vector2.copy(targetPosition);

    let tiles = [];

    const topLeft = new Vector2(
      Math.min(this.position.x, this.targetPosition.x),
      Math.max(this.position.y, this.targetPosition.y)
    );
    const botRight = new Vector2(
      Math.max(this.position.x + this.size.x, this.targetPosition.x + this.size.x),
      Math.min(this.position.y - this.size.y, this.targetPosition.y - this.size.x)
    );

    const tl_gi = this.tileMap.positionToGridIndex(topLeft);
    const br_gi = this.tileMap.positionToGridIndex(botRight);
    const ecr = Vector2.copy(this.entityTileCollisionCheckRadius);
    
    for (let i = tl_gi.x - ecr.x; i <= br_gi.x + ecr.x; i++) {
      for (let j = tl_gi.y + ecr.y; j >= br_gi.y - ecr.y; j--) {
        if(this.tileMap.tileGrid_[i] === undefined) continue;
        if(!this.tileMap.tileGrid_[i][j]) continue;

        tiles.push(new Vector2(i, j));
      }
    }
    
    return tiles;
  }

  /**
   * @returns a list containing every tile in the map as pairs of vectors
   */
  getAllTiles() {
    const tiles = []
    for(const x in this.tileMap.tileGrid_) {
      for (const y in this.tileMap.tileGrid_[x]) {
        tiles.push(new Vector2(
          Number(x), Number(y)));
      }
    }
    
    return tiles;
  }
}