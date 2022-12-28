/**
 * Starts an animation loop and calls callback every frame
 * @param {function(number, number)} callback loop function that is called every frame
 */
export function startLoop(callback) {
  let lastFrameElapsedTimeMillis = 0;

  function loop(elapsedTimeMillis) {
    const dtSec = (elapsedTimeMillis - lastFrameElapsedTimeMillis) / 1000;
    const elapsedTimeSec = elapsedTimeMillis / 1000;
    
    callback(dtSec, elapsedTimeSec);

    lastFrameElapsedTimeMillis = elapsedTimeMillis;
    window.requestAnimationFrame(loop);
  }

  loop(0);
}
