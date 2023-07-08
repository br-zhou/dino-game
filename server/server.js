const { createServer } = require("http");
const { Server } = require("socket.io");

const PORT = 8000;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

class GameState {
  constructor() {
    this.players = {};
  }

  addPlayer(socketId) {
    this.players[socketId] = {
      position: { x:  Math.random() * 10, y: Math.random() * 10 },
      skin: "3",
    };
    console.log(`${socketId} added!`);
  }

  removePlayer(socketId) {
    delete this.players[socketId];
    console.log(`${socketId} removed!`);
  }
}

const game = new GameState();

io.on("connection", (socket) => {
  const id = socket.id;
  game.addPlayer(id);

  // Broadcast Event
  socket.broadcast.emit('addPlayer', {id, data: game.players[id]});

  socket.emit("getInitialPlayers", game.players);

  socket.on("disconnect", (reason) => {
    game.removePlayer(id);
    io.emit('removePlayer', id);
  });

  console.log(game.players)
});

httpServer.listen(PORT);
console.log("server initialized!");
