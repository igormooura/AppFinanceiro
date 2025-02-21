const Noticia = require("../model/Noticia.js");
const news = require("./news.json");
const fs = require('fs');


exports.createNoticia = async (req, res) => {
  try {
    const noticiasPromises = req.body.map(async (item) => {
      const { titulo, descr, data, tag } = item;
      const noticiaExistente = await Noticia.findOne({ titulo });
      if (noticiaExistente) {
        return null; 
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


exports.getAllNoticias = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const tag = req.query.tag; 
    const search = req.query.search; 

    const query = {};
    if (tag) {
      query.tag = tag; 
    }

    if (search) {
      query.titulo = { $regex: search, $options: 'i' }; 
    }
  
    const noticias = await Noticia.find(query)
      .skip(skip)
      .limit(limit)
      .exec();
 
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

exports.updateNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo,descr, data } = req.body;
    const noticiaAtualizada = await Noticia.findByIdAndUpdate(
      id,
      { titulo, data },
      { new: true } 
    );
    if (!noticiaAtualizada) {
      return res.status(404).json({ error: "Notícia não encontrada." });
    }
    res.status(200).json(noticiaAtualizada);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar notícia." });
  }
};

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