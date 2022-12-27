import { Canvas } from "./canvas.js";

const canvas = new Canvas();

function animationLoop() {
  window.requestAnimationFrame(animationLoop);
  console.log(window.innerWidth, window.innerHeight);
}

animationLoop();