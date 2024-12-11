const mongoose = require("mongoose");

const NoticiaSchemas = new mongoose.Schema({
  titulo: String,
  data: String
});
module.exports = mongoose.model("Noticia", NoticiaSchemas);
