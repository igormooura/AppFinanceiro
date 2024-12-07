const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  moedasNaCarteira: String,
});

module.exports = mongoose.model("Usuario", UserSchema);