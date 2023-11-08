const knex = require("../connection");
const errorMessages = require("../helpers/errorMessages");

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

module.exports = {
    registerCustomer,
    updateCustomer,
};
