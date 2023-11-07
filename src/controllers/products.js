const knex = require("../connection");
const yup = require("yup");
const { pt } = require("yup-locales");
const errorMessages = require("../helpers/errorMessages");
const utils = require("../helpers/utils");
yup.setLocale(pt);

const registerProduct = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    try {
        await knex('produtos').insert({ descricao, quantidade_estoque, valor, categoria_id });

        return res.status(201).json();
    } catch (error) {
        if(error.name == "ValidationError")
            return res.status(400).json({ mensagem: error.message });

        return res.status(500).json({ error: error.message, message: errorMessages.server});
    }
}

const editProduct = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { id } = req.params;
    try {
        const [product] = await knex("produtos")
            .update({ descricao, quantidade_estoque, valor, categoria_id  })
            .where({ id })
            .returning("*");
        
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error: error.message, message: errorMessages.server });
    }
}

module.exports = { registerProduct, editProduct }