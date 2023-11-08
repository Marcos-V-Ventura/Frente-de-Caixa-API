const knex = require("../connection");
const yup = require("yup");
const { pt } = require("yup-locales");

yup.setLocale(pt);

const getUser = async (email) => {
    try {
        const userFound = await knex("usuarios").where({ email }).first();

        return userFound;
    } catch (error) {
        return false;
    }
};

const getCategory = async (id) => {
    try {
        const categoryFound = await knex("categorias").where({ id }).first();

        return categoryFound;
    } catch (error) {
        return false;
    }
};

const getProduct = async (id) => {
    try {
        const productFound = await knex("produtos").where({ id }).first();

        return productFound;
    } catch (error) {
        return false;
    }
};

const getClient = async (id) => {
    try {
        const clientFound = await knex("clientes").where({ id }).first();

        return clientFound;
    } catch (error) {
        return false;
    }
};

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
};

module.exports = {
    getUser,
    emailIsRegistered,
    getProduct,
    getCategory,
    getClient,
};
