const yup = require("yup");
const { pt } = require("yup-locales");
const { typeErrorString, typeErrorNumber } = require("./errorMessages");
yup.setLocale(pt);

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
    valor: yup
        .number()
        .min(1, "O valor não pode ser negativo ou zero!")
        .required()
        .typeError(typeErrorNumber("Valor"))
        .strict(),
    categoria_id: yup
        .number()
        .required()
        .typeError(typeErrorNumber("Categoria_id"))
        .strict(),
    produto_imagem: yup
        .string()
        .strict()
});

module.exports = validateAllFieldsProduct;
