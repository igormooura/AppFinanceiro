const mongoose = require("mongoose");

const AuthPerfilSchema = new mongoose.Schema({
  email: String,
  senha: String,
});
module.exports = mongoose.model("AuthPerfil", AuthSchema);