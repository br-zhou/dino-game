import "https://cdn.socket.io/4.7.1/socket.io.min.js";
import OnlinePlayersHandler from "./OnlinePlayersHandler.js";

const SERVER_ADDRESS = "localhost:8000";
export const TICK_RATE = 5;

class GameServer {
  constructor(scene) {
    // Force Singleton
    if (GameServer.instance instanceof GameServer) return GameServer.instance;
    else GameServer.instance = this;

    this.scene = scene;
    this.playersHandler = new OnlinePlayersHandler(scene, this);

    this.players = {};

    this.socket = io(SERVER_ADDRESS);

    this.socket.on("connect", () => {
      this.socketId = this.socket.id;
      console.log(this.socketId);
      setInterval(this.onTick, 1000 / TICK_RATE);
    });

    this.socket.on("updatePlayerData", (newPlayerData) => {
      this.players = newPlayerData;
      // todo: update so it sets the new data instead of replacing
    });

    this.socket.on("getInitialPlayers", (players) => {
      for (const id in players) {
        const data = players[id];
        this.players[id] = data;

        // if (id != this.socket.id)
        this.playersHandler.addPlayer(id);
      }
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

    this.socket.emit("updatePlayer", localPlayer.position_);
  };
}

export default GameServer;
