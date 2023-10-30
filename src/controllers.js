const knex = require('./conection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { email, senha } = req.body

  try {
    const usuario = await knex('usuarios').where({ email }).first()

    if (!usuario) return res.status(404).json({ mensagem: 'Usuário e/ou senha inválido(s).' })

    const passwordIsValid = await bcrypt.compare(senha, usuario.senha)

    if (!passwordIsValid) return res.status(401).json({ mensagem: 'Usuário e/ou senha inválido(s).' })

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_PASS, { expiresIn: '8h' })

    delete usuario.senha

    return res.status(200).json({ usuario, token })
  } catch ({ message }) {
    return res.status(500).json({ message })
  }
}

const editUser = async (req, res) => {
  const { id } = req.user
  const { nome, email, senha } = req.body

  if (!nome || !email || !senha) return res.status(400).json({ mensagem: 'Por favor informe todos os campos!' })

  try {
    const emailIsRegistered = await knex('usuarios').where({ email }).first()
    if (emailIsRegistered) return res.status(400).json({ mensagem: 'Houve um problema ao tentar se registrar!' })

    const passwordEncrypted = await bcrypt.hash(senha, 10)

    const [ user ] = await knex('usuarios').update({ nome, email, senha: passwordEncrypted }).where({ id }).returning('*')

    delete user.senha

    return res.status(200).json(user)
  } catch ({ message }) {
      return res.status(500).json({ message })
  }
}

module.exports = {
    login,
    editUser
}

