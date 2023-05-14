import { TileMapCollider } from "./tileMapCollider.js";
import { Ray2D } from "./ray2d.js";
import { Entity } from "./Entity.js";
import { Scene } from "./scene.js";
import { Vector2 } from "./vector2.js";
import { CollisionMath } from "./collisionMath.js";

export class Rigibody {
  /**
   * 
   * @param {Entity} entity 
   * @param {Scene} scene 
   */
  constructor(entity, scene) {
    this.entity = entity;
    this.scene = scene;
    
    this.gravity = 10;
    this.maxGravity = 100;
    this.mass = 1;
    this.pushable = false;

    this.size_ = entity.size_;
    this.mapCollider_ = new TileMapCollider(this);
    
    this.position_ = entity.position_;
    this.velocity_ = new Vector2();

    this.tileMap = scene.tileMap;
    this.isgrounded_ = false;

    this.configure_(entity);
  }
  
  /**
   * Copies configurations from given entity1
   */
  configure_(entity) {
    if (entity.gravity) this.gravity = entity.gravity;
    if (entity.maxGravity) this.maxGravity = entity.maxGravity;
    if (entity.mass) this.mass = entity.mass;
    if (entity.pushable) this.pushable = entity.pushable;
  }

  update(dtSec) {
    const targetPosition = new Vector2(
      this.position_.x + this.velocity_.x * dtSec,
      this.position_.y + this.velocity_.y * dtSec
    );

    this.updateVelocity(dtSec);

    this.isgrounded_ = false;
    this.handleGroundBlockCollisions_(dtSec, targetPosition);
    this.handleTileMapCollisions_(dtSec, targetPosition);
    this.handleOtherEntities_(dtSec, targetPosition);

    this.position_.set(targetPosition);
  }

  updateVelocity(dtSec) {
    if (!this.isgrounded_) this.velocity_.y -= this.gravity * dtSec;
    if (this.velocity_.y < -this.maxGravity) this.velocity_.y = -this.maxGravity;
  }

  handleGroundBlockCollisions_(dtSec, targetPosition) {
    for (const block of this.scene.groundsBlocks_) {
      const hitInfo = this.vsRect(block, dtSec);
      if (hitInfo != false) {
        this.resolveCollision_(hitInfo, targetPosition);
      }
    }
  }

  handleOtherEntities_(dtSec, targetPosition) {
    for (const otherEnt of this.scene.entities_) {
      if (otherEnt === this.entity) continue;
      const hitInfo = this.vsRect(otherEnt, dtSec);
      if (hitInfo != false) {
        if (otherEnt.rb.pushable) {
          Rigibody.RBvsRBResponse(this, otherEnt.rb, hitInfo);
        }
        this.resolveCollision_(hitInfo, targetPosition);
      }
    }
  }

  static RBvsRBResponse(a, b, hitInfo) {
    let av_i = Vector2.copy(a.velocity_);
    let bv_i = Vector2.copy(b.velocity_);
    let a_mass = a.mass;
    let b_mass = b.mass;

    const av_f = new Vector2(
      av_i.x * (a_mass - b_mass) + 2 * b_mass * bv_i.x / (a_mass + b_mass),
      av_i.y * (a_mass - b_mass) + 2 * b_mass * bv_i.y / (a_mass + b_mass)
    )

    const bv_f = new Vector2(
      bv_i.x * (b_mass - a_mass) + 2 * a_mass * av_i.x / (a_mass + b_mass),
      bv_i.y * (b_mass - a_mass) + 2 * a_mass * av_i.y / (a_mass + b_mass)
    )
    
    const mainNormal = Rigibody.getMainNormal(hitInfo);
    
    if (mainNormal == 'x') {
      a.velocity_.x = av_f.x;
      b.velocity_.x = bv_f.x;
    } else if (mainNormal == 'y') {
      a.velocity_.y = av_f.y * 1.01;
      b.velocity_.y = bv_f.y;
    }
  }

  static getMainNormal(hitInfo) {
    return (hitInfo.normal.y == 0) ? 'x' : 'y';
  }
  
  resolveCollision_(hitInfo, targetPosition) {
    if (hitInfo == false) return;

    const RESOLVE_DISPLACEMENT = 0.0001;
    
    const point = hitInfo.point;
    const normal = hitInfo.normal;
    
    if (normal.y != 0) { // top and bottom
      this.velocity_.y = 0;
      targetPosition.y = point.y + this.size_.y/2 + normal.y * RESOLVE_DISPLACEMENT;
      if (normal.y == 1) this.isgrounded_ = true;
    } else { // left and right
      this.velocity_.x = 0;
      targetPosition.x = point.x - this.size_.x/2 + normal.x * RESOLVE_DISPLACEMENT;
    }
  }

  handleTileMapCollisions_(dtSec, targetPosition) {
    this.mapCollider_.update(dtSec, targetPosition);
    this.handleTiles(dtSec, targetPosition);
  }

  handleTiles(dtSec, targetPosition) {
    let hits = [];

    for (const tileIndex of this.mapCollider_.tilesInRange) {
      const tileEntity = this.tileMap.tileIndexToEntity(tileIndex); 
      const hitInfo = this.vsRect(tileEntity, dtSec);
      if(hitInfo != false) {
        const neighbourTile = Vector2.add(tileIndex, hitInfo.normal);
        
        if(!this.tileMap.tileGrid_[neighbourTile.x] || !this.tileMap.tileGrid_[neighbourTile.x][neighbourTile.y]) {
          hits.push(hitInfo); // if there is no tile existing on face of collider, add hit info
        }
      }
    }

    hits.sort(this.sortHitInfo_);

    for (const hit of hits) {
      this.resolveCollision_(hit, targetPosition);
    }
  }

  /**
   * Checks if this rigibody will collide with given rectange, and returns hit information or false, depending
   * on if there is a collision
   * @param {Entity} rectangle 
   * @param {number} dtSec 
   * @returns 
   */
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

    const expandedRect = Ray2D.expandRect(this, rectangle);

    return entityRay.vsRect(expandedRect, this.velocity_.magnitude() * dtSec);
  }
}