const Conversao = require("../model/Calculadora");

exports.realizarConversao = async (req, res) => {
  const { valor, moedaOrigem, moedaDestino } = req.body;
  if (valor === undefined || typeof valor !== "number" || !moedaOrigem || !moedaDestino) {
    return res.status(400).json({
      error: "Parâmetros inválidos. Informe valor, moedaOrigem e moedaDestino.",
    });
  }

  // Tabelas de conversão
  const taxasConversao = {
    EUR: { BRL: 5.4 },
    USD: { BRL: 5.0 },
    BRL: { EUR: 0.18, USD: 0.2 },
  };

  // Verificação de taxa de conversão
  if (taxasConversao[moedaOrigem] && taxasConversao[moedaOrigem][moedaDestino]) {
    const taxa = taxasConversao[moedaOrigem][moedaDestino];
    const resultado = valor * taxa;

    // Armazenar a conversão realizada no banco de dados
    try {
      const novaConversao = new Conversao({
        valor,
        moedaOrigem,
        moedaDestino,
        resultado,
      });
      await novaConversao.save();

      // Retornar o resultado da conversão
      res.json({
        resultado: `${valor} ${moedaOrigem} = ${resultado} ${moedaDestino}`,
      });
    } catch (error) {
      res.status(500).json({ error: "Erro ao salvar conversão no banco de dados." });
    }
  } else {
    res.status(400).json({ error: "Conversão não suportada entre essas moedas" });
  }
};