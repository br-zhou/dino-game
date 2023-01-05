import { startLoop } from "./animationLoop.js";
import { Player } from "./player.js";
import { Scene } from "./scene.js";

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
  }

  setup() {
    // nothing
  }

  loop = (dtSec, elapsedTimeSec) => {
    this.scene.update(dtSec, elapsedTimeSec);
    this.scene.render();
  }
}