import { startLoop } from "./engine/animationLoop.js";
import { Ball } from "./ball.js";
import { Block } from "./block.js";
import { CanvasTools } from "./engine/canvasTools.js";
import { CollisionMath } from "./engine/collisionMath.js";
import { Foreground } from "./foreground.js";
import { INPUT } from "./engine/input.js";
import { Player } from "./player.js";
import { Scene } from "./engine/scene.js";
import { UI } from "./userInterface.js";
import { Vector2 } from "./engine/vector2.js";
import { Enemy } from "./enemy.js";
import { PRIMARY_KEYBINDS, SECONDARY_KEYBINDS } from "./keybinds.js";

/**
 * Contains main game logic
 * Singleton Instance
 */
export class Game {
  constructor() {
    if (Game.instance instanceof Game) return Game.instance;

    this.scene = new Scene();
    this.player = new Player(this.scene);
    this.player.bindControls(PRIMARY_KEYBINDS);

    this.player2 = new Player(this.scene, 2);
    this.player2.bindControls(SECONDARY_KEYBINDS);

    this.scene.camera.bind(this.player);

    this.ui = new UI();
    this.scene.load((result) => {
      if (result === true) {
        this.setup();
        startLoop(this.loop);
      }
    });

    Game.instance = this;

    new Foreground(
      this.scene,
      new Vector2(35, 0),
      new Vector2(5, 5),
      "#ffffff"
    );
    new Foreground(
      this.scene,
      new Vector2(40, 5),
      new Vector2(2, 5),
      "#ffffff"
    );
    new Foreground(
      this.scene,
      new Vector2(35, 5),
      new Vector2(2, 2),
      "#ffffff"
    );
    new Foreground(
      this.scene,
      new Vector2(35, 7),
      new Vector2(2, 2),
      "#ffffff"
    );
    new Foreground(
      this.scene,
      new Vector2(35, 9),
      new Vector2(2, 2),
      "#ffffff"
    );

    new Foreground(
      this.scene,
      new Vector2(-100, -15),
      new Vector2(200, 2),
      "#ffffff"
    );
    new Foreground(
      this.scene,
      new Vector2(-100, -5),
      new Vector2(2, 10),
      "#ffffff"
    );
    new Foreground(
      this.scene,
      new Vector2(98, -5),
      new Vector2(2, 10),
      "#ffffff"
    );

    new Block(new Vector2(13, 20),this.scene);

    // new Ball(new Vector2(10, 25), this.scene);
    // new Ball(new Vector2(20, 20), this.scene);
    // new Ball(new Vector2(15, 20), this.scene);
  }

  setup() {
    // nothing
  }

  loop = (dtSec, elapsedTimeSec) => {
    this.scene.update(dtSec, elapsedTimeSec);
    this.scene.render();

    this.ui.updateFPSCounter(dtSec, elapsedTimeSec);
  };
}
