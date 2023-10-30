const knex = require('./conection')
const jwt = require('jsonwebtoken')

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
    auth
}

