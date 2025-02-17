const SobreNos = require("../model/SobreNos");

exports.getSobreNos = async (req, res) => {
  try {
    // Tenta encontrar o documento na coleção
    let sobreNos = await SobreNos.findOne();
    // Se não encontrar nenhum dado, insere o dado fixo
    if (!sobreNos) {
      sobreNos = new SobreNos({
        Criadores: "Igor Moura, Ciro Moraes, Erick Saraiva",
        descricao:
          "APP para consultar informações sobre criptomoedas, gráficos e notícias.",
        anoCriacao: 2024,
      });
      await sobreNos.save(); // Salva o documento na coleção
    }
    res.status(200).json(sobreNos); // Retorna o documento
  } catch (error) {
    console.error("Erro ao obter dados:", error);
    res.status(500).json({ error: "Erro ao obter dados sobre nós." });
  }
};
