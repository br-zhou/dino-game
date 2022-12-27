import { Scene } from "./scene.js";

const scene = new Scene();

function animationLoop() {
  // render background
  scene.renderBackground();

  // render foreground

  // render entities

  window.requestAnimationFrame(animationLoop);
}

animationLoop();