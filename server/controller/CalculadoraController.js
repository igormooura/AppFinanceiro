const Conversao = require("../model/Calculadora");
const Auth = require("../model/AuthPerfil.js");
const axios = require("axios");

exports.realizarConversao = async (req, res) => {
  const { valor, moedaOrigem, moedaDestino } = req.body;
  const userId = req.params.userId;

  if (valor === undefined || typeof valor !== "number" || !moedaOrigem || !moedaDestino || !userId) {
    return res.status(400).json({
      error: "Invalid parameters. Provide value, source currency, destination currency, and userId.",
    });
  }

  try {
    const usuarioAuth = await Auth.findById(userId);
    if (!usuarioAuth) {
      return res.status(404).json({ error: "User not found." });
    }

    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${moedaOrigem}`);
    const taxas = response.data.rates;

    if (!taxas[moedaDestino]) {
      return res.status(400).json({ error: "Conversion not supported between these currencies." });
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
    
  } catch (error) {
    res.status(500).json({ error: "Error performing conversion." });
  }
};

exports.getHistoricoByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const historico = await Conversao.find({ user_id: userId });
    res.status(200).json(historico);
  } catch (error) {
    console.error("Error fetching conversion history:", error);
    res.status(500).json({ error: "Error fetching conversion history." });
  }
};

exports.adicionarHistorico = async (req, res) => {
  const { valor, moedaOrigem, moedaDestino, userId } = req.body;

  if (valor === undefined || typeof valor !== "number" || !moedaOrigem || !moedaDestino || !userId) {
    return res.status(400).json({
      error: "Invalid parameters. Provide value, source currency, destination currency, and userId.",
    });
  }

  try {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${moedaOrigem}`);
    const taxas = response.data.rates;

    if (!taxas[moedaDestino]) {
      return res.status(400).json({ error: "Conversion not supported between these currencies." });
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
    res.status(500).json({ error: "Error adding history." });
  }
};
