const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("<h1>🌍 Bem-vindo à OneWorld</h1><p>A rede social que vai mudar o mundo!</p>");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
