import { CanvasTools } from "./canvasTools.js";
import { PlayerController } from "./playerController.js";
import { Entity } from "./Entity.js";
import { TileMapCollider } from "./tileMapCollider.js";
import { Vector2 } from "./vector2.js";
import { Ray2D } from "./ray2d.js";
import { INPUT } from "./input.js";

export class Player extends Entity {
  constructor(scene) {
    super();
    this.speed_ = 12;
    this.gravity = 65;
    this.jumpVelocity = 12;
    
    this.scene = scene;
    this.scene.add(this);

    this.position_ = new Vector2(10, 20);
    this.size_ = new Vector2(1.8, 1.8);
    this.velocity_ = new Vector2();
    this.targetVelocity_ = new Vector2();
    this.tileMap = scene.tileMap;


    this.mapCollider = new TileMapCollider(this);
    this.controller = new PlayerController(this);
  }

  /** @override */
  update(dtSec) {
    this.position_.x += this.velocity_.x * dtSec;
    this.position_.y += this.velocity_.y * dtSec;

    this.velocity_.y -= this.gravity * dtSec;
    
    this.handleControllerCommands_();
    this.handleGroundBlockCollisions_(dtSec);
    this.handleTileMapCollisions_(dtSec);
  }

  jump() {
    this.velocity_.y = this.jumpVelocity;
  }

  /**
   * @param {number} direction a float between -1 and 1 (inclusive), 
   * representing the direction the controller wants to move
   */
  move(direction) {
    this.targetVelocity_.x = direction * this.speed_;
  }

  crouch() { // todo: implement
    if(false) { // replace with new isgrounded fucntion
      // duck
    } else {
      // fast fall
    }
  }

  /** @override */
  render() {
    const tools = new CanvasTools();

    tools.drawRect(
      {
        x: this.position_.x,
        y: this.position_.y
      },
      this.size_.x,
      this.size_.y,
      "rgba(255,0,0,.7)"
    );
  }

  handleControllerCommands_() {
    const commands = this.controller.commands;

    commands.forEach((command) => {
      switch (command) {
        case "up":
          this.jump();
          break;
        case "down":
          this.crouch();
          break;
        case "left":
          this.move(-1);
          break;
        case "right":
          this.move(1);
          break;
        case "l-click":
            this.position_ = (new CanvasTools()).screenToWorld(INPUT.mousePosition);
            break;
        default:
          break;
      }
    });

    if (this.controller.wantsToMove) {
      this.velocity_.x = this.targetVelocity_.x;
    } else {
      this.velocity_.x = 0;
    }
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

    const displacement = 0.001;
    const point = hitInfo.point;
    const normal = hitInfo.normal;
    
    if (normal.y != 0) { // top and bottom
      this.velocity_.y = 0;
      this.position_.y = point.y + this.size_.y/2 + normal.y * displacement; // ! todo: change because sketchy!
    } else { // left and right
      this.velocity_.x = 0;
      this.position_.x = point.x - this.size_.x/2 + normal.x * displacement;
    }
  }

  handleTileMapCollisions_(dtSec) {
    this.mapCollider.update();
    this.handleTiles(dtSec);
  }

  handleTiles(dtSec) {
    let hits = [];

    for (const tileIndex of this.mapCollider.tilesInRange) { // gets all tiles in range
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
    
    const playerRay = new Ray2D(
      Vector2.add(
        this.position_,
        new Vector2(this.size_.x/2, -this.size_.y/2)
        ),
      this.velocity_.toRadians()
    ); // ! this is recalculated every function call. Optimize this.

    const tools = new CanvasTools();

    const expandedRect = Ray2D.expandRect(this, rectangle);

    return playerRay.vsRect(expandedRect, this.velocity_.magnitude() * dtSec);
  }
}