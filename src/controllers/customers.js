const knex = require("../connection");
const errorMessages = require("../helpers/errorMessages");
require("dotenv").config();

const registerCustomer = async (req, res) => {
  const { nome, email, cpf } = req.body;
  try {
    const registerCustomer = await knex("clientes")
      .insert({ nome, email, cpf })
      .returning("*");
    if (!registerCustomer) {
      return res
        .status(501)
        .json({ mensagem: errorMessages.customerWasNotRegistered });
    }

    return res.status(201).json();
  } catch (error) {
    return res.status(500).json({ mensagem: errorMessages.server });
  }
};

const updateCustomer = async (req, res) => {
  const { nome, email, cpf } = req.body;
  const { id } = req.params;
  try {
    const update = await knex("clientes")
      .update({ nome, email, cpf })
      .where({ id })
      .returning("*")
      .debug();

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: errorMessages.server });
  }
};

module.exports = {
  registerCustomer,
  updateCustomer,
};
