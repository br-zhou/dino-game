import GameServer from "./server/GameServer.js";

export class UI {
  constructor() {
    if (UI.instance instanceof UI) return UI.instance;
    else UI.instance = this;

    this.fpsCounter = document.getElementById("fps-counter");
    this.playerCounter = document.getElementById("online-players-counter");
    
    this.lastFpsValue = null;
    this.lastPlayerCountValue = null;
  }

  update(dtSec, elapsedTimeSec) {
    this.updateFPSCounter(dtSec, elapsedTimeSec);
    this.updatePlayerCount();
  }

  updateFPSCounter(dtSec, elapsedTimeSec) {
    const fps = Math.floor(1 / dtSec);
    const LOG_INTERVAL = 1;

    if (
      this.fpsLogTime_ == undefined ||
      fps < this.lowestFPS_ ||
      elapsedTimeSec - this.fpsLogTime_ > LOG_INTERVAL
    ) {
      this.updateFPSText(fps, elapsedTimeSec);
    }
  }

  updateFPSText(newFps, elapsedTimeSec) {
    this.fpsLogTime_ = elapsedTimeSec;
    this.lowestFPS_ = newFps;
    this.fpsCounter.innerText = newFps;
  }

  updatePlayerCount() {
    const server = new GameServer();
    const playerCount = Object.keys(server.players).length;
    if (playerCount === this.lastPlayerCountValue) return;
    
    this.playerCounter.innerText = `Online: ${playerCount}`;
    this.lastPlayerCountValue = playerCount;
  }
}
