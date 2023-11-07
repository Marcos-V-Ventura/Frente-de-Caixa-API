const yup = require("yup");
const { pt } = require("yup-locales");
const errorMessages = require("../helpers/errorMessages");
const utils = require("../helpers/utils");
yup.setLocale(pt);

const productFields = async (req, res, next) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    try {
        await utils.validateAllFieldsProduct.validate({ descricao, quantidade_estoque, valor, categoria_id })

        const category = await utils.getCategory(categoria_id)

        if(!category)
            return res.status(401).json({ mensagem: errorMessages.invalidCategoria });
    
        next();
    } catch (error) {
        if(error.name == "ValidationError")
            return res.status(400).json({ mensagem: error.message})

        return res.status(500).json({ error: error.message, mensagem: errorMessages.server })
    }
}

const validateProdutoId = async (req, res, next) => {
    const { id } = req.params
    try {
        const productFound = await utils.getProduct(id);
        if(!productFound) 
            return res.status(404).json({ mensagem: errorMessages.invalidProducts })

        next();
    } catch (error) {
        return res.status(500).json({ error: error.message, mensagem: errorMessages.server })
    }
}
module.exports = { productFields, validateProdutoId }