const Componente = require('../models/Componente');
const Categoria = require('../models/Categoria');

// Obter componentes por categoria
exports.getComponentesByCategoria = async (req, res) => {
  try {
    const { categoria } = req.params;

    const componentes = await Componente.findAll({
      include: [
        {
          model: Categoria,
          as: 'Categorium', // Utilize o nome correto da tabela associada
          where: { nome_categoria: categoria }, // Utilize o nome correto da coluna na tabela associada
        },
      ],
    });

    res.json(componentes);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao obter os componentes.' });
  }
};

// Obter todos os componentes
exports.getComponentes = async (req, res) => {
  try {
    const componentes = await Componente.findAll({
      include: [{ model: Categoria, as: 'Categorium' }], // Utilize o nome correto da tabela associada
    });

    res.json(componentes);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao obter os componentes.' });
  }
};

// Criar um novo componente
exports.createComponente = async (req, res) => {
  try {
    const { codigo_componente, nome_componente, desc_componente, CategoriaId } = req.body;


    const categoria = await Categoria.findByPk(CategoriaId);

    if (!categoria) {
      return res.status(400).json({ error: 'A categoria especificada não existe.' });
    }

    const novoComponente = await Componente.create({
      codigo_componente,
      nome_componente,
      desc_componente,
      CategoriaId 
    });

    res.status(201).json(novoComponente);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao criar o componente.' });
  }
};

// Obter um componente por ID
exports.getComponenteById = async (req, res) => {
  try {
    const { id } = req.params;

    const componente = await Componente.findByPk(id, {
      include: [Categoria],
    });

    if (!componente) {
      return res.status(404).json({ error: 'Componente não encontrado.' });
    }

    res.json(componente);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao obter o componente.' });
  }
};

// Atualizar um componente por ID
exports.updateComponente = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo_componente, nome_componente, desc_componente } = req.body;

    const componente = await Componente.findByPk(id);

    if (!componente) {
      return res.status(404).json({ error: 'Componente não encontrado.' });
    }

    componente.codigo_componente = codigo_componente;
    componente.nome_componente = nome_componente;
    componente.desc_componente = desc_componente;

    await componente.save();

    res.json(componente);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar o componente.' });
  }
};

// Excluir um componente por ID
exports.deleteComponente = async (req, res) => {
  try {
    const { id } = req.params;

    const componente = await Componente.findByPk(id);

    if (!componente) {
      return res.status(404).json({ error: 'Componente não encontrado.' });
    }

    await componente.destroy();

    res.json({ message: 'Componente excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao excluir o componente.' });
  }
};
