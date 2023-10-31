const knex = require("./conection");

const listCategories = async (req, res) => {
  try {
    const categories = await knex("categorias");
    return res.status(200).json(categories.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { listCategories };
