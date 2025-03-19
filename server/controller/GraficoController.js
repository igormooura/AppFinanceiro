const Grafico = require("../model/Grafico.js");
const Usuario = require("../model/Usuario.js");
const Auth = require("../model/AuthPerfil.js");
const mongoose = require("mongoose");

exports.createGrafico = async (req, res) => {
  try {
    const { moeda1, value, moeda2 } = req.body;

    const userId = req.params.userId.trim();
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID." });
    }
    if (!moeda1 || value === undefined || !moeda2 || !userId) {
      return res.status(400).json({ error: "Required fields not filled." });
    }

    const usuarioAuth = await Auth.findById(userId);
    const usuario = await Usuario.findById(usuarioAuth.usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: "User not found." });
    }

    if (usuario.graficos.length >= 4) {
      return res.status(400).json({ error: "User already has the maximum of 4 charts." });
    }

    const graficoSalvo = new Grafico({
      moeda: moeda1,
      valor: value,
      variavel: moeda2,
      user_id: usuarioAuth.usuarioId,
    });
    await graficoSalvo.save();
    usuario.graficos.push(graficoSalvo._id);
    await usuario.save();

    res.status(201).json(graficoSalvo);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error creating chart." });
  }
};

exports.getGraficoByUser = async (req, res) => {
  const user_id_old = req.params.userId;
  const usuarioAuth = await Auth.findById(user_id_old);
  const user_id = usuarioAuth.usuarioId;
  try {
    const graficoList = await Grafico.find({ user_id });
    res.status(200).json({ user_id, graficoList });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chart', error });
  }
};

exports.deleteGrafico = async (req, res) => {
  try {
    const { id, user_id_old } = req.params;

    const usuarioAuth = await Auth.findById(req.params.userId);
    if (!usuarioAuth) {
      return res.status(404).json({ error: "User not found." });
    }

    const userId = usuarioAuth.usuarioId;

    const graficoDeletado = await Grafico.findOne({ _id: id, user_id: userId });
    if (!graficoDeletado) {
      return res.status(404).json({ error: "Chart not found or does not belong to the user." });
    }

    await Grafico.findByIdAndDelete(id);

    await Usuario.findByIdAndUpdate(userId, {
      $pull: { graficos: id },
    });

    res.status(200).json({ message: "Chart successfully deleted." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error deleting chart." });
  }
};

exports.updateGrafico = async (req, res) => {
  try {
    const { id } = req.params;
    const { moeda, valor, variavel } = req.body;
    const graficoAtualizado = await Grafico.findByIdAndUpdate(
      id,
      { moeda, valor, variavel },
      { new: true }
    );
    if (!graficoAtualizado) {
      return res.status(404).json({ error: "Chart not found." });
    }
    res.status(200).json(graficoAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Error updating chart." });
  }
};

exports.getGraficoByMoeda = async (req, res) => {
  try {
    const { moeda } = req.params;
    const grafico = await Grafico.findOne({ moeda: moeda.toUpperCase() });
    if (!grafico) {
      return res.status(404).json({ error: "Chart not found for this currency." });
    }
    res.status(200).json(grafico);
  } catch (error) {
    res.status(500).json({ error: "Error fetching chart." });
  }
};
