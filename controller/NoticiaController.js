const Noticia = require("../model/Noticia.js");

// Criar uma nova notícia
exports.createNoticia = async (req, res) => {
  try {
    const { titulo, data } = req.body;

    if (!titulo || !data) {
      return res.status(400).json({ error: "Campos obrigatórios não preenchidos." });
    }

    const novaNoticia = new Noticia({ titulo, data });
    const noticiaSalva = await novaNoticia.save();

    res.status(201).json(noticiaSalva);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar notícia." });
  }
};

// Buscar todas as notícias
exports.getAllNoticias = async (req, res) => {
  try {
    const noticias = await Noticia.find();
    res.status(200).json(noticias);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar notícias." });
  }
};

// Buscar uma notícia por ID
exports.getNoticiaById = async (req, res) => {
  try {
    const { id } = req.params;
    const noticia = await Noticia.findById(id);

    if (!noticia) {
      return res.status(404).json({ error: "Notícia não encontrada." });
    }

    res.status(200).json(noticia);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar notícia." });
  }
};

// Atualizar uma notícia
exports.updateNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, data } = req.body;

    const noticiaAtualizada = await Noticia.findByIdAndUpdate(
      id,
      { titulo, data },
      { new: true } // Retorna o documento atualizado
    );

    if (!noticiaAtualizada) {
      return res.status(404).json({ error: "Notícia não encontrada." });
    }

    res.status(200).json(noticiaAtualizada);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar notícia." });
  }
};

// Deletar uma notícia
exports.deleteNoticia = async (req, res) => {
  try {
    const { id } = req.params;

    const noticiaDeletada = await Noticia.findByIdAndDelete(id);

    if (!noticiaDeletada) {
      return res.status(404).json({ error: "Notícia não encontrada." });
    }

    res.status(200).json({ message: "Notícia deletada com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar notícia." });
  }
};