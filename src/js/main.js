import { startLoop } from "./animationLoop.js";
import { Foreground } from "./foreground.js";
import { Player } from "./player.js";
import { Scene } from "./scene.js";

/**
 * Main game logic is written here
 */

const scene = new Scene();
const ground = new Foreground(scene);
const player = new Player();

const loop = (dtSec, elapsedTimeSec) => {
    // render background
    scene.render();

    // render foreground
    ground.render();
    // render entities
    player.update(dtSec);
    player.render();
}

startLoop(loop);