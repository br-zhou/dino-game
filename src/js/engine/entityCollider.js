import { CollisionMath } from "./collisionMath.js";
import { Entity } from "./Entity.js";
import { Rigibody } from "./rigibody.js";
import { Vector2 } from "./vector2.js";

export class EntityCollider {
  /**
   * 
   * @param {Entity} entity 
   * @param {Rigibody} rigidbody 
   */
  constructor(entity, rigidbody) {
    this.entity = entity;
    this.scene = this.entity.scene;
    this.rb = rigidbody;
  }

  update(dtSec) {
    for (const object of this.scene.entities_) { // todo: optimize
      if (object == this.entity) continue;
      if (CollisionMath.rectVsRect(this.entity, object)) { // ! fails when enitity travels fast
        const hitInfo = object.rb.vsRect(this.entity, dtSec);
        if (hitInfo) {
          const collisionNormals = CollisionMath.rectOverlapDepth(object, this.entity);
          if (hitInfo.normal.x != 0) this.rb.velocity_.x = object.rb.velocity_.x + collisionNormals.x;
        }
      }
    }
  }
}