const mongoose = require("mongoose");

const AuthPerfilSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }
});

module.exports = mongoose.model("AuthPerfil", AuthPerfilSchema);