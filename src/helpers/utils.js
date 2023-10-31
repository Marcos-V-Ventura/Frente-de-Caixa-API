const bcrypt = require("bcrypt");
const knex = require("../connection");
const jwt = require("jsonwebtoken");
const yup = require("yup");
const { pt } = require("yup-locales");
yup.setLocale(pt);

const validateNomeEmailSenha = yup.object({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    senha: yup.string().required()
});

const validateEmailSenha = yup.object({
    email: yup.string().email().required(),
    senha: yup.string().required()
});

const getUser = async (email) => {
    try {
        const userFound = await knex('usuarios')
            .where({ email })
            .first();

        return userFound;
    } catch (error) {
        return false;
    }
}

const emailIsRegistered = async (email, id) => {
    try {
        const verifyEmail = await knex("usuarios")
            .where({ email })
            .andWhereNot({ id })
            .first();

        return verifyEmail;
    } catch (error) {
        return false;
    }
}

module.exports = { validateNomeEmailSenha, validateEmailSenha, getUser, emailIsRegistered }