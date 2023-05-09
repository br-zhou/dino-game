export class UI {
  constructor() {
    if (UI.instance instanceof UI) {
      return UI.instance;
    }

    this.fpsCounter = document.getElementById("fps-counter");

    UI.instance = this;
  }

  
  updateFPSCounter(dtSec, elapsedTimeSec) {
    const fps =  Math.floor(1/dtSec);
    const LOG_INTERVAL = 0.15;

    if (this.fpsLogTime_ == undefined || fps < this.lowestFPS_ || elapsedTimeSec - this.fpsLogTime_ > LOG_INTERVAL) {
      this.updateFPSText(fps, elapsedTimeSec);
    }
  }

  updateFPSText(newFps, elapsedTimeSec) {
    this.fpsLogTime_ = elapsedTimeSec;
    this.lowestFPS_ = newFps;
    this.fpsCounter.innerText = newFps;
  }
}