const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nome: String,
  sobrenome: String,
  email: String,
  genero: String,
  country: String,
  cpf: String,
  telefone: String,

  graficos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grafico",
    },
  ],

  historicoConversoes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversao",
    },
  ],
});


UserSchema.path("graficos").validate(function (value) {
  return value.length <= 3;
}, "não é permitido mais que 3 gráficos.");

UserSchema.path("historicoConversoes").validate(function (value) {
  return value.length <= 5;
}, "não é permitido mais de 5 conversões");

module.exports = mongoose.model("Usuario", UserSchema);
