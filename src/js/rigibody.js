import { CanvasTools } from "./canvasTools.js";
import { TileMapCollider } from "./tileMapCollider.js";
import { Ray2D } from "./ray2d.js";
import { Entity } from "./entity.js";
import { Scene } from "./scene.js";
import { Vector2 } from "./vector2.js";

export class Rigibody {
  /**
   * 
   * @param {Entity} entity 
   * @param {Scene} scene 
   */
  constructor(entity, scene) {
    this.entity = entity;
    this.scene = scene;
    this.position_ = entity.position_;
    this.velocity_ = new Vector2();
    this.gravity = 10;
    this.mass = 1;
    this.size_ = entity.size_;
    this.mapCollider_ = new TileMapCollider(this);
    this.tileMap = scene.tileMap;
    this.isgrounded_ = false;
  }

  update(dtSec) {
    this.position_.x += this.velocity_.x * dtSec;
    this.position_.y += this.velocity_.y * dtSec;

    this.velocity_.y -= this.gravity * dtSec;

    this.isgrounded_ = false;
    this.handleGroundBlockCollisions_(dtSec);
    this.handleTileMapCollisions_(dtSec);
  }

  handleGroundBlockCollisions_(dtSec) {
    for (const block of this.scene.groundsBlocks_) {
      const hitInfo = this.vsRect(block, dtSec);
      if (hitInfo != false) {
        this.resolveCollision(hitInfo);
      }
    }
  }
  
  resolveCollision(hitInfo) {
    if (hitInfo == false) return;

    const resolveDisplacement = 0.0001;
    const point = hitInfo.point;
    const normal = hitInfo.normal;
    
    if (normal.y != 0) { // top and bottom
      this.velocity_.y = 0;
      this.position_.y = point.y + this.size_.y/2 + normal.y * resolveDisplacement; // ! todo: change because sketchy!
      if (normal.y == 1) this.isgrounded_ = true;
    } else { // left and right
      this.velocity_.x = 0;
      this.position_.x = point.x - this.size_.x/2 + normal.x * resolveDisplacement;
    }
  }

  handleTileMapCollisions_(dtSec) {
    this.mapCollider_.update();
    this.handleTiles(dtSec);
  }

  handleTiles(dtSec) {
    let hits = [];

    for (const tileIndex of this.mapCollider_.tilesInRange) { // gets all tiles in range
      const tileEntity = this.tileMap.tileIndexToEntity(tileIndex); // turns the tile coords into a rectange for collisions
      const hitInfo = this.vsRect(tileEntity, dtSec); // tests for collision against the tile
      if(hitInfo != false) {
        hits.push(hitInfo);
      }
    }

    hits.sort(this.sortHitInfo_); // "sorts" the collisions, but it doesnt actually help the edges case because both tiles are distance 0
                                  // so result is undeterministic 

    for (const hit of hits) {
      this.resolveCollision(hit); // just pushes the player out of the collision based on collision point and normal
    }
  }

  vsRect(rectangle, dtSec) {
    if (this.velocity_.x === 0 && this.velocity_.y === 0) return false;
    // The previoius line is needed since ray is pointed right when x = 0 & y = 0
    
    const entityRay = new Ray2D(
      Vector2.add(
        this.position_,
        new Vector2(this.size_.x/2, -this.size_.y/2)
        ),
      this.velocity_.toRadians()
    ); // ! this is recalculated every function call. Optimize this.

    const tools = new CanvasTools();

    const expandedRect = Ray2D.expandRect(this, rectangle);

    return entityRay.vsRect(expandedRect, this.velocity_.magnitude() * dtSec);
  }
}