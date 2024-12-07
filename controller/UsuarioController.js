const Usuario = require("../model/Usuario.js");

// Criar um novo usuário
exports.createUser = async (req, res) => {
  try {
    const { nome, email, senha, moedasNaCarteira } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Campos obrigatórios não preenchidos." });
    }

    const novoUsuario = new Usuario({ nome, email, senha, moedasNaCarteira });
    const usuarioSalvo = await novoUsuario.save();

    res.status(201).json(usuarioSalvo);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário." });
  }
};

// Buscar todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
};

// Buscar usuário por ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário." });
  }
};

// Atualizar informações de um usuário
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha, moedasNaCarteira } = req.body;

    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
      id,
      { nome, email, senha, moedasNaCarteira },
      { new: true } // Retorna o documento atualizado
    );

    if (!usuarioAtualizado) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
};

// Deletar um usuário
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioDeletado = await Usuario.findByIdAndDelete(id);

    if (!usuarioDeletado) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.status(200).json({ message: "Usuário deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário." });
  }
};