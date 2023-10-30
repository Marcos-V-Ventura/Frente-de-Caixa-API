const bcrypt = require('bcrypt');
const knex = require("../connection");
const yup = require("yup");
const { pt } = require("yup-locales");
yup.setLocale(pt);

const registerUser = async (req, res) => {
    const { nome, senha, email } = req.body;
    try {
        const passHash = await bcrypt.hash(senha, 10);
        await knex('usuarios').insert({ nome, email, senha: passHash }).returning('*');

        res.status(201).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { registerUser };