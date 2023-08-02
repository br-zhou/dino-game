import { Entity } from "./engine/Entity.js";
import { CanvasTools } from "./engine/canvasTools.js";
import { Ray2D } from "./engine/ray2d.js";
import { Rigibody } from "./engine/rigibody.js";
import { Sprite } from "./engine/sprite.js";
import { Vector2 } from "./engine/vector2.js";

class Arrow extends Entity {
  constructor(scene, position, rotation, speed) {
    super(Vector2.copy(position), new Vector2(0, 0));
    this.scene = scene;
    this.scene.addProjectile(this);
    this.tools = new CanvasTools();

    this.loaded = false;
    this.stuck = false;

    this.sprite = new Sprite(
      { name: "arrow"},
      (result) => (this.loaded = result)
    );

    this.sprite.size = 1.75;
    this.rotation = rotation;

    this.gravity = 65;
    this.ghost = true;
    this.rb = new Rigibody(this, this.scene);
    this.rb.velocity_.x = Math.cos(rotation) * speed;
    this.rb.velocity_.y = Math.sin(rotation) * speed;
    
    this.setup()
  }
  
  setup() {}

  /** @override */
  update(dtSec) {
    if (!this.stuck) this.rotation = this.rb.velocity_.toRadians();
    if (!this.stuck) this.rb.update(dtSec);
    if (this.rb.velocity_.x === 0 || this.rb.velocity_.y === 0) this.stuck = true;
  }

  /** @override */
  render() {
    if (!this.loaded) return;

    this.sprite.render(this.position_, this.rotation);

  }
}

export default Arrow;
