require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const calculadoraRoutes = require("./Routes/CalculadoraRoutes.js");
const graficoRoutes = require("./Routes/GraficoRoutes.js");
const usuarioRoutes = require("./Routes/UsuarioRoutes.js");
const authPerfilRoutes = require("./Routes/AuthPerfilRoutes.js");

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

mongoose.connect('mongodb+srv://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '@cluster0.nhz6e.mongodb.net/?retryWrites=true&w=majority', {
  })
  .then(() => {
    console.log("Connected with MongoDB!");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao MongoDB:", error);
  });

app.use("/calculadora", calculadoraRoutes); 
app.use("/grafico", graficoRoutes);   
app.use("/usuarios", usuarioRoutes);  
app.use("/auth", authPerfilRoutes); 


app.get("/", (req, res) => {
  res.send("Welcome!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server on port:  ${PORT}`);
});
