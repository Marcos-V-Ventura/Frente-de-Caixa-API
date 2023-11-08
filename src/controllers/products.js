const knex = require("../connection");
const errorMessages = require("../helpers/errorMessages");
const utils = require("../helpers/utils");

const registerProduct = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    await knex("produtos").insert({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    });

    return res.status(201).json();
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};

const editProduct = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { id } = req.params;
  try {
    const [product] = await knex("produtos")
      .update({ descricao, quantidade_estoque, valor, categoria_id })
      .where({ id })
      .returning("*");

    return res.status(200).json(product);
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const findProduct = await utils.getProduct(id);

    if (!findProduct) {
      return res.status(404).json({ mensagem: errorMessages.invalidProducts });
    }

    await knex("produtos").del().where({ id });

    return res.status(204).send();
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};
const listProducts = async (req, res) => {
  const { categoria_id } = req.query;

  try {
    if (categoria_id) {
      const listProductsByCategory = await knex("produtos").where({
        categoria_id,
      });
      return res.status(200).json(listProductsByCategory);
    }
    const productList = await knex("produtos");
    return res.status(200).json(productList);
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};

const detailProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const findProduct = await utils.getProduct(id);
    if (!findProduct) {
      return res.status(400).json({ mensagem: errorMessages.invalidProducts });
    }

    return res.status(200).json(findProduct);
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};

module.exports = {
  deleteProductById,
  registerProduct,
  editProduct,
  listProducts,
  detailProducts,
};
