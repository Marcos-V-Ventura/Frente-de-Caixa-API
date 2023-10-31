const knex = require("../connection");
const jwt = require('jsonwebtoken')
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

const auth = async (req, res, next) => {
  const { authorization } = req.headers
  
  if (!authorization) return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' })
  
  const token = authorization.split(' ')[1]
  
  try {
    const { id } = jwt.verify(token, process.env.JWT_PASS)
  
    const user = await knex('usuarios').where({ id }).first()
  
    if (!user) return res.status(400).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' })
  
    delete user.senha
  
    req.user = user
  
    next()
  } catch ({ message }) {
      return res.status(500).json({ message })
    }
}

module.exports = { 
  registerFields,
  auth 
};

