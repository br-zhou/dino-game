export class TileMap {
  constructor() {
    this.mapData_ = null;
    this.getMap();
  }

  * getMap() {
    fetch("./assets/map.json")
    .then((response) => response.json()) // converts response to json obj
    .then((mapData) => {
      console.log(mapData);
    });
  }
}