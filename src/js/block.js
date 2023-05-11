import { CanvasTools } from "./engine/canvasTools.js";
import { Entity } from "./engine/Entity.js";
import { Rigibody } from "./engine/rigibody.js";
import { Scene } from "./engine/scene.js";
import { Vector2 } from "./engine/vector2.js";

export class Block extends Entity {
  /**
   * 
   * @param {Vector2} position 
   * @param {Scene} scene 
   */
  constructor(position, scene) {
    super(position);
    scene.add(this);
    this.scene = scene;
    
    this.rb = new Rigibody(this, scene);
  }

  update(dtSec) {
    // this.rb.update(dtSec);
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