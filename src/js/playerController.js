import { INPUT } from "./input.js";

export class PlayerController {
  constructor(player) {
    this.player_ = player;
    this.commands = new Set();

    this.keyToCommandHash = {
      "w": "up",
      "a": "left",
      "s": "down",
      "d": "right"
    }

    document.addEventListener("update-input", (e) => this.update(e));
  }

  update(e) {
    const details = e.detail;
    const key = details.key;
    const type = details.type;

    if (this.keyToCommandHash[key] === undefined) return;

    switch(type) {
      case "up":
        this.commands.delete(this.keyToCommandHash[key]);
        break;
      case "down":
        this.commands.add(this.keyToCommandHash[key]);
        this.handleEdgeCases(key);
        break;
      default:
        break;
    }

    console.log(this.commands)
  }

  handleEdgeCases(key) {
    const newCommand = this.keyToCommandHash[key]
    if (newCommand == "left") {
      this.commands.delete("right");
    } else if (newCommand == "right") {
      this.commands.delete("left");
    }
  }
}