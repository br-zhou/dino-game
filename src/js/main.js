import { Foreground } from "./foreground.js";
import { Player } from "./player.js";
import { Scene } from "./scene.js";

const scene = new Scene();
const ground = new Foreground(scene);
const player = new Player();

let lastFrameElapsedTimeMillis = 0;

function animationLoop(elapsedTimeMillis = 0) {
  const dtMillis = elapsedTimeMillis - lastFrameElapsedTimeMillis;
  const dtSec = dtMillis / 1000;

  // render background
  scene.renderBackground();

  // render foreground
  ground.render();
  // render entities
  player.update(dtSec);
  player.render();

  lastFrameElapsedTimeMillis = elapsedTimeMillis;
  window.requestAnimationFrame(animationLoop);
}

animationLoop(0);