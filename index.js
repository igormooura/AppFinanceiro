const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Importando as rotas
const calculadoraRoutes = require("./Routes/CalculadoraRoutes.js");
const graficoRoutes = require("./Routes/GraficoRoutes.js");
const noticiaRoutes = require("./Routes/NoticiaRoutes.js");
const sobreNosRoutes = require("./Routes/SobreNosRoutes.js");
const usuarioRoutes = require("./Routes/UsuarioRoutes.js");
const authPerfilRoutes = require("./Routes/AuthPerfilRoutes.js");

// Inicializando o app Express
const app = express();

// Middleware para parsing JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitando CORS para permitir acesso de diferentes origens
app.use(cors());

// Conexão com o MongoDB
mongoose
  .connect("mongodb+srv://pc3:123@cluster0.nhz6e.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });

// Usando as rotas
app.use("/calculadora", calculadoraRoutes);  // Rota para conversão de moedas
app.use("/grafico", graficoRoutes);  // Rota para gráficos
app.use("/noticias", noticiaRoutes);  // Rota para notícias
app.use("/sobrenos", sobreNosRoutes);  // Rota para "Sobre Nós"
app.use("/usuarios", usuarioRoutes);  // Rota para usuários
app.use("/auth", authPerfilRoutes); // Rota para autenticação de perfil

// Rota de boas-vindas
app.get("/", (req, res) => {
  res.send("Bem-vindo à API de Criptomoedas!");
});

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
