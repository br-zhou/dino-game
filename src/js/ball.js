import { CanvasTools } from "./canvasTools.js";
import { Entity } from "./entity.js";
import { EntityCollider } from "./entityCollider.js";
import { Rigibody } from "./rigibody.js";
import { Scene } from "./scene.js";
import { Vector2 } from "./vector2.js";

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

    this.rb = new Rigibody(this, scene);
    this.entityCollider_ = new EntityCollider(this, this.rb);
  }

  update(dtSec) {
    this.rb.update(dtSec);
    this.entityCollider_.update(dtSec);
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