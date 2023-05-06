import { CanvasTools } from "./canvasTools.js";
import { Entity } from "./entity.js";
import { Rigibody } from "./rigibody.js";
import { Scene } from "./scene.js";
import { Vector2 } from "./vector2.js";

export class Block extends Entity {
  /**
   * 
   * @param {Vector2} position 
   * @param {Scene} scene 
   */
  constructor(position, scene) {
    super(position, new Vector2(1, 1));
    scene.add(this);
    this.rb = new Rigibody(this, scene);
  }

  update(dtSec) {
    this.rb.update(dtSec);
  }

  render() {
    const tools = new CanvasTools();

    tools.drawRect(
      {
        x: this.position_.x,
        y: this.position_.y
      },
      this.size_.x,
      this.size_.y,
      "#00FF00"
    );
  }
}