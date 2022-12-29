export class TileMap {
  constructor() {
    this.mapData_ = null;
    this.getMap();
  }

  async getMap() {
    try {
      const response = await fetch("./assets/map.json");
      const mapJson = await response.json()
      console.log(mapJson);
    } catch (err) {
      console.log(error);
    }
  }
}