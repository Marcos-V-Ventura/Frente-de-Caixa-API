const knex = require("../connection");
const yup = require("yup");
const { pt } = require("yup-locales");
const { typeErrorString, typeErrorNumber } = require("./errorMessages");
yup.setLocale(pt);

const validateNomeEmailSenha = yup.object({
  nome: yup.string().required().typeError(typeErrorString("Nome")).strict(),
  email: yup
    .string()
    .email()
    .required()
    .typeError(typeErrorString("Email"))
    .strict(),
  senha: yup.string().required().typeError(typeErrorString("Senha")).strict(),
});

const validateEmailSenha = yup.object({
  email: yup
    .string()
    .email()
    .required()
    .typeError(typeErrorString("Email"))
    .strict(),
  senha: yup.string().required().typeError(typeErrorString("Senha")).strict(),
});

const validateAllFieldsProduct = yup.object({
  descricao: yup
    .string()
    .required()
    .typeError(typeErrorString("Descricao"))
    .strict(),
  quantidade_estoque: yup
    .number()
    .required()
    .typeError(typeErrorNumber("Quantidade_estoque"))
    .strict(),
  valor: yup.number().required().typeError(typeErrorNumber("Valor")).strict(),
  categoria_id: yup
    .number()
    .required()
    .typeError(typeErrorNumber("Categoria_id"))
    .strict(),
});

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
  validateNomeEmailSenha,
  validateEmailSenha,
  validateAllFieldsProduct,
  getUser,
  emailIsRegistered,
  getProduct,
  getCategory,
};
