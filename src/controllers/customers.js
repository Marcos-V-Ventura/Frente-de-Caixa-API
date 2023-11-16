const { knex } = require("../connection");
const errorMessages = require("../helpers/errorMessages");
const utils = require("../helpers/utils");

const registerCustomer = async (req, res) => {
  const { nome, email, cpf } = req.body;
  try {
    const registerCustomer = await knex("clientes")
      .insert({ nome, email, cpf })
      .returning("*");
    if (!registerCustomer) {
      return res
        .status(400)
        .json({ mensagem: errorMessages.customerWasNotRegistered });
    }

    return res.status(201).json();
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};

const updateCustomer = async (req, res) => {
  const { nome, email, cpf } = req.body;
  const { id } = req.params;
  try {
    await knex("clientes")
      .update({ nome, email, cpf })
      .where({ id })
      .returning("*");

    return res.status(204).json();
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const allClients = await knex("clientes").orderBy("id");

    return res.status(200).json(allClients);
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};

const getCustomerById = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await utils.getClient(id);

    if (!client)
      return res.status(404).json({ mensagem: errorMessages.clientNotFound });

    return res.status(200).json(client);
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};
module.exports = {
  registerCustomer,
  updateCustomer,
  getAllCustomers,
  getCustomerById,
};
