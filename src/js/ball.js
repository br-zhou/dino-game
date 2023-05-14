import { CanvasTools } from "./engine/canvasTools.js";
import { Entity } from "./engine/Entity.js";
import { Rigibody } from "./engine/rigibody.js";
import { Scene } from "./engine/scene.js";
import { Vector2 } from "./engine/vector2.js";

export class Ball extends Entity {
  /**
   * 
   * @param {Vector2} position 
   * @param {Scene} scene 
   */
  constructor(position, scene) {
    super(position, new Vector2(1, 1));
    scene.add(this);
    this.scene = scene;

    this.radius = 0.5;
    this.gravity = 65;
    this.pushable = true;
    this.bounce = .5;

    this.rb = new Rigibody(this, scene);
  }

  update(dtSec) {
    this.rb.update(dtSec);
  }

  render() {
    const tools = new CanvasTools();

    tools.drawCircle(
      {
        x: this.position_.x + this.radius,
        y: this.position_.y - this.radius
      },
      this.radius,
      "#FF00FF"
    );
  }
}