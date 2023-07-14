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

    this.state = "brush";

    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("mousedown", this.onMouseDown);
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("mousemove", this.onMouseMove);
  }

  onScroll = (e) => {
    const direction = Math.sign(e.wheelDelta);
  };

  onKeyDown = (e) => {
    if (e.repeat) return;
    const key = e.key.toLowerCase();

    switch (key) {
      case "e":
        this.state = "eraser";
        break;
      case "b":
        this.state = "brush";
        break;
      default:
        break;
    }
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
    if (!this.isPaintable(this.mouseGridIndex)) return;

    const tileData = this.tileMap.mapData_.tileData;
    switch (this.state) {
      case "brush":
        this.paint(tileData);
        break;
      case "eraser":
        this.erase(tileData);
        break;
    }
  }

  paint(tileData) {
    if (!tileData[this.mouseGridIndex.x]) tileData[this.mouseGridIndex.x] = {};
    tileData[this.mouseGridIndex.x][this.mouseGridIndex.y] = 1;
  }

  erase(tileData) {
    if (
      tileData[this.mouseGridIndex.x] &&
      tileData[this.mouseGridIndex.x][this.mouseGridIndex.y]
    ) {
      delete tileData[this.mouseGridIndex.x][this.mouseGridIndex.y];

      if (Object.keys(tileData[this.mouseGridIndex.x]).length === 0) {
        delete tileData[this.mouseGridIndex.x];
      }
    }
  }

  isPaintable(gridIndex) {
    const mapData = this.tileMap.mapData_;
    return (
      !(gridIndex.x < 0) &&
      !(gridIndex.y < 0) &&
      gridIndex.x < mapData.width &&
      gridIndex.y < mapData.height
    );
  }

  render = () => {
    const tileEntity = this.tileMap.tileIndexToEntity(this.mouseGridIndex);

    const paintable = this.isPaintable(this.mouseGridIndex);
    const brushRenderFunc = paintable
      ? this.tools.drawRectOutline
      : this.tools.drawRect;
    brushRenderFunc(
      tileEntity.position_,
      tileEntity.size_.x,
      tileEntity.size_.y,
      paintable ? "#FFFFFF" : "rgba(255,0,0,0.5)"
    );
  };
}
