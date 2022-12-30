import { CanvasTools } from "./canvasTools.js";
import { Entity } from "./Entity.js";
import { TileMapCollider } from "./tileMapCollider.js";
import { Vector2 } from "./vector2.js";
import { World } from "./world.js";

export class Player extends Entity {
  constructor(scene) {
    super();
    this.scene = scene;
    this.scene.add(this);

    this.position_ = new Vector2(1, -3);
    this.size_ = new Vector2(3, 7);
    this.velocity_ = new Vector2(1, -1);
    this.mapCollider = new TileMapCollider(this);
  }

  /** @override */
  update(dtSec) {
    this.position_.x += this.velocity_.x * dtSec;
    this.position_.y += this.velocity_.y * dtSec;

    this.velocity_.y -= World.GRAVITY * dtSec;

    this.mapCollider.update();
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
}