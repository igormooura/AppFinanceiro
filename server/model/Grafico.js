const mongoose = require("mongoose");

const graficoSchema = new mongoose.Schema({
  moeda: { type: String, required: true },
  valor: { type: Number, required: true },
  variavel: { type: String, required: true }, 
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  
    required: true
  },
});

module.exports = mongoose.model("Grafico", graficoSchema);