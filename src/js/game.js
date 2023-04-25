import { startLoop } from "./animationLoop.js";
import { CanvasTools } from "./canvasTools.js";
import { CollisionMath } from "./collisionMath.js";
import { Entity } from "./Entity.js";
import { Foreground } from "./foreground.js";
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
    this.player = new Player(this.scene); 
    
    this.block = new Entity(
      new Vector2(0,0),
      new Vector2(5,5)
    )
    
    this.scene.load((result) => {
      if (result === true) {
        this.setup();
        startLoop(this.loop);
      }
    });

    Game.instance = this;

    this.ground = new Foreground(this.scene);
  }

  setup() {
    // nothing
  }

  loop = (dtSec, elapsedTimeSec) => {
    this.scene.update(dtSec, elapsedTimeSec);
    this.scene.render();

    const tools = new CanvasTools();
    this.block.position_ = tools.screenToWorld(INPUT.mousePosition);
    tools.drawRect(this.block.position_, this.block.size_.x, this.block.size_.y,"#00FF00");
  }
}