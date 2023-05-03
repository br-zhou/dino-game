import { startLoop } from "./animationLoop.js";
import { CanvasTools } from "./canvasTools.js";
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

    this.scene.load((result) => {
      if (result === true) {
        this.setup();
        startLoop(this.loop);
      }
    });

    Game.instance = this;

    new Foreground(this.scene, new Vector2(35,0), new Vector2(5, 5), "#ffffff");
    new Foreground(this.scene, new Vector2(40,5), new Vector2(2, 5), "#ffffff");
    new Foreground(this.scene, new Vector2(35,5), new Vector2(2, 2), "#ffffff");
    new Foreground(this.scene, new Vector2(35,7), new Vector2(2, 2), "#ffffff");
    new Foreground(this.scene, new Vector2(35,9), new Vector2(2, 2), "#ffffff");


    new Foreground(this.scene, new Vector2(-100,-15), new Vector2(200, 2), "#ffffff");
  }

  setup() {
    // nothing
  }

  loop = (dtSec, elapsedTimeSec) => {
    this.scene.update(dtSec, elapsedTimeSec);
    this.scene.render();

    const tools = new CanvasTools();
    
    const playermidpos = Vector2.add(this.player.position_, new Vector2(this.player.size_.x/2, -this.player.size_.y/2));
 
    let mousediff = Vector2.subtract(tools.screenToWorld(INPUT.mousePosition), playermidpos);
    this.pRay = new Ray2D(playermidpos, mousediff.toRadians());
    this.pRay.length = mousediff.magnitude();
    this.pRay.render();

    for (const block of this.scene.groundsBlocks_) {
      const hitInfo = this.pRay.vsRect(block, mousediff.magnitude());
      if (hitInfo != false) {
        tools.drawCircle(hitInfo.point, .5);
      }
    }
  }
}