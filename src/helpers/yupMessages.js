const yup = require("yup");
const { pt } = require("yup-locales");
const {
  typeErrorString,
  typeErrorNumber,
  typeErrorArray,
} = require("./errorMessages");
yup.setLocale(pt);

const validateAllFieldsOrders = yup.object({
  cliente_id: yup
    .number()
    .required()
    .typeError(typeErrorNumber("Cliente_id"))
    .strict(),
  observacao: yup.string().typeError(typeErrorString("Observacao")).strict(),
  pedido_produtos: yup
    .array()
    .of(
      yup.object({
        produto_id: yup
          .number()
          .required()
          .typeError(typeErrorNumber("Produto_id"))
          .strict(),
        quantidade_produto: yup
          .number()
          .required()
          .typeError(typeErrorNumber("Quantidade_produto"))
          .strict(),
      })
    )
    .min(
      2,
      "Pedido_produtos: Os campos produto_id e quantidade_produto são obrigatórios"
    )
    .required()
    .typeError(typeErrorArray("Pedido_produtos"))
    .strict(),
});

module.exports = validateAllFieldsOrders;
