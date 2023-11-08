const yup = require("yup");
const { pt } = require("yup-locales");
const { typeErrorString, typeErrorNumber } = require("./errorMessages");
yup.setLocale(pt);

const validateRegisterAndUpdateCustomer = yup.object({
  nome: yup.string().required().typeError(typeErrorString("Nome")).strict(),
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
});

module.exports = validateRegisterAndUpdateCustomer;
