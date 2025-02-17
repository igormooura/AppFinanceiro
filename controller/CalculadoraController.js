const Conversao = require("../model/Calculadora");
<<<<<<< HEAD

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
// Obter Historico das conversões
exports.getHistorico = async (req, res) => {
  try {
    const historico = await Conversao.find(); // Busca todas as conversões no banco
    res.status(200).json(historico); // Retorna o histórico em formato JSON
=======
const Auth = require("../model/AuthPerfil.js");
const axios = require("axios");

exports.realizarConversao = async (req, res) => {
  const { valor, moedaOrigem, moedaDestino } = req.body;
  const userId = req.params.userId;

  if (valor === undefined || typeof valor !== "number" || !moedaOrigem || !moedaDestino || !userId) {
    return res.status(400).json({
      error: "Parâmetros inválidos. Informe valor, moedaOrigem, moedaDestino e userId.",
    });
  }

  try {
    const usuarioAuth = await Auth.findById(userId);
    if (!usuarioAuth) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${moedaOrigem}`);
    const taxas = response.data.rates;

    if (!taxas[moedaDestino]) {
      return res.status(400).json({ error: "Conversão não suportada entre essas moedas." });
    }

    const taxa = taxas[moedaDestino];
    const resultado = valor * taxa;

    const novaConversao = new Conversao({
      valor,
      moedaOrigem,
      moedaDestino,
      resultado,
      user_id: userId,
    });
    await novaConversao.save();

    res.json({
      resultado: `${valor} ${moedaOrigem} = ${resultado} ${moedaDestino}`,
    });
  } catch (error) {
    console.error("Erro ao realizar conversão:", error);
    res.status(500).json({ error: "Erro ao realizar conversão." });
  }
};

exports.getHistoricoByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const historico = await Conversao.find({ user_id: userId });
    res.status(200).json(historico);
>>>>>>> cd4bd102040b77ec12d267c3155ec371acc8049e
  } catch (error) {
    console.error("Erro ao buscar histórico de conversões:", error);
    res.status(500).json({ error: "Erro ao buscar histórico de conversões." });
  }
<<<<<<< HEAD
};
=======
};

exports.adicionarHistorico = async (req, res) => {
  const { valor, moedaOrigem, moedaDestino, userId } = req.body;

  if (valor === undefined || typeof valor !== "number" || !moedaOrigem || !moedaDestino || !userId) {
    return res.status(400).json({
      error: "Parâmetros inválidos. Informe valor, moedaOrigem, moedaDestino e userId.",
    });
  }

  try {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${moedaOrigem}`);
    const taxas = response.data.rates;

    if (!taxas[moedaDestino]) {
      return res.status(400).json({ error: "Conversão não suportada entre essas moedas." });
    }

    const taxa = taxas[moedaDestino];
    const resultado = valor * taxa;

    const novaConversao = new Conversao({
      valor,
      moedaOrigem,
      moedaDestino,
      resultado,
      user_id: userId,
    });
    await novaConversao.save();

    res.status(201).json(novaConversao);
  } catch (error) {
    console.error("Erro ao adicionar histórico:", error);
    res.status(500).json({ error: "Erro ao adicionar histórico." });
  }
};
>>>>>>> cd4bd102040b77ec12d267c3155ec371acc8049e
