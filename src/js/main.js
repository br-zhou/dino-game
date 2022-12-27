import { Foreground } from "./foreground.js";
import { Scene } from "./scene.js";

const scene = new Scene();
const ground = new Foreground(scene);

function animationLoop() {
  // render background
  scene.renderBackground();

  // render foreground
  ground.render();
  // render entities

  window.requestAnimationFrame(animationLoop);
}

animationLoop();