const SobreNos = require("../model/SobreNos");

exports.getSobreNos = async (req, res) => {
  try {

    let sobreNos = await SobreNos.findOne();

    if (!sobreNos) {
      sobreNos = new SobreNos({
        Criadores: "Igor Moura, Ciro Moraes, Erick Saraiva",
        descricao:
          "APP para consultar informações sobre criptomoedas, gráficos e notícias.",
        anoCriacao: 2024,
      });
      await sobreNos.save(); 
    }
    res.status(200).json(sobreNos); 
  } catch (error) {
    console.error("Erro ao obter dados:", error);
    res.status(500).json({ error: "Erro ao obter dados sobre nós." });
  }
};
