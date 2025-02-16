const Noticia = require("../model/Noticia.js");
const news = require("./news.json");
const fs = require('fs');
console.log("Total notícias:", news[1]);

// Criar uma nova notícia
exports.createNoticia = async (req, res) => {
  try {
    const noticiasPromises = req.body.map(async (item) => {
      const { titulo, descr, data, tag } = item;
      const noticiaExistente = await Noticia.findOne({ titulo });
      if (noticiaExistente) {
        return null; // Skip adding duplicate noticia
      }
      const novaNoticia = new Noticia({ titulo, descr, data, tag });
      return await novaNoticia.save();
    });

    const noticiasSalvas = await Promise.all(noticiasPromises);
    
    
    res.status(201).json(noticiaSalva);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar notícia." });
  }
};

// Buscar todas as notícias
exports.getAllNoticias = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const tag = req.query.tag; 
    const search = req.query.search; 

    const query = {};
    console.log(query.titulo);
    console.log(tag);
    if (tag) {
      query.tag = tag; 
    }

    if (search) {
      query.titulo = { $regex: search, $options: 'i' }; 
    }
    console.log(query);
    const noticias = await Noticia.find(query)
      .skip(skip)
      .limit(limit)
      .exec();
    console.log(noticias);
    const totalNoticias = await Noticia.countDocuments(query);
    const totalPages = Math.ceil(totalNoticias / limit);

    res.status(200).json({
      noticias,
      currentPage: page,
      totalPages,
      totalNoticias,
    });
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
    const { titulo,descr, data } = req.body;
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