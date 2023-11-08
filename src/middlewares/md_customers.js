const knex = require("../connection");
const yup = require("yup");
const { pt } = require("yup-locales");
const errorMessages = require("../helpers/errorMessages");
const validateRegisterAndUpdateCustomer = require("../helpers/schemas_customers");

yup.setLocale(pt);

const customerRegisterFields = async (req, res, next) => {
    const { email, cpf } = req.body;
    try {
        await validateRegisterAndUpdateCustomer.validate(req.body);

        const find = await knex("clientes")
            .where({ cpf })
            .orWhere({ email })
            .first();
        if (find) {
            return res
                .status(409)
                .json({ mensagem: errorMessages.invalidEmailOrCpf });
        }

        next();
    } catch (error) {
        if (error.name == "ValidationError")
            return res.status(400).json({ mensagem: error.message });

        return res.status(500).json({ mensagem: error.message });
    }
};

const customerUpdateFields = async (req, res, next) => {
    const { nome, email, cpf } = req.body;
    const { id } = req.params;

    try {
        await validateRegisterAndUpdateCustomer.validate(req.body);

        const findId = await knex("clientes").where({ id }).returning("*");

        if (!findId.length) {
            return res.status(400).json({ mensagem: errorMessages.customerNotFound });
        }

        if (email) {
            const findDuplicateEmail = await knex("clientes")
                .where({ email })
                .whereNot({ id })
                .select("*");
            if (findDuplicateEmail.length) {
                return res.status(409).json({ mensagem: errorMessages.duplicateEmail });
            }
        }
        if (cpf) {
            const findDuplicateCPF = await knex("clientes")
                .where({ cpf })
                .whereNot({ id })
                .select("*");
            if (findDuplicateCPF.length) {
                return res.status(409).json({ mensagem: errorMessages.duplicateCPF });
            }
        }
        next();
    } catch (error) {
        if (error.name == "ValidationError") {
            return res.status(400).json({ mensagem: error.message });
        }
        return res.status(500).json({ mensagem: error.message });
    }
};

module.exports = {
    customerRegisterFields,
    customerUpdateFields,
};