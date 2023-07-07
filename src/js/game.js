import { startLoop } from "./engine/animationLoop.js";
import { Foreground } from "./foreground.js";
import { Player } from "./player.js";
import { Scene } from "./engine/scene.js";
import { UI } from "./userInterface.js";
import { Vector2 } from "./engine/vector2.js";
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
    this.player.position_.set(new Vector2(-5, 0))

    this.player2 = new Player(this.scene, 2);
    this.player2.bindControls(SECONDARY_KEYBINDS);
    this.player2.position_.set(new Vector2(5, 0))

    this.scene.camera.bind(this.player);

    this.ui = new UI();
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

    this.ui.updateFPSCounter(dtSec, elapsedTimeSec);
  };
}
