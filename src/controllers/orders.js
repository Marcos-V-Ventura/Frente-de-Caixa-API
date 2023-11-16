const knex = require("../connection");
const errorMessages = require("../helpers/errorMessages");
const validateNumberCustomerId = require("../helpers/schemas_orders");
const validateAllFieldsOrders = require("../helpers/schemas_orders");
const successMessages = require("../helpers/successMessages");
const utils = require("../helpers/utils");
const { send } = require("../nodemailer");

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

const registerOrder = async (req, res) => {
  const { cliente_id, pedido_produtos, observacao } = req.body;
  try {
    await validateAllFieldsOrders.validate(req.body);

    const client = await utils.getClient(cliente_id);
    send(
      client.email,
      successMessages.subjectNewOrder,
      successMessages.bodyNewOrder(client.nome)
    );

    const totalValue = await utils.getOrderTotalValue(pedido_produtos);
    const [orderFull] = await knex("pedidos")
      .insert({ cliente_id, observacao, valor_total: totalValue })
      .returning("*");

    await utils.insertPedidoProduto(pedido_produtos, orderFull.id);

    return res.status(201).json();
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: errorMessages.server, error: error.message });
  }
};

module.exports = {
  listOrders,
  registerOrder,
};
