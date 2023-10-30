const knex = require("../connection");
const yup = require("yup");
const { pt } = require("yup-locales");
const errorMessages = require('../helpers/errorMessages');
yup.setLocale(pt);

const registerFields = async (req, res, next) => {
    const { nome, email, senha } = req.body;

    let userSchema = yup.object({
        nome: yup.string().required(),
        email: yup.string().email().required(),
        senha: yup.string().required()
    });

    try {
        await userSchema.validate({ email, nome, senha });
        
        const userFound = await knex('usuarios').where({ email }).first();
        
        if(userFound)
            return res.status(409).json({ mensagem: errorMessages.duplicateEmail});

        next();
    } catch (error) {
        if(error.name == "ValidationError")
            return res.status(400).json({ message: error.message });

        return res.status(500).json({ message: error.message });
    }
}

module.exports = { registerFields };