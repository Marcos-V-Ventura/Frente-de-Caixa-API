const yup = require("yup");
const { pt } = require("yup-locales");
const {
  typeErrorString,
  typeErrorNumber,
  requiredField,
} = require("./errorMessages");
const yupMessages = require("./yupMessages");
yup.setLocale(pt);

const validateAllFieldsProduct = yup.object({
  descricao: yup
    .string()
    .required(requiredField("Descricao"))
    .typeError(typeErrorString("Descricao"))
    .strict(),
  quantidade_estoque: yup
    .mixed()
    .test((value) => {
      const teste = typeof value === "string" && Number(value) ? value : null;
      const testeNumber = typeof value === "number" && value > 0;
      return teste || testeNumber;
    })
    .required(requiredField("Quantidade_estoque"))
    .typeError(typeErrorNumber("Quantidade_estoque"))
    .strict(),
  valor: yup
    .mixed()
    .test((value) => {
      const teste = typeof value === "string" && Number(value) ? value : null;
      const testeNumber = typeof value === "number" && value > 0;
      return teste || testeNumber;
    })
    .required(requiredField("Valor"))
    .typeError(typeErrorNumber("Valor"))
    .strict(),
  categoria_id: yup
    .mixed()
    .test((value) => {
      const teste = typeof value === "string" && Number(value) ? value : null;
      const testeNumber = typeof value === "number" && value > 0;
      return teste || testeNumber;
    })
    .required(requiredField("Categoria_id"))
    .typeError(typeErrorNumber("Categoria_id"))
    .strict(),
  produto_imagem: yup
    .object({
      originalname: yup.string().required(),
      buffer: yup.mixed().required(),
      mimetype: yup.string().required(),
    })
    .strict(),
});

module.exports = validateAllFieldsProduct;