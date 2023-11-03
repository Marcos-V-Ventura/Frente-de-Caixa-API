const knex = require("../connection");
const errorMessages = require("../helpers/errorMessages");

const deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const findProduct = await knex("produtos").where({ id }).first();

    if (!findProduct) {
      return res.status(400).json({ mensagem: errorMessages.invalidProducts });
    }

    const deleteProduct = await knex("produtos").del().where({ id });

    return res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};

module.exports = { deleteProductById };
