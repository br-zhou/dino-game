/**
 * 2d canvas for game
 */
export class Canvas {
  constructor() {
    console.log("HI")
    this.canvas_ = document.querySelector('canvas');
    this.context_ = this.canvas_.getContext('2d');

    this.setEventsListeners_();
    this.resizeCanvas_();

    console.log(this.canvas_)
  }

  /**
   * Creates event listeners that class needs.
   */
  setEventsListeners_() {
    window.addEventListener(
      "resize",
      () => {
        this.resizeCanvas_();
      },
      false
    );
  }

  /**
   * Sets the width and height of canvas to window's.
   */
  resizeCanvas_() {
    this.canvas_.width = window.innerWidth;
    this.canvas_.height = window.innerHeight;

    // clears canvas
    this.context_.fillStyle = "black";
    this.context_.fillRect(0,0, this.canvas_.width, this.canvas_.height);
  }

  getContext() {
    return this.context_;
  }

  get width() {
    return this.canvas_.width;
  }

  get height() {
    return this.canvas_.height;
  }
}