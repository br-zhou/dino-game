import { CanvasTools } from "./canvasTools.js";
import { Vector2 } from "./vector2.js";

export class Sprite {
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
    this.flipped = false;
    this.size = 1;
    this.heightWidthRatio = 1;

    this.loadImg();
  }

  async loadImg() {
    this.img_ = new Image();
    this.img_.src = `./assets/${this.name_}/${this.variant_ || "sprite"}.png`;

    this.img_.onload = () => {
      this.loaded = true;
      this.generateFlippedSpriteMap();
      this.heightWidthRatio = this.img_.height / this.img_.width;
      this.sendCallback(true);
    };

    this.img_.onerror = (err) => {
      this.sendCallback(false);
    };
  }

  render(position, rotation = null) {
    if (!this.loaded) return;

    const drawFunction = rotation ? this.tools.drawSpriteRotated : this.tools.drawSprite;

    drawFunction(
      this.flipped ? this.imgR_ : this.img_,
      position,
      new Vector2(this.size, this.size * this.heightWidthRatio),
      - rotation
    );
  }

  /**
   * Generates reverse spritemap of this.img_
   * Requires both this.imgLoaded and this.dataLoaded to be true;
   */
  generateFlippedSpriteMap() {
    if (!this.loaded) throw new Error("Error generating reverse image!");

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = this.img_.width;
    canvas.height = this.img_.height;

    ctx.scale(-1, 1);

    ctx.drawImage(this.img_, -canvas.width, 0, canvas.width, canvas.height);

    const imgR = new Image();
    imgR.src = canvas.toDataURL();
    this.imgR_ = imgR;
  }

  sendCallback(...arg) {
    if (this.callback_) this.callback_(...arg);
  }
}
