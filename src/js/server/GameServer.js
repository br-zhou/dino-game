import "https://cdn.socket.io/4.7.1/socket.io.min.js";
import OnlinePlayersHandler from "./OnlinePlayersHandler.js";

const SERVER_ADDRESS = "localhost:8000";
export const TICK_RATE = 32;

class GameServer {
  constructor(scene) {
    // Force Singleton
    if (GameServer.instance instanceof GameServer) return GameServer.instance;
    else GameServer.instance = this;

    this.scene = scene;
    this.playersHandler = new OnlinePlayersHandler(scene, this);

    this.players = {};

    this.socket = io(SERVER_ADDRESS, {'reconnection': false}); // !! re-enable reconnection
    
    this.socket.on("connect", () => {
      this.socketId = this.socket.id;
    });

    this.socket.on("updateOnlinePlayers", (newPlayerData) => {
      this.players = newPlayerData;
      this.playersHandler.onTick();
      // todo: update so it sets the new data instead of replacing
    });

    this.socket.on("getInitialData", ({tickRate, playerData: receivedData}) => {
      GameServer.TICK_RATE = tickRate;

      for (const id in receivedData) {
        const data = receivedData[id];
        this.players[id] = data;
        
        this.playersHandler.addPlayer(id);
      }

      setInterval(this.onTick, 1000 / GameServer.TICK_RATE);
    });

    this.socket.on("addPlayer", ({ id, data }) => {
      this.players[id] = data;
      this.playersHandler.addPlayer(id);
      console.log(`add player ${id}`);
    });

    this.socket.on("removePlayer", (id) => {
      this.playersHandler.deletePlayer(id);
      delete this.players[id];
      console.log(`removed ${id}`);
    });

    console.log("Attempting to Connect To Server...");
  }

  onTick = () => {
    const localPlayer = this.scene.localPlayer;
    if (!localPlayer) return;

    this.socket.emit("updateLocalPlayer", localPlayer.position_);
  };
}

export default GameServer;
