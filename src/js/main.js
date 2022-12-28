import { Foreground } from "./foreground.js";
import { Player } from "./player.js";
import { Scene } from "./scene.js";

const scene = new Scene();
const ground = new Foreground(scene);
const player = new Player();

function animationLoop() {
  // render background
  scene.renderBackground();

  // render foreground
  ground.render();
  // render entities
  player.update(0);
  player.render();

  window.requestAnimationFrame(animationLoop);
}

animationLoop();