const { pt } = require("yup-locales");
const knex = require("../connection");
const errorMessages = require("../helpers/errorMessages");

const registerCustomer = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;

  try {
    const table = "clientes";
    let columnQuery = ["nome", "email", "cpf"];
    let valuesQuery = [nome, email, cpf];

    if (cep) {
      const params = "cep";
      columnQuery.push(params);
      valuesQuery.push(cep);
    }
    if (rua) {
      const params = "rua";
      columnQuery.push(params);
      valuesQuery.push(rua);
    }
    if (numero) {
      const params = "numero";
      columnQuery.push(params);
      valuesQuery.push(numero);
    }
    if (bairro) {
      const params = "bairro";
      columnQuery.push(params);
      valuesQuery.push(bairro);
    }
    if (cidade) {
      const params = "cidade";
      columnQuery.push(params);
      valuesQuery.push(cidade);
    }
    if (estado) {
      const params = "estado";
      columnQuery.push(params);
      valuesQuery.push(estado);
    }
    let placeholdersColumns = columnQuery.map(() => "??").join(", ");
    let placeholdersValues = valuesQuery.map(() => "?").join(", ");

    const registerCustomer = await knex.raw(
      `INSERT INTO ?? (${placeholdersColumns}) VALUES (${placeholdersValues})`,
      [table, ...columnQuery, ...valuesQuery]
    );

    if (!registerCustomer.rowCount) {
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
