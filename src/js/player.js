import { CanvasTools } from "./engine/canvasTools.js";
import { PlayerController } from "./playerController.js";
import { Entity } from "./engine/Entity.js";
import { Vector2 } from "./engine/vector2.js";
import { INPUT } from "./engine/input.js";
import { SpriteMap } from "./engine/spriteMap.js";
import { Rigibody } from "./engine/rigibody.js";
import Arrow from "./arrow.js";

export class Player extends Entity {
  constructor(scene, variant = false) {
    super();
    this.speed_ = 12;
    this.gravity = 65;
    this.jumpVelocity = 24;

    this.scene = scene;
    this.scene.add(this);
    if (this.scene.localPlayer === null) this.scene.localPlayer = this;

    this.position_ = new Vector2(0, 0);
    this.spawnPosition = Vector2.copy(this.position_);
    this.size_ = new Vector2(1.8, 1.8);
    this.tools = new CanvasTools();
    this.rb = new Rigibody(this, this.scene);
    this.targetVelocity_ = new Vector2();

    this.sprite = new SpriteMap({ name: "dino", variant: variant }, () => {
      this.sprite.gotoState("idle");
    });

    this.effects = {};
  }

  /**
   *
   * @param {*} controller
   */
  bindControls(controls) {
    this.controller_ = new PlayerController(controls, this);

    this.controller_.clickHandler = () => {
      this.shootArrow();
    };

    this.controller_.rightClickHandler = () => {
      this.dash();
    };
  }

  shootArrow = () => {
    let mousediff = Vector2.subtract(
      this.tools.screenToWorld(INPUT.mousePosition),
      this.playerMidPos
    );

    new Arrow(this.scene, this.playerMidPos, mousediff.toRadians(), 50);
  };

  dash = () => {
    const DASH_DISTANCE = 6;

    const mousediff = Vector2.subtract(
      this.tools.screenToWorld(INPUT.mousePosition),
      this.playerMidPos
    );
    const pointingDirection = mousediff.toRadians();

    const deltaPosition = new Vector2(
      Math.cos(pointingDirection) * DASH_DISTANCE,
      Math.sin(pointingDirection) * DASH_DISTANCE
    );

    this.rb.handleDashCollision(deltaPosition);
  };

  /** @override */
  update(dtSec) {
    if (this.effects.death) return;

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

  crouch() {
    // this.dash();
    this.shootArrow();
  }

  /** @override */
  render() {
    if (this.effects.death) return;
    const tools = new CanvasTools();

    tools.drawRect(
      {
        x: this.position_.x,
        y: this.position_.y,
      },
      this.size_.x,
      this.size_.y,
      "rgba(255,0,0,.7)"
    );

    this.sprite.render(this.position_);
  }

  handleControllerInput_() {
    if (!this.controller_) return;

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
          this.sprite.flipped = true;
          break;
        case "right":
          this.move(1);
          this.sprite.flipped = false;
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

  death() {
    this.effects.death = true;

    setTimeout(this.spawn, 1500);
  }

  suicideHandler() {
    // send request to server
    this.death();
  }

  spawn = () => {
    this.effects.death = false;
    this.position_.set(this.spawnPosition);
  }

  get playerMidPos() {
    return Vector2.add(
      this.position_,
      new Vector2(this.size_.x / 2, -this.size_.y / 2)
    );
  }
}
