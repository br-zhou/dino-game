import { startLoop } from "./engine/animationLoop.js";
import { Scene } from "./engine/scene.js";
import InputHandler from "./inputHandler.js";
import { UI } from "./userInterface.js";

/**
 * Contains main game logic
 * Singleton Instance
 */
export class Editor {
  constructor() {
    if (Editor.instance instanceof Editor) return Editor.instance;

    this.scene = new Scene();
    this.inputHandler = new InputHandler(this.scene);

    this.ui = new UI();

    this.scene.load();

    this.setup();
    startLoop(this.loop);

    Editor.instance = this;
  }

  setup() {
    // nothing
  }

  loop = (dtSec, elapsedTimeSec) => {
    this.scene.render();

    this.ui.updateFPSCounter(dtSec, elapsedTimeSec);
  };
}
