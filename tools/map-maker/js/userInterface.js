export class UserInterface {
  constructor(scene) {
    this.scene = scene;

    this.exportMapBtn = document.getElementById("export-map-btn");
    this.exportMapBtn.onclick = this.exportMap;

    this.importMapBtn = document.getElementById("import-map-btn");
    this.importMapBtn.onclick = this.importMap;
  }

  importMap = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.id = "map-upload";

    fileInput.click();

    fileInput.onchange = () => {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        const data = fileReader.result;

        this.parseMapData(data);
        fileInput.remove();
      };

      fileReader.readAsText(fileInput.files[0]);
    };
  };

  parseMapData = (data) => {
    try {
      const dataObj = JSON.parse(data);
      const tileMap = this.scene.tileMap;

      tileMap.mapData_ = dataObj;
    } catch (e) {
      alert("An Error Occured.");
    }
  };

  exportMap = () => {
    const tileMap = this.scene.tileMap;
    const mapData = tileMap.mapData_;

    const file = new Blob([JSON.stringify(mapData)], {
      type: "application/json",
    });

    let url = window.URL.createObjectURL(file);

    let anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "map.json";

    anchor.click();

    window.URL.revokeObjectURL(url);

    anchor.remove();
  };
}
