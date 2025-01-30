const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nome: String,
  sobrenome: String,
  email: String,
  genero: String,
  country: String
});
module.exports = mongoose.model("Usuario", UserSchema);