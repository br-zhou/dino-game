import { Entity } from "./engine/Entity.js";
import { CanvasTools } from "./engine/canvasTools.js";
import { Rigibody } from "./engine/rigibody.js";
import { Sprite } from "./engine/sprite.js";
import { Vector2 } from "./engine/vector2.js";

class Arrow extends Entity {
  constructor(scene) {
    super(new Vector2(0, 0), new Vector2(0, 0));
    this.scene = scene;
    this.loaded = false;

    this.sprite = new Sprite(
      { name: "arrow", variant: "horizontal" },
      (result) => this.loaded = result
    );
    
    this.sprite.size = 2;
    this.rotation = 0;
    this.tools = new CanvasTools();

    this.bounce = 1;
    this.groundFriction = 0;
    this.gravity = 30;
    this.maxGravity = 15;

    this.rb = new Rigibody(this, this.scene);
    this.rb.velocity_.x = 15;
  }
  /** @override */
  update(dtSec) {
    this.rb.update(dtSec);
    this.rotation = this.rb.velocity_.toRadians() - Math.PI / 4;
  }

  /** @override */
  render() {
    if (!this.loaded) return;

    this.sprite.render(this.position_, this.rotation);
    this.tools.drawCircle(this.position_, 0.25, "#ffff00");
  }
}

export default Arrow;
