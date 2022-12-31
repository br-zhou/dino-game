/**
 * Stores the keys being pressed at any time
 * Singleton Class
 */
class Input {
  constructor() {
    if (Input.instance instanceof Input) return Input.instance;

    document.addEventListener("keydown", (e) => this.onKeyDown(e), false);
    document.addEventListener("keyup", (e) => this.onKeyUp(e), false);
    document.body.onmousedown = (e) => this.onMouseDown(e);
    document.body.onmouseup = (e) => this.onMouseUp(e);
    this.activeKeys = new Set();
    Input.instance = this;
  }

  onKeyDown = (e) => {
    if (e.repeat) return;
  
    const key = e.key.toLowerCase();
  
    this.activeKeys.add(key);
  }

  onKeyUp = (e) => {
    const key = e.key.toLowerCase();

    this.activeKeys.delete(key);
  }

  onMouseDown = (e) => {
    this.activeKeys.add("mouse" + e.button);
  }

  onMouseUp = (e) => {
    this.activeKeys.delete("mouse" + e.button);
  }
}

export const INPUT = new Input();