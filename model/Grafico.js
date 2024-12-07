const mongoose = require("mongoose");

const graficoSchema = new mongoose.Schema({
  moeda: { type: String, required: true },
  valor: { type: Number, required: true },
  variavel: { type: Number, required: true },
});

module.exports = mongoose.model("Grafico", graficoSchema);
