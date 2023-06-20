export class UI {
  constructor() {
    if (UI.instance instanceof UI) {
      return UI.instance;
    }
        
    this.exportMapBtn = document.getElementById("export-map-btn");
    this.exportMapBtn.onclick = () => {
      console.log("hi")
    }

    UI.instance = this;
  }
}