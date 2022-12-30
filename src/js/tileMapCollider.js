import { CanvasTools } from "./canvasTools.js";
import { tileSize } from "./tileMap.js";
import { Vector2 } from "./vector2.js";

export class TileMapCollider {
  constructor(entity) {
    this.entity = entity;
    this.position = entity.position_;
    this.size = entity.size_;
    this.halfSize = {
      x: this.size.x / 2,
      y: this.size.y / 2
    }
    this.tileMap = entity.scene.tileMap;
  }

  update() {
    this.playerGridIndex = this.tileMap.positionToGridIndex(Vector2.add(this.position, this.halfSize));
  }

  render() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.tileMap.outlineGrid({
          x: this.playerGridIndex.x - 1 + i,
          y: this.playerGridIndex.y - 1 + j},
          "#ffff00"
        );
      }
    }

    let trueCenter = {
      x: this.position.x + this.halfSize.x,
      y: this.position.y - this.halfSize.y
    }

    new CanvasTools().drawCircle(trueCenter, .15, "#FFFFFF");
  }
}