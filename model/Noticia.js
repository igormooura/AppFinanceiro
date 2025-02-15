const mongoose = require("mongoose");

const NoticiaSchemas = new mongoose.Schema({
  titulo: String,
  descr: String,
  data: String
});
module.exports = mongoose.model("Noticia", NoticiaSchemas);
