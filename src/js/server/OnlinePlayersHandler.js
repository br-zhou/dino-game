import { Scene } from "../engine/scene.js";
import { Vector2 } from "../engine/vector2.js";
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
    this.localPlayer = this.scene.player;
    this.gameServer = gameServer;

    this.onlineEnitities = {};
    this.dataLastTick = {};
    this.firstTick = true;
  }

  addPlayer(id) {
    console.log("handler add playre", id);
    const playerData = this.gameServer.players[id];
    const newPlayer = new OnlinePlayer(this.scene, playerData.skin);
    newPlayer.position_.set(playerData.position);

    this.onlineEnitities[id] = newPlayer;
  }

  deletePlayer(id) {
    const enitity = this.onlineEnitities[id];
    this.scene.remove(enitity);
    delete this.onlineEnitities[id];
  }

  /**
   * called every tick to update online players' positions
   */
  onTick() {
    for (const id in this.onlineEnitities) {
      const newPlayerdata = this.gameServer.players[id];
      if (!newPlayerdata) return;

      const playerEntity = this.onlineEnitities[id];
      let oldPlayerData = this.dataLastTick[id];
      if (!oldPlayerData) {
        oldPlayerData = newPlayerdata;
      }

      this.movementHandler(playerEntity, newPlayerdata, oldPlayerData);

      this.stateHandler();

      this.dataLastTick[id] = newPlayerdata;
    }
  }

  movementHandler(enitity, newData, oldData) {
    enitity.position_.set(oldData.position);

    const velocity = new Vector2(
      (newData.position.x - oldData.position.x) * GameServer.TICK_RATE,
      (newData.position.y - oldData.position.y) * GameServer.TICK_RATE
    );

    enitity.rb.velocity_.set(velocity);
  }

  stateHandler() {}
}

export default OnlinePlayersHandler;
