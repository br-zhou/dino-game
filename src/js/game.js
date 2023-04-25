import { startLoop } from "./animationLoop.js";
import { CanvasTools } from "./canvasTools.js";
import { Entity } from "./Entity.js";
import { INPUT } from "./input.js";
import { Player } from "./player.js";
import { Ray2D } from "./ray2d.js";
import { Scene } from "./scene.js";
import { Vector2 } from "./vector2.js";

/**
 * Contains main game logic
 * Singleton Instance
 */
export class Game {
  constructor() {
    if (Game.instance instanceof Game) return Game.instance;

    this.scene = new Scene();
    // this.player = new Player(this.scene); 
    
    this.block = new Entity(
      new Vector2(0,0),
      new Vector2(5,5)
    )
    
    this.ray = new Ray2D(new Vector2(0, 0), 145 * Math.PI / 180);

    this.scene.load((result) => {
      if (result === true) {
        this.setup();
        startLoop(this.loop);
      }
    });

    Game.instance = this;
  }

  setup() {
    // nothing
  }

  loop = (dtSec, elapsedTimeSec) => {
    this.scene.update(dtSec, elapsedTimeSec);
    this.scene.render();

    this.ray.render();

    const tools = new CanvasTools();
    this.block.position_ = tools.screenToWorld(INPUT.mousePosition);
    tools.drawRect(this.block.position_, this.block.size_.x, this.block.size_.y,"#00FF00");

    // console.log(this.ray.vsRect(this.block).normal);
    const point = this.ray.vsRect(this.block).point;
    if (point != undefined) {
      console.log(point.x)
      tools.drawCircle(point, 0.35);
    }
  }
}