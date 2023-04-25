import { CanvasTools } from "./canvasTools.js";
import { CollisionMath } from "./collisionMath.js";
import { tileSize } from "./tileMap.js";
import { Vector2 } from "./vector2.js";

export class TileMapCollider {
  constructor(entity) {
    this.entity = entity;
    this.position = entity.position_;
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
  }

  update() {
    this.entityTileGridIndex = this.tileMap.positionToGridIndex(this.entityCenterPosition);
    this.collsionTiles = this.getCollidingMapTiles();
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
    for (const tile of this.collsionTiles) {
      this.tileMap.colorGrid(new Vector2(tile.x, tile.y), "rgba(255, 155, 0, 0.7)");
    }

    new CanvasTools().drawCircle(this.entityFeetPosition, .15, "#000000");
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
   * @returns a list of all grid indexes that touch enitity collision box
   */
  getCollidingMapTiles() { // todo update so that this considers velocity as well
    let collsionTiles = [];

    for (let i = -this.entityTileCollisionCheckRadius.x; i <= this.entityTileCollisionCheckRadius.x; i++) {
      for (let j = -this.entityTileCollisionCheckRadius.y; j <= this.entityTileCollisionCheckRadius.y; j++) {
        
        const boxIndex = new Vector2(
          i + this.entityTileGridIndex.x,
          j + this.entityTileGridIndex.y
        )

        if(this.tileMap.tileGrid_[boxIndex.x] === undefined) continue;
        if(!this.tileMap.tileGrid_[boxIndex.x][boxIndex.y]) continue;

        const tileEntity = this.tileMap.tileIndexToEntity(boxIndex);

        if(CollisionMath.rectVsRect(
          tileEntity,
          this.entity
          )) {
            collsionTiles.push(new Vector2(boxIndex.x, boxIndex.y));
        }
      }
    }

    return collsionTiles;
  }
}