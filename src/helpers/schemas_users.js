const yup = require("yup");
const { pt } = require("yup-locales");
const { typeErrorString, requiredField } = require("./errorMessages");
yup.setLocale(pt);

const validateNomeEmailSenha = yup.object({
  nome: yup
    .string()
    .required(requiredField("Nome"))
    .typeError(typeErrorString("Nome"))
    .strict(),
  email: yup
    .string()
    .email()
    .required(requiredField("Email"))
    .typeError(typeErrorString("Email"))
    .strict(),
  senha: yup
    .string()
    .required(requiredField("Senha"))
    .typeError(typeErrorString("Senha"))
    .strict(),
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

module.exports = { validateNomeEmailSenha, validateEmailSenha };
