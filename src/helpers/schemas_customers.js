const yup = require("yup");
const { pt } = require("yup-locales");
const { typeErrorString } = require("./errorMessages");
yup.setLocale(pt);

const validateRegisterAndUpdateCustomer = yup.object({
  nome: yup
    .string()
    .required()
    .typeError(typeErrorString("Nome"))
    .strict(),
  email: yup
    .string()
    .email()
    .typeError(typeErrorString("Email"))
    .required()
    .strict(),
  cpf: yup
    .string()
    .length(11)
    .typeError(typeErrorString("CPF"))
    .required()
    .strict(),
  cep: yup.string().typeError(typeErrorString("Cep")).length(9).strict(),
  rua: yup.string().typeError(typeErrorString("Rua")).strict(),
  numero: yup.string().typeError(typeErrorString("Numero")).strict(),
  bairro: yup.string().typeError(typeErrorString("Bairro")).strict(),
  cidade: yup.string().typeError(typeErrorString("Cidade")).strict(),
  estado: yup.string().typeError(typeErrorString("Estado")).strict(),
});

module.exports = validateRegisterAndUpdateCustomer;