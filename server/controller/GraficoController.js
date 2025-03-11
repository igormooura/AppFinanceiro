const Grafico = require("../model/Grafico.js");
const Usuario = require("../model/Usuario.js");
const Auth = require("../model/AuthPerfil.js");
const mongoose = require("mongoose");

exports.createGrafico = async (req, res) => {
  try {
    const { moeda1, value, moeda2 } = req.body;

    const userId = req.params.userId.trim();
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "ID de usuário inválido." });
    }
    if (!moeda1 || value === undefined || !moeda2 || !userId) {
      return res.status(400).json({ error: "Campos obrigatórios não preenchidos." });
    }


    const usuarioAuth = await Auth.findById(userId);;
    const usuario = await Usuario.findById(usuarioAuth.usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    if (usuario.graficos.length >= 4) {
      return res.status(400).json({ error: "Usuário já possui o máximo de 4 gráficos." });
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
    res.status(500).json({ error: "Erro ao criar gráfico." });
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
    res.status(500).json({ message: 'Error fetching grafico', error });
  }
};

exports.deleteGrafico = async (req, res) => {
  try {
    const { id, user_id_old } = req.params;

    const usuarioAuth = await Auth.findById(req.params.userId);
    if (!usuarioAuth) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const userId = usuarioAuth.usuarioId;
 
    const graficoDeletado = await Grafico.findOne({ _id: id, user_id: userId });
    if (!graficoDeletado) {
      return res.status(404).json({ error: "Gráfico não encontrado ou não pertence ao usuário." });
    }

    await Grafico.findByIdAndDelete(id);

    await Usuario.findByIdAndUpdate(userId, {
      $pull: { graficos: id },
    });

    res.status(200).json({ message: "Gráfico deletado com sucesso." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Erro ao deletar gráfico." });
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
      return res.status(404).json({ error: "Gráfico não encontrado." });
    }
    res.status(200).json(graficoAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar gráfico." });
  }
};


exports.getGraficoByMoeda = async (req, res) => {
  try {
    const { moeda } = req.params;
    const grafico = await Grafico.findOne({ moeda: moeda.toUpperCase() }); 
    if (!grafico) {
      return res.status(404).json({ error: "Gráfico não encontrado para essa moeda." });
    }
    res.status(200).json(grafico);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar gráfico." });
  }
};