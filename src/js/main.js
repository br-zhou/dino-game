import { Foreground } from "./foreground.js";
import { Player } from "./player.js";
import { Scene } from "./scene.js";

const scene = new Scene();
const ground = new Foreground(scene);
const player = new Player();

function timeNow() {
	return ( typeof performance === 'undefined' ? Date : performance ).now();
}

let lastFrameRunTimeMillis = 0;

function animationLoop(runTimeMillis = 0) {
  const dtMillis = runTimeMillis - lastFrameRunTimeMillis;
  const dtSec = dtMillis / 1000;

  // render background
  scene.renderBackground();

  // render foreground
  ground.render();
  // render entities
  player.update(dtSec);
  player.render();

  lastFrameRunTimeMillis = runTimeMillis;
  window.requestAnimationFrame(animationLoop);
}

animationLoop();