const knex = require("../connection");
const yup = require("yup");
const { pt } = require("yup-locales");

yup.setLocale(pt);

const getUser = async (email) => {
    try {
        const userFound = await knex("usuarios").where({ email }).first();

        return userFound;
    } catch (error) {
        return false;
    }
};

const getCategory = async (id) => {
    try {
        const categoryFound = await knex("categorias").where({ id }).first();

        return categoryFound;
    } catch (error) {
        return false;
    }
};

const getProduct = async (id) => {
    try {
        const productFound = await knex("produtos").where({ id }).first();

        return productFound;
    } catch (error) {
        return false;
    }
};

const getClient = async (id) => {
    try {
        const clientFound = await knex("clientes").where({ id }).first();

        return clientFound;
    } catch (error) {
        return false;
    }
};

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
};

const checkStockProduct = async (id, quantity) => {
    try {
        const quantityAproved = await knex("produtos").where({ id }).andWhere('quantidade_estoque', '>=', quantity).andWhere(quantity, '>=', 1).first();
        return quantityAproved;
    } catch (error) {
        return false;
    }
};

const checkMinimumQuantityProduct = async (id, quantity) => {
    try {
        const quantityAproved = await knex("produtos").where({ id }).andWhere(quantity, '>=', 1).first();
        return quantityAproved;
    } catch (error) {
        return false;
    }
};

const updateQuantityProduct = async (pedido_produtos) => {
    try {
        for (const product of pedido_produtos) {
            const productFound = await getProduct(product.produto_id)
            const updatedQuantity = productFound.quantidade_estoque - product.quantidade_produto;

            await knex('produtos').where({ id: product.produto_id }).update({ quantidade_estoque: updatedQuantity })
        }
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

const insertPedidoProduto = async (pedido_produtos, orderFullId) => {
    try {
        for (const product of pedido_produtos) {
            const productFound = await getProduct(product.produto_id)

            await knex('pedido_produtos').insert({ pedido_id: orderFullId, produto_id: product.produto_id, quantidade_produto: product.quantidade_produto, valor_produto: productFound.valor })
        }
        await updateQuantityProduct(pedido_produtos)
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

const getOrderTotalValue = async (pedido_produtos) => {
    try {
        let totalValue = 0;
        for (const product of pedido_produtos) {
            const productFound = await getProduct(product.produto_id)
            totalValue += product.quantidade_produto * productFound.valor
        }
        return totalValue;
    } catch (error) {
        return false;
    }
}

module.exports = {
    getUser,
    emailIsRegistered,
    getProduct,
    getCategory,
    getClient,
    checkStockProduct,
    checkMinimumQuantityProduct,
    updateQuantityProduct,
    insertPedidoProduto,
    getOrderTotalValue
};