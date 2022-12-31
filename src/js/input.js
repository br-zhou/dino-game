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
    
    this.dispatchNewInputEvent(key, "down");
  }

  onKeyUp = (e) => {
    const key = e.key.toLowerCase();

    this.activeKeys.delete(key);

    this.dispatchNewInputEvent(key, "up");
  }

  onMouseDown = (e) => {
    const mouseButton = "mouse" + e.button;
    this.activeKeys.add(mouseButton);

    this.dispatchNewInputEvent(mouseButton, "down");
  }

  onMouseUp = (e) => {
    const mouseButton = "mouse" + e.button;
    this.activeKeys.delete(mouseButton);

    this.dispatchNewInputEvent(mouseButton, "up");
  }

  /**
   * dispatches custom event detailing 
   * @param {string} key key being updated (lowercase)
   * @param {string} type description of event type (down or up)
   */
  dispatchNewInputEvent(key, type) {
    const event = new CustomEvent("update-input", {
      detail: {
        key: key,
        type: type
      }
    });

    document.dispatchEvent(event);
  }
}

export const INPUT = new Input();