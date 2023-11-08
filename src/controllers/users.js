const bcrypt = require("bcrypt");
const knex = require("../connection");
const jwt = require("jsonwebtoken");
const errorMessages = require("../helpers/errorMessages");
const utils = require("../helpers/utils");

const registerUser = async (req, res) => {
    const { nome, senha, email } = req.body;
    try {
        const passHash = await bcrypt.hash(senha, 10);
        await knex("usuarios")
            .insert({ nome, email, senha: passHash })
            .returning("*");

        return res.status(201).json();
    } catch ({ message }) {
        return res
            .status(500)
            .json({ mensagem: errorMessages.server, error: message });
    }
};

const login = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await utils.getUser(email);

        const token = jwt.sign({ id: user.id }, process.env.JWT_PASS, {
            expiresIn: "8h",
        });

        delete user.senha;

        return res.status(200).json({ usuario: user, token });
    } catch ({ message }) {
        return res
            .status(500)
            .json({ mensagem: errorMessages.server, error: message });
    }
};

const editUser = async (req, res) => {
    const { id } = req.user;
    const { nome, email, senha } = req.body;
    try {
        const passwordEncrypted = await bcrypt.hash(senha, 10);

        await knex("usuarios")
            .update({ nome, email, senha: passwordEncrypted })
            .where({ id })
            .returning("*");

        return res.status(204).json();
    } catch ({ message }) {
        return res
            .status(500)
            .json({ mensagem: errorMessages.server, error: message });
    }
};

const userProfile = (req, res) => {
    try {
        const { senha: _, ...userProfile } = req.user;
        res.status(200).json(userProfile);
    } catch ({ message }) {
        return res
            .status(500)
            .json({ mensagem: errorMessages.server, error: message });
    }
};

const getAllClients = async (req, res) => {
    try {
        const allClients = await knex("clientes");

        return res.status(200).json(allClients);
    } catch ({ message }) {
        return res
            .status(500)
            .json({ mensagem: errorMessages.server, error: message });
    }
};

const getClientById = async (req, res) => {
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
    registerUser,
    login,
    editUser,
    userProfile,
    getAllClients,
    getClientById,
};
