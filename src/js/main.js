import { startLoop } from "./animationLoop.js";
import { Foreground } from "./foreground.js";
import { Player } from "./player.js";
import { Scene } from "./scene.js";

/**
 * Main game logic is written here
 */

const scene = new Scene();
const player = new Player();

scene.add(player);

const loop = (dtSec, elapsedTimeSec) => {
    scene.update(dtSec, elapsedTimeSec);
    scene.render();
}

startLoop(loop);