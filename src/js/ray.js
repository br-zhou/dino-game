import { Vector2 } from "./vector2.js";

export class Ray2D {
  constructor(position = new Vector2(), dydx = new Vector2()) {
    this.position_ = position;
    this.direction_ = dydx;
  }
}
