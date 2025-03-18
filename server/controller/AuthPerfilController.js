const mongoose = require("mongoose");
const AuthPerfil = require("../model/AuthPerfil.js");
const Usuario = require("../model/Usuario.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const session = await mongoose.startSession(); 
  session.startTransaction();

  try {
    const { nome, sobrenome, genero, country, email, senha, telefone, cpf } =
      req.body;

    if (!email || !senha || !nome) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios não preenchidos." });
    }

    //criptografar a senha
    const hashedPwd = await bcrypt.hash(senha, 10);

    const usuarioExistente = await AuthPerfil.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    const novoUsuario = new Usuario({
      nome,
      sobrenome,
      genero,
      country,
      email,
      cpf,
      telefone,
    });
    const usuarioSalvo = await novoUsuario.save({ session });


    const novoAuthPerfil = new AuthPerfil({
      email,
      senha: hashedPwd,
      usuarioId: usuarioSalvo._id,
    });

    const authSalvo = await novoAuthPerfil.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ usuario: usuarioSalvo, auth: authSalvo });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios não preenchidos." });
    }

    const usuario = await AuthPerfil.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // token JWT
    const token = jwt.sign(
      { userId: usuario._id, email: usuario.email },
      process.env.JWT_TOKEN, 
      { expiresIn: "3h" }
    );

    res.status(200).json({
      message: "Login realizado com sucesso.",
      token,
      usuario: {
        id: usuario._id,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "E-mail não fornecido." });
    }

    const usuario = await AuthPerfil.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const novaSenha = Math.random().toString(36).slice(-8); 
    const hashedNovaSenha = await bcrypt.hash(novaSenha, 10);

    usuario.senha = hashedNovaSenha;
    await usuario.save();

    res.status(200).json({
      message: "Senha redefinida com sucesso. Confira sua nova senha.",
      novaSenha,
    });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

exports.deleteAuthPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID do perfil de autenticação não fornecido." });
    }

    const authPerfilDeletado = await AuthPerfil.findByIdAndDelete(id);
    if (!authPerfilDeletado) {
      return res.status(404).json({ error: "Perfil de autenticação não encontrado." });
    }

    await Usuario.findByIdAndDelete(authPerfilDeletado.usuarioId);

    res.status(200).json({ message: "Perfil de autenticação e usuário associado deletados com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar perfil de autenticação:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
