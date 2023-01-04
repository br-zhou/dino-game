import { CanvasTools } from "./canvasTools.js";
import { PlayerController } from "./playerController.js";
import { Entity } from "./Entity.js";
import { TileMapCollider } from "./tileMapCollider.js";
import { Vector2 } from "./vector2.js";
import { Collisions } from "./collisions.js";

export class Player extends Entity {
  constructor(scene) {
    super();
    this.speed_ = 10;
    this.gravity = 50;
    this.jumpVelocity = 25;
    
    this.scene = scene;
    this.scene.add(this);

    this.position_ = new Vector2(1, -3);
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

    this.mapCollider.update();
    
    this.handleControllerCommands_();

    if (this.controller.wantsToMove) {
      this.velocity_.x =  this.targetVelocity_.x;
    } else {
      this.velocity_.x = 0;
    }

    this.handleTileMapCollisions();

  }

  jump() {
    if (this.mapCollider.isGrounded()) {
      this.velocity_.y = this.jumpVelocity;
    }
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

    this.mapCollider.render();
    
    tools.drawRect(
      this.position_.x,
      this.position_.y,
      this.size_.x,
      this.size_.y,
      "#FF0000"
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
        default:
          break;
      }
    });
  }

  handleTileMapCollisions() {
    this.handleTopAndBottomTileCollisions();
    this.handleLeftAndRightTileCollisions();
  }

   handleTopAndBottomTileCollisions() {
    // handle floor collisions
    const bottomBoundLine = new Entity(
      Vector2.add(this.position_, new Vector2(0, - this.size_.y)),
      new Vector2(this.size_.x, 0)
    );
    
    for (const tileIndex of this.mapCollider.collsionTiles) { // todo: optimize
      const tileEntity = this.tileMap.tileIndexToEntity(tileIndex);
      
      if(Collisions.rectangleCollisionCheck(bottomBoundLine, tileEntity) && this.velocity_.y < 0) {
        this.position_.y = tileEntity.position_.y + this.size_.y;
        this.velocity_.y = 0;
        break;
      }
    }

    // handle roof collisions
    const topBoundLine = new Entity(
      Vector2.copy(this.position_),
      new Vector2(this.size_.x, 0)
    );
    
    for (const tileIndex of this.mapCollider.collsionTiles) { // todo: optimize
      const tileEntity = this.tileMap.tileIndexToEntity(tileIndex);
      
      if(Collisions.rectangleCollisionCheck(topBoundLine, tileEntity) && this.velocity_.y > 0) {
        this.position_.y = tileEntity.position_.y - tileEntity.size_.y;
        this.velocity_.y = 0;
        break;
      }
    }
  }

  handleLeftAndRightTileCollisions() {
    // handle left wall collisions
    const leftBoundLine = new Entity(
      Vector2.copy(this.position_),
      new Vector2(0, this.size_.y)
    );

    for (const tileIndex of this.mapCollider.collsionTiles) { // todo: optimize
      const tileEntity = this.tileMap.tileIndexToEntity(tileIndex);
      
      if(Collisions.rectangleCollisionCheck(leftBoundLine, tileEntity) && this.velocity_.x < 0) {
        this.position_.x = tileEntity.position_.x + tileEntity.size_.x;
        break;
      }
    }

    // handle right wall collisions
    const rightBoundLine = leftBoundLine;
    rightBoundLine.position_.x += this.size_.x;

    for (const tileIndex of this.mapCollider.collsionTiles) { // todo: optimize
      const tileEntity = this.tileMap.tileIndexToEntity(tileIndex);
      
      if(Collisions.rectangleCollisionCheck(rightBoundLine, tileEntity) && this.velocity_.x > 0) {
        this.position_.x = tileEntity.position_.x - this.size_.x;
        break;
      }
    }
  }
}