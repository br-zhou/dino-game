import { CanvasTools } from "./canvasTools.js";
import { Vector2 } from "./vector2.js";

export class SpriteMap {
  /**
   * 
   * @param {string} name of image
   * @param {callback} cb callback when image loads
   */
  constructor(name, cb) {
    this.tools = new CanvasTools();
    this.callback_ = cb;
    this.name_ = name;

    this.loaded = false;
    this.imgLoaded = false;
    this.dataLoaded = false;
    this.currentIndex = new Vector2();

    this.animElapsedTime = 0;
    
    this.loadImg();
    this.loadData();
  }

  async loadImg() {
    this.img_ = new Image();
    this.img_.src = `./assets/${this.name_}/map.png`;
    this.img_.onload = () => {
      this.imgLoaded = true;
      this.checkLoaded();
    } 
    this.img_.onerror = (err) => {
      this.callback_(false);
    }
  }
  
  async loadData() {
    try {
      const response = await fetch(`./assets/${this.name_}/data.json`);
      this.data = await response.json();
      this.dataLoaded = true;
      this.checkLoaded();
    } catch (err) {
      console.log(err);
      this.callback_(false);
    }
  }

  checkLoaded() {
    if(this.loaded) return true;
    
    if (this.imgLoaded && this.dataLoaded) {
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
      this.img_,
      this.currentIndex,
      this.data.spriteSize,
      position,
      this.data.gameSize
    );
  }

  update(dtSec) {

  }
}