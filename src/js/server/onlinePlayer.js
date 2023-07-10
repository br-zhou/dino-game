import { CanvasTools } from "../engine/canvasTools.js";
import { Entity } from "../engine/Entity.js";
import { Vector2 } from "../engine/vector2.js";
import { SpriteMap } from "../engine/spriteMap.js";
import { Rigibody } from "../engine/rigibody.js";

export class OnlinePlayer extends Entity {
  constructor(scene, variant = false) {
    super();
    this.scene = scene;
    this.scene.add(this);
    this.gravity = 65;

    this.position_ = new Vector2(0, 0);
    this.spawnPosition = Vector2.copy(this.position_);
    this.size_ = new Vector2(1.8, 1.8);
    this.ghost = true;

    this.rb = new Rigibody(this, this.scene);
    this.sprite = new SpriteMap({ name: "dino", variant: variant }, () => {
      this.sprite.gotoState("idle");
    });
  }

  /** @override */
  update(dtSec) {
    this.sprite.update(dtSec);
    this.rb.update(dtSec);
  }

  setPosition(newPosition) {
    this.position_.set(newPosition);
  }

  /** @override */
  render() {
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
}
