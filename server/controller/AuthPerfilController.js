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
      return res.status(400).json({ error: "E-mail already registered." });
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

    console.error("Error creating user: ", error);
    res.status(500).json({ error: "Internal error." });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res
        .status(400)
        .json({ error: "Required fields not filled." });
    }

    const usuario = await AuthPerfil.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ error: "User not found." });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    // token JWT
    const token = jwt.sign(
      { userId: usuario._id, email: usuario.email },
      process.env.JWT_TOKEN, 
      { expiresIn: "3h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      usuario: {
        id: usuario._id,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email not provided." });
    }

    const usuario = await AuthPerfil.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ error: "User not found." });
    }

    const novaSenha = Math.random().toString(36).slice(-8); 
    const hashedNovaSenha = await bcrypt.hash(novaSenha, 10);

    usuario.senha = hashedNovaSenha;
    await usuario.save();

    res.status(200).json({
      message: "Password successfully reset. Check your new password.",
      novaSenha,
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.deleteAuthPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Authentication profile ID not provided." });
    }

    const authPerfilDeletado = await AuthPerfil.findByIdAndDelete(id);
    if (!authPerfilDeletado) {
      return res.status(404).json({ error: "Authentication profile not found." });
    }

    await Usuario.findByIdAndDelete(authPerfilDeletado.usuarioId);

    res.status(200).json({ message: "Authentication profile and associated user successfully deleted." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};
