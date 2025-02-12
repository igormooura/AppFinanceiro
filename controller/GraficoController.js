const Grafico = require("../model/Grafico.js");
const Usuario = require("../model/Usuario.js");
const Auth = require("../model/AuthPerfil.js");
const mongoose = require("mongoose");
// Criar um novo gráfico e associá-lo a um usuário
exports.createGrafico = async (req, res) => {
  try {
    const { moeda1, value, moeda2 } = req.body;
    console.log("Received userId:", req.params.userId);
    const userId = req.params.userId.trim();// Get userId from URL parameter
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "ID de usuário inválido." });
    }
    if (!moeda1 || value === undefined || !moeda2 || !userId) {
      return res.status(400).json({ error: "Campos obrigatórios não preenchidos." });
    }
    const usuarioAuth = await Auth.findById(userId);
    console.log(usuarioAuth.usuarioId);
    const usuario = await Usuario.findById(usuarioAuth.usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    if (usuario.graficos.length >= 3) {
      return res.status(400).json({ error: "Usuário já possui o máximo de 3 gráficos." });
    }

    const graficoSalvo = new Grafico({
      moeda: moeda1,
      valor: value,
      variavel: moeda2,
      user_id: usuarioAuth.usuarioId,
    });
    console.log(graficoSalvo);
    await graficoSalvo.save();
    usuario.graficos.push(graficoSalvo._id);
    await usuario.save();

    res.status(201).json(graficoSalvo);
  } catch (error) {
    console.error("Error:", error); // Add this line
    res.status(500).json({ error: "Erro ao criar gráfico." });
  }
};

// Obter todos os gráficos de um usuário
exports.getGraficoByUser = async (req, res) => {
  const user_id_old = req.params.userId; 
  const usuarioAuth = await Auth.findById(user_id_old);
  const user_id = usuarioAuth.usuarioId;
  try {
    const graficoList = await Grafico.find({ user_id }); 
    res.status(200).json({ user_id, graficoList });  // Send user_id along with the grafico list
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grafico', error });
  }
};

// Deletar um gráfico e removê-lo do usuário
exports.deleteGrafico = async (req, res) => {
  try {
    const { id, user_id_old } = req.params;
    console.log(req.params);

    // Check if the user exists
    const usuarioAuth = await Auth.findById(req.params.userId);
    if (!usuarioAuth) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const userId = usuarioAuth.usuarioId;
    console.log(userId);
    // Check if the graph exists and belongs to the user
    const graficoDeletado = await Grafico.findOne({ _id: id, user_id: userId });
    if (!graficoDeletado) {
      return res.status(404).json({ error: "Gráfico não encontrado ou não pertence ao usuário." });
    }

    // Delete the graph
    await Grafico.findByIdAndDelete(id);

    // Remove the graph from the user's graficos array
    await Usuario.findByIdAndUpdate(userId, {
      $pull: { graficos: id },
    });

    res.status(200).json({ message: "Gráfico deletado com sucesso." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Erro ao deletar gráfico." });
  }
};
// Atualizar um gráfico
exports.updateGrafico = async (req, res) => {
  try {
    const { id } = req.params;
    const { moeda, valor, variavel } = req.body;
    const graficoAtualizado = await Grafico.findByIdAndUpdate(
      id,
      { moeda, valor, variavel },
      { new: true } // Retorna o documento atualizado
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