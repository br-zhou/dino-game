export class PlayerController {
  constructor(keybinds, player) {
    this.player = player;
    this.commands = new Set();
    this.wantsToMove = false;

    this.clickHandler = null;
    this.rightClickHandler = null;
    this.keyToCommandHash = keybinds;

    document.addEventListener("update-input", (e) => this.update(e));
  }

  update(e) {
    const details = e.detail;
    const key = details.key;
    const action = details.type;
    const command = this.keyToCommandHash[key];

    if (key == "mouse0" && action == "down" && this.clickHandler != null)
      this.clickHandler();
    
    if (key == "mouse2" && action == "down" && this.rightClickHandler != null)
      this.rightClickHandler();

    if (command == "suicide" && action == "down") {
      this.player.suicideHandler();
    }

    if (command === undefined) return;

    switch (action) {
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
    const newCommand = this.keyToCommandHash[key];
    if (newCommand == "left") {
      this.commands.delete("right");
    } else if (newCommand == "right") {
      this.commands.delete("left");
    }
  }
}
