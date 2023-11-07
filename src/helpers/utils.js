const knex = require("../connection");
const yup = require("yup");
const { pt } = require("yup-locales");
const { typeErrorString, typeErrorNumber }= require("./errorMessages");
yup.setLocale(pt);

const validateNomeEmailSenha = yup.object({
    nome: yup.string().required()
        .typeError(typeErrorString("nome")).strict(),
    email: yup.string().email().required()
        .typeError(typeErrorString("descricao")).strict(),
    senha: yup.string().required()
        .typeError(typeErrorString("descricao")).strict()
});

const validateEmailSenha = yup.object({
    email: yup.string().email().required()
        .typeError(typeErrorString("email")).strict(),
    senha: yup.string().required()
        .typeError(typeErrorString("senha")).strict()
});

const validateAllFieldsProduct = yup.object({
    descricao: yup.string('FFF').required()
        .typeError(typeErrorString("descricao")).strict(),
    quantidade_estoque: yup.number().required()
        .typeError(typeErrorNumber("quantidade_estoque")).strict(),
    valor: yup.number().required()
        .typeError(typeErrorNumber("valor")).strict(),
    categoria_id: yup.number().required()
        .typeError(typeErrorNumber("categoria_id")).strict()
});

const validateRegisterCustomer = yup.object({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    cpf: yup.string().length(11).required()
})

const validateUpdateCustomer = yup.object({
    nome: yup.string(),
    email: yup.string().email(),
    cpf: yup.string().length(11)
}).test(
    'Você deve preencher pelo menos um campo',
  value => {
    return value.nome || value.email || value.cpf;
}
);

const getUser = async (email) => {
    try {
        const userFound = await knex('usuarios')
            .where({ email })
            .first();

        return userFound;
    } catch (error) {
        return false;
    }
}

const getCategory = async (id) => {
    try {
        const categoryFound = await knex("categorias")
            .where({ id })
            .first();
        
        return categoryFound;
    } catch (error) {
        return false;
    }    
}

const getProduct = async (id) => {
    try {
        const productFound = await knex("produtos")
            .where({ id })
            .first();
    
        return productFound;
    } catch (error) {
        return false;
    }
}

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
}

module.exports = { 
    validateNomeEmailSenha, 
    validateEmailSenha, 
    validateRegisterCustomer,
    validateUpdateCustomer,
    getUser, 
    emailIsRegistered,
    validateAllFieldsProduct,
    getProduct,
    getCategory
}
