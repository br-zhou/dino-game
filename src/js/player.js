import { CanvasTools } from "./canvasTools.js";
import { PlayerController } from "./playerController.js";
import { Entity } from "./Entity.js";
import { TileMapCollider } from "./tileMapCollider.js";
import { Vector2 } from "./vector2.js";

export class Player extends Entity {
  constructor(scene) {
    super();
    this.speed_ = 10;
    this.gravity = 50;
    this.jumpVelocity = 25;
    
    this.scene = scene;
    this.scene.add(this);

    this.position_ = new Vector2(1, -3);
    this.size_ = new Vector2(2, 2);
    this.velocity_ = new Vector2();
    this.targetVelocity_ = new Vector2();
    this.isGrounded_ = false;
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

    this.isGrounded_ = this.mapCollider.isGrounded();

    if (this.isGrounded_) {
      this.velocity_.y = 0;
    }
    
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
   * @param {number} direction a float between -1 and 1 (inclusive), representing the direction the player is facing
   */
  turn(direction) {
    this.targetVelocity_.x = direction * this.speed_;
  }

  crouch() { // todo: implement
    if(this.isGrounded_) {
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
          this.turn(-1);
          break;
        case "right":
          this.turn(1);
          break;
        default:
          break;
      }
    });
  }

  handleTileMapCollisions() {
    // handle ground collisions;
    if (this.mapCollider.isGrounded()) {
      const feetIndex = this.mapCollider.feetTileIndex;
      const feetTilePosition = this.tileMap.gridIndexToPosition(feetIndex);
      
      this.position_.y = feetTilePosition.y + this.size_.y;
    }

    // handle wall collisions

    for (const tile of this.mapCollider.collsionTiles) {
      const tileEntity = this.tileMap.tileIndexToEntity(tile);
    }
    
  }
}