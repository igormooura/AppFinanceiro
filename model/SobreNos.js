const mongoose = require("mongoose");

const SobreNosSchema = new mongoose.Schema({
  Criadores: {
    type: String,
    required: true,
    default: "Igor Moura, Ciro Moraes, Erick Saraiva",
  },
  descricao: {
    type: String,
    required: true,
    default: "APP para consultar informações sobre criptomoedas, gráficos e notícias.",
  },
  anoCriacao: {
    type: Number,
    required: true,
    default: 2024,
  },
});
module.exports = mongoose.model("SobreNos", SobreNosSchema);
