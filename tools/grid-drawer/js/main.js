const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Settings
canvas.width = 1500;
canvas.height = 800;
const gridSize = 50;

let mapJson = {};

// Draw random squares
ctx.fillStyle = "#000000";
for (let i = 0; i < canvas.width; i += gridSize) {
  mapJson[i / gridSize] = {};
  for (let j = 0; j < canvas.height; j += gridSize) {
    if (Math.random() < 1 / 3) {
      ctx.fillRect(
        i,j,
        gridSize, gridSize
      );
      mapJson[i / gridSize][j / gridSize] = 1;
    }
  }
}

// Download map
const saveBtn = document.getElementById("save-btn");
saveBtn.onclick = () => {
  const file = new Blob(
    [JSON.stringify(mapJson)],
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