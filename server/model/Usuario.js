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
  return value.length <= 4;
});

UserSchema.path("historicoConversoes").validate(function (value) {
  return value.length <= 5;
});

module.exports = mongoose.model("Usuario", UserSchema);
