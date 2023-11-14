const yup = require("yup");
const { pt } = require("yup-locales");
const { typeErrorString, typeErrorNumber } = require("./errorMessages");
yup.setLocale(pt);

const validateRegisterAndUpdateCustomer = yup.object({
  nome: yup.string().required(),
  email: yup.string().email().required(),
  cpf: yup.string().length(11).required(),
  cep: yup.string().length(8),
  rua: yup.string(),
  numero: yup.string(),
  bairro: yup.string(),
  cidade: yup.string(),
  estado: yup.string(),
});

module.exports = validateRegisterAndUpdateCustomer;
