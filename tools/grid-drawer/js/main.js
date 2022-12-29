const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Settings

const gridSize = 50;
const mapWidth = 32;
const mapHeight = 16;

canvas.width = gridSize * mapWidth;
canvas.height = gridSize * mapHeight;

let tileData = {};

const getFullMapObj = () => {
  return {
    "name": "test map",
    "width": mapWidth,
    "height": mapHeight,
    "tileData": tileData
  }
}

// Draw random squares
ctx.fillStyle = "#000000";
for (let i = 0; i < canvas.width; i += gridSize) {
  tileData[i / gridSize] = {};
  for (let j = 0; j < canvas.height; j += gridSize) {
    if (Math.random() < 1 / 3) {
      ctx.fillRect(
        i,j,
        gridSize, gridSize
      );
      tileData[i / gridSize][j / gridSize] = 1;
    }
  }
}

// Download map
const saveBtn = document.getElementById("save-btn");
saveBtn.onclick = () => {
  const file = new Blob(
    [JSON.stringify(getFullMapObj())],
    {type: "application/json"}
  );
    
  let url = window.URL.createObjectURL(file);

  let anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "map.json";

  anchor.click();

  window.URL.revokeObjectURL(url);
  document.removeChild(anchor);
}