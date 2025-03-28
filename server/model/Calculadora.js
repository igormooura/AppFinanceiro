const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const conversaoSchema = new Schema({
  valor: {
    type: Number,
    required: true,
  },
  moedaOrigem: {
    type: String,
    required: true,
  },
  moedaDestino: {
    type: String,
    required: true,
  },
  resultado: {
    type: Number,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = model("Conversao", conversaoSchema);
