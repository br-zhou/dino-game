const { createServer } = require("http");
const { Server } = require("socket.io");

const PORT = 8000;
const TICK_RATE = 32;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
  pingInterval: 2000,
  pingTimeout: 5000,
});

class GameState {
  constructor() {
    this.players = {};
  }

  addPlayer(socketId) {
    this.players[socketId] = {
      position: { x: 0, y: 0 },
      skin: "3",
    };
    console.log(`${socketId} added!`);
  }

  updatePlayerdata(id, newData) {
    this.players[id].position.x = newData.x;
    this.players[id].position.y = newData.y;
  }

  removePlayer(socketId) {
    delete this.players[socketId];
    console.log(`${socketId} removed!`);
  }
}

const game = new GameState();

const onTick = () => {
  io.emit("updateOnlinePlayers", game.players);
};

setInterval(onTick, 1000 / TICK_RATE);

io.on("connection", (socket) => {
  const id = socket.id;
  game.addPlayer(id);

  // Broadcast Event
  socket.broadcast.emit("addPlayer", { id, data: game.players[id] });

  socket.emit("getInitialData", {
    tickRate: TICK_RATE,
    playerData: game.players,
  });

  socket.on("disconnect", (reason) => {
    game.removePlayer(id);
    io.emit("removePlayer", id);
  });

  socket.on("updateLocalPlayer", (data) => {
    game.updatePlayerdata(id, data);
  });

  console.log(game.players);
});

httpServer.listen(PORT);
console.log("server initialized!");
