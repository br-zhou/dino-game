import { startLoop } from "./engine/animationLoop.js";
import { Player } from "./player.js";
import { Scene } from "./engine/scene.js";
import { UI } from "./userInterface.js";
import { PRIMARY_KEYBINDS } from "./keybinds.js";
import GameServer from "./server/GameServer.js";
import { Foreground } from "./foreground.js";
import { Vector2 } from "./engine/vector2.js";
/**
 * Contains main game logic
 * Singleton Instance
 */
export class Game {
  constructor() {
    if (Game.instance instanceof Game) return Game.instance;
    else Game.instance = this;

    this.scene = new Scene();
    this.player = new Player(this.scene, 0);
    this.player.bindControls(PRIMARY_KEYBINDS);

    this.scene.camera.bind(this.player);

    this.ui = new UI();
    this.scene.load((result) => {
      if (result === true) {
        this.setup();
        startLoop(this.loop);
      }
    });

    this.gameServer = new GameServer(this.scene);
    this.playersHandler = this.gameServer.playersHandler;
  }

  setup() {
    new Foreground(
      this.scene,
      new Vector2(-32, -17),
      new Vector2(64, 1),
      "white"
    );

    new Foreground(
      this.scene,
      new Vector2(-16, 14),
      new Vector2(1, 32),
      "white"
    );
    new Foreground(
      this.scene,
      new Vector2(15, 14),
      new Vector2(1, 32),
      "white"
    );

    new Foreground(
      this.scene,
      new Vector2(-16, 14),
      new Vector2(32, 1),
      "white"
    );    
    new Foreground(
      this.scene,
      new Vector2(-32, -25),
      new Vector2(64, 1),
      "white"
    );
  }

  loop = (dtSec, elapsedTimeSec) => {
    this.scene.update(dtSec, elapsedTimeSec);
    this.scene.render();

    this.ui.update(dtSec, elapsedTimeSec);
  };
}
