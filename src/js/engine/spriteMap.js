import { CanvasTools } from "./canvasTools.js";
import { Vector2 } from "./vector2.js";

export class SpriteMap {
  /**
   *
   * @param {string} name of image
   * @param {callback} cb callback when image loads
   */
  constructor({ name, variant }, cb) {
    this.tools = new CanvasTools();
    this.callback_ = cb;
    this.name_ = name;
    this.variant_ = variant;
    this.loaded = false;
    this.state = null;
    this.flipped = false;
    this.imgLoaded = false;
    this.dataLoaded = false;
    this.currentIndex = new Vector2();

    this.animElapsedTime = 0;
    this.frameDuration = 0;

    this.loadImg();
    this.loadData();
  }

  async loadImg() {
    this.img_ = new Image();
    this.img_.src = `./assets/${this.name_}/${this.variant_ || "map"}.png`;

    this.img_.onload = () => {
      this.imgLoaded = true;
      this.checkLoaded();
    };

    this.img_.onerror = (err) => {
      this.callback_(false);
    };
  }

  async loadData() {
    try {
      const response = await fetch(`./assets/${this.name_}/data.json`);
      this.data = await response.json();
      this.dataLoaded = true;
      this.frameDuration = this.data.frameDuration;
      this.checkLoaded();
    } catch (err) {
      console.log(err);
      this.callback_(false);
    }
  }

  async checkLoaded() {
    if (this.loaded) return true;

    if (this.imgLoaded && this.dataLoaded) {
      this.generateFlippedSpriteMap();
      this.loaded = true;
      this.callback_(true);
      return true;
    } else {
      return false;
    }
  }

  render(position) {
    if (!this.loaded) return;
    this.tools.drawSpriteMap(
      this.flipped ? this.imgR_ : this.img_,
      this.currentIndex,
      this.data.tileSize,
      position,
      this.data.gameSize
    );
  }

  update(dtSec) {
    if (!this.loaded) return;

    this.animElapsedTime += dtSec;

    const calculatedIndex = Vector2.copy(this.data.states[this.state].start);
    const maxFrames = this.data.states[this.state].length;
    const offset = Math.floor(this.animElapsedTime / (this.frameDuration / 60));

    calculatedIndex.x += offset % maxFrames;
    this.currentIndex = calculatedIndex;
  }

  /**
   * Sets sprite to first frame of state. Assumes state is valid.
   * @param {String} name of state
   */
  gotoState(name) {
    if (!this.loaded) return;
    if (this.state == name) return;

    const index = this.data.states[name].start;
    this.state = name;
    this.currentIndex = index;
    this.animElapsedTime = 0;
  }

  /**
   * Generates reverse spritemap of this.img_
   * Requires both this.imgLoaded and this.dataLoaded to be true;
   */
  generateFlippedSpriteMap() {
    if (!this.dataLoaded || !this.imgLoaded)
      throw new Error("Error generating reverse image!");

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const tileSize = this.data.tileSize;

    canvas.width = this.img_.width;
    canvas.height = this.img_.height;

    ctx.scale(-1, 1);

    // this loops draws every tile but flipped
    for (let i = 0; i < this.img_.width / tileSize.x; i++) {
      for (let j = 0; j < this.img_.height / tileSize.y; j++) {
        ctx.drawImage(
          this.img_,
          i * tileSize.x,
          j * tileSize.y,
          tileSize.x,
          tileSize.y,
          -tileSize.x * (i + 1),
          tileSize.y * j,
          tileSize.x,
          tileSize.y
        );
      }
    }

    const imgR = new Image();
    imgR.src = canvas.toDataURL();
    this.imgR_ = imgR;
  }
}
