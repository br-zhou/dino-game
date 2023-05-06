import { CanvasTools } from "./canvasTools.js";
import { PlayerController } from "./playerController.js";
import { Entity } from "./entity.js";
import { Vector2 } from "./vector2.js";
import { INPUT } from "./input.js";
import { SpriteMap } from "./spriteMap.js";
import { Rigibody } from "./rigibody.js";

export class Player extends Entity {
  constructor(scene) {
    super();
    this.speed_ = 12;
    this.gravity = 65;
    this.jumpVelocity = 24;
    
    this.scene = scene;
    this.scene.add(this);

    this.position_ = new Vector2(10, 20);
    this.size_ = new Vector2(1.8, 1.8);
    
    this.rb = new Rigibody(this, this.scene);
    this.rb.gravity = this.gravity;

    this.targetVelocity_ = new Vector2();

    this.controller_ = new PlayerController(this);
    this.controller_.clickCB = this.teleportToMouse;

    this.sprite = new SpriteMap("dino", () => {
      this.sprite.gotoState("idle");
    });

    this.scene.camera.position_ = this.position_;
  }

  /** @override */
  update(dtSec) {    
    this.handleControllerInput_();
    this.rb.update(dtSec);
    this.updateSpriteLogic();
    this.sprite.update(dtSec);
  }

  updateSpriteLogic() {
    if (this.rb.isgrounded_) {
      if (this.rb.velocity_.x == 0) {
        this.sprite.gotoState("idle");
      } else {
        this.sprite.gotoState("run");
      }
    } else if (this.rb.velocity_.y != 0) {
      this.sprite.gotoState("walk");
    }
  }

  jump() {
    if (this.rb.isgrounded_) {
      this.rb.velocity_.y = this.jumpVelocity;
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

    tools.drawRect(
      {
        x: this.position_.x,
        y: this.position_.y
      },
      this.size_.x,
      this.size_.y,
      "rgba(255,0,0,.7)"
    );

    this.sprite.render(this.position_);
  }

  handleControllerInput_() {
    const commands = this.controller_.commands;

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

    if (this.controller_.wantsToMove) {
      this.rb.velocity_.x = this.targetVelocity_.x;
    } else {
      this.rb.velocity_.x = 0;
    }
  }

  teleportToMouse = () => { // arrow functions binds method to class
    const mousePos = (new CanvasTools()).screenToWorld(INPUT.mousePosition);
    
    this.position_.set(mousePos);
  }
}