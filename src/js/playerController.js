export class PlayerController {
  constructor(player) {
    this.player_ = player;
    this.commands = new Set();
    this.wantsToMove = false;

    this.keyToCommandHash = {
      "w": "up",
      "a": "left",
      "s": "down",
      "d": "right"
    }

    this.clickCB = null;

    document.addEventListener("update-input", (e) => this.update(e));
  }

  update(e) {
    const details = e.detail;
    const key = details.key;
    const type = details.type;

    if (key == "mouse0" && type == "down" && this.clickCB != null) this.clickCB();

    if (this.keyToCommandHash[key] === undefined) return;

    switch(type) {
      case "up":
        this.commands.delete(this.keyToCommandHash[key]);
        break;
      case "down":
        this.commands.add(this.keyToCommandHash[key]);
        this.handleEdgeCasesDown(key);
        break;
      default:
        break;
    }

    


    this.wantsToMove = this.commands.has("left") | this.commands.has("right");
  }

  handleEdgeCasesDown(key) {
    const newCommand = this.keyToCommandHash[key]
    if (newCommand == "left") {
      this.commands.delete("right");
    } else if (newCommand == "right") {
      this.commands.delete("left");
    }
  }
}