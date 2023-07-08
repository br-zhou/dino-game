import { Scene } from "../engine/scene.js";
import GameServer from "./GameServer.js";
import { OnlinePlayer } from "./onlinePlayer.js";

class OnlinePlayersHandler {
  /**
   *
   * @param {Scene} scene
   * @param {GameServer} gameServer
   */
  constructor(scene, gameServer) {
    this.scene = scene;
    this.gameServer = gameServer;

    this.onlinePlayers = {};
  }

  addPlayer(id) {
    console.log("handler add playre", id);
    const playerData = this.gameServer.players[id];
    const newPlayer = new OnlinePlayer(this.scene, playerData.skin);
    newPlayer.position_.set(playerData.position);

    this.onlinePlayers[id] = newPlayer;
  }

  deletePlayer(id) {
    const enitity = this.onlinePlayers[id];
    this.scene.remove(enitity);
  }

  update() {
    for (const id in this.onlinePlayers) {
      // todo: update to match real position
    }
  }
}

export default OnlinePlayersHandler;