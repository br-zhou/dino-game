import { CanvasTools } from "./engine/canvasTools.js";
import { Vector2 } from "./engine/vector2.js";

export default class Brush {
  constructor(scene) {
    this.scene = scene;
    this.camera = scene.camera_;
    this.mousePos = new Vector2();
    this.tools = new CanvasTools();
    this.tileMap = scene.tileMap;
    this.mouseDrag = false;
    this.mouseWorldPos = null;
    this.mouseGridIndex = null;

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
    if (btn === 0) this.mouseDrag = true;
  };

  onMouseUp = (e) => {
    const btn = e.button;
    if (btn === 0) this.mouseDrag = false;
  };

  onMouseMove = (e) => {
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY;
  };

  update() {
    this.mouseWorldPos = this.tools.screenToWorld(this.mousePos);
    this.mouseGridIndex = this.tileMap.positionToGridIndex(this.mouseWorldPos);
    this.render();

    if (this.mouseDrag) this.handlePainting();
  }

  handlePainting() {
    const tileData = this.tileMap.mapData_.tileData;
    if (!this.isPaintable(this.mouseGridIndex)) return;

    if (!tileData[this.mouseGridIndex.x]) tileData[this.mouseGridIndex.x] = {};
    tileData[this.mouseGridIndex.x][this.mouseGridIndex.y] = 1;
    console.log(this.mouseGridIndex);
  }

  isPaintable(gridIndex) {
    const mapData = this.tileMap.mapData_;
    return !(gridIndex.x < 0) &&
      !(gridIndex.y < 0) &&
      gridIndex.x < mapData.width &&
      gridIndex.y < mapData.height;
  }

  render() {
    const tileEntity = this.tileMap.tileIndexToEntity(this.mouseGridIndex);

    this.tools.drawRectOutline(
      tileEntity.position_,
      tileEntity.size_.x,
      tileEntity.size_.y,
      "#FFFFFF"
    );
  }
}
