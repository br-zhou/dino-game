import { CanvasTools } from "./engine/canvasTools.js";
import { PlayerController } from "./playerController.js";
import { Entity } from "./engine/Entity.js";
import { Vector2 } from "./engine/vector2.js";
import { INPUT } from "./engine/input.js";
import { SpriteMap } from "./engine/spriteMap.js";
import { Rigibody } from "./engine/rigibody.js";

export class Enemy extends Entity {
  constructor(scene) {
    super();
    this.speed_ = 12;
    this.gravity = 65;
    this.jumpVelocity = 24;
    
    this.scene = scene;
    this.scene.add(this);

    this.position_ = new Vector2(10, 20);
    this.spawnPosition = Vector2.copy(this.position_);
    this.size_ = new Vector2(1.8, 1.8);
    
    this.rb = new Rigibody(this, this.scene);

    this.targetVelocity_ = new Vector2();

    this.controller_ = new PlayerController(this);

    this.sprite = new SpriteMap({name: "dino", variant: 1}, () => {
      this.sprite.gotoState("idle");
    });

    this.scene.camera.position_ = this.position_;
  }

  /** @override */
  update(dtSec) {    
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

  destroy() {
    this.position_.set(this.spawnPosition);
  }
}