express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");

// Ativar variáveis de ambiente (.env)
dotenv.config();

// Criar aplicação Express
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // Permitir conexões de qualquer lugar
});

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch(err => console.log("❌ Erro no MongoDB:", err));

// Rotas da API
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/chat", require("./routes/chat"));

// Chat em tempo real (Socket.io)
io.on("connection", (socket) => {
  console.log("📡 Usuário conectado:", socket.id);

  socket.on("send_message", (data) => {
    io.emit("receive_message", data); // envia mensagem para todos
  });

  socket.on("disconnect", () => {
    console.log("❌ Usuário desconectado:", socket.id);
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`"name": "oneworld-backend",
  "version": "1.0.0",
  "description": "Backend da rede social OneWorld",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "axios": "^1.6.2",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.0.3",
    "socket.io": "^4.7.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
sua_conexao_mongodb_aqui
OPENAI_API_KEY=sua_chave_openai_aqui
JWT_SECRET=um_segredo_bem_forte_aqui
PORT=5000
