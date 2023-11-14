const yup = require("yup");
const { pt } = require("yup-locales");

const validateNumberCustomerId = yup.object({
  cliente_id: yup.number(),
});

module.exports = validateNumberCustomerId;
