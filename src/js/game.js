import { startLoop } from "./animationLoop.js";
import { Ball } from "./ball.js";
import { Block } from "./block.js";
import { CanvasTools } from "./canvasTools.js";
import { CollisionMath } from "./collisionMath.js";
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
    new Foreground(this.scene, new Vector2(-100,-5), new Vector2(2, 10), "#ffffff");
    new Foreground(this.scene, new Vector2(98,-5), new Vector2(2, 10), "#ffffff");

    this.blk = new Block(
      new Vector2(0, 20),
      this.scene
    );

    this.mouseBlock = new Block(
      new Vector2(0, 20),
      this.scene
    );
    // this.mouseBlock.size_.set(new Vector2(4,4));
    // new Ball(new Vector2(10, -5), this.scene);
    new Ball(new Vector2(10, 25), this.scene);
  }

  setup() {
    // nothing
  }

  loop = (dtSec, elapsedTimeSec) => {
    this.scene.update(dtSec, elapsedTimeSec);
    this.scene.render();

    const mousePos = (new CanvasTools()).screenToWorld(INPUT.mousePosition);
    this.mouseBlock.position_.set(mousePos);

    // console.log(CollisionMath.rectOverlapNormals(this.mouseBlock, this.blk));
  }
}