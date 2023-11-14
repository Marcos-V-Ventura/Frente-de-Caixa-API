const knex = require("../connection");
const errorMessages = require("../helpers/errorMessages");
const validateNumberCustomerId = require("../helpers/schemas_orders");

const listOrders = async (req, res) => {
  const { cliente_id } = req.query;

  try {
    await validateNumberCustomerId.validate(req.query);

    if (cliente_id) {
      const listOrder = await knex("pedidos").where({ cliente_id }).debug();
      if (!listOrder.length) {
        res.status(400).json({ messagem: errorMessages.orderNotfound });
      }
      const listProductOrder = await knex("pedido_produtos").where(
        "pedido_id",
        listOrder[0].id
      );
      const pedido = listOrder;
      const pedido_produtos = listProductOrder;
      const objectListOrder = {
        pedido,
        pedido_produtos,
      };

      return res.status(202).json(objectListOrder);
    } else if (!cliente_id) {
      const listOrder = await knex("pedidos").returning("*");
      if (!listOrder.length) {
        res.status(400).json({ messagem: errorMessages.orderNotfound });
      }
      const listProductOrder = await knex("pedido_produtos").returning("*");

      const pedido = listOrder;
      const pedido_produtos = listProductOrder;
      const objectListOrder = {
        pedido,
        pedido_produtos,
      };

      return res.status(202).json(objectListOrder);
    }
  } catch ({ message }) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: message });
  }
};

module.exports = {
  listOrders,
};
