export class UserInterface {
  constructor(scene) {
    this.scene = scene;

    this.exportMapBtn = document.getElementById("export-map-btn");
    this.exportMapBtn.onclick = this.exportMap;
  }

  exportMap = () => {
    const tileMap = this.scene.tileMap;
    const mapData = tileMap.mapData_;

    const file = new Blob([JSON.stringify(mapData)], {
      type: "application/json",
    });

    let url = window.URL.createObjectURL(file);

    let anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "map.txt";

    anchor.click();

    window.URL.revokeObjectURL(url);

    anchor.remove();
  };
}
