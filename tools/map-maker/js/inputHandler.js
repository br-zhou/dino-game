import { CanvasTools } from "./engine/canvasTools.js";
import { Vector2 } from "./engine/vector2.js";

export default class InputHandler {
  constructor(scene) {
    this.scene = scene;
    this.camera = scene.camera_;
    this.camDragData = null;
    this.mousePos = new Vector2();

    document.addEventListener("keydown", this.onKeyDown, false);
    document.body.onmousedown = this.onMouseDown;
    document.body.onmouseup = this.onMouseUp;
    document.addEventListener("mousemove", this.onMouseMove);
  }

  onKeyDown = (e) => {
    if (e.repeat) return;
  };

  onMouseDown = (e) => {
    const btn = e.button;
    if (btn === 2) {
      this.camDragData = {
        initMousePos: Vector2.copy(this.mousePos),
        initCamPos: Vector2.copy(this.camera.position_),
      };
      console.log(this.camera.position_);
    }
  };

  onMouseUp = (e) => {
    const btn = e.button;
    if (btn === 2) {
      this.camDragData = null;
    }
  };

  onMouseMove = (e) => {
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY;

    if (this.camDragData) {
      this.handleCameraDrag();
    }
  };

  handleCameraDrag = (e) => {
    const fov = this.camera.fov_;
    const tools = new CanvasTools();
    const dMouse = Vector2.subtract(this.mousePos, this.camDragData.initMousePos);
    
    console.log(tools.screenToWorld(this.mousePos));

  };
}
