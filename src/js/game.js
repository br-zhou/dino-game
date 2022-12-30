import { startLoop } from "./animationLoop.js";
import { Player } from "./player.js";
import { Scene } from "./scene.js";

export class Game {
  constructor() {
    this.scene = new Scene();
    this.player = new Player(this.scene); 

    this.scene.load((result) => {
      if (result === true) {
        this.setup();
        startLoop(this.loop);
      }
    });
  }

  setup() {
    // this.scene.setup();
  }

  loop = (dtSec, elapsedTimeSec) => {
    this.scene.update(dtSec, elapsedTimeSec);
    this.scene.render();
  }
}