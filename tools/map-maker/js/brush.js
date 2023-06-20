import { CanvasTools } from "./engine/canvasTools.js";
import { Vector2 } from "./engine/vector2.js";

export default class Brush {
  constructor(scene) {
    this.scene = scene;
    this.camera = scene.camera_;
    this.mousePos = new Vector2();
    this.tools = new CanvasTools();
    this.tileMap = scene.tileMap;

    document.addEventListener("keydown", this.onKeyDown, false);
    document.addEventListener("mousedown", this.onMouseDown);
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("mousemove", this.onMouseMove);
  }

  onScroll = (e) => {
    const direction = Math.sign(e.wheelDelta);
  };

  onKeyDown = (e) => {
    if (e.repeat) return;
  };

  onMouseDown = (e) => {
    const btn = e.button;
  };

  onMouseUp = (e) => {
    const btn = e.button;
    console.log(btn);
  };

  onMouseMove = (e) => {
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY;
  };

  update() {
    
  }

  render() {
    const mouseWorldPos = this.tools.screenToWorld(this.mousePos);
    const gridIndex = this.tileMap.positionToGridIndex(mouseWorldPos);
    const tileEntity = this.tileMap.tileIndexToEntity(gridIndex);

    this.tools.drawRectOutline(tileEntity.position_, tileEntity.size_.x, tileEntity.size_.y, "#FFFFFF")

  }
}