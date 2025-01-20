const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  email: String,
  senha: String,
});
module.exports = mongoose.model("Auth", AuthSchema);