const { Router } = require("express");

const {
  registerUser,
  login,
  userProfile,
  updateUser,
} = require("./controllers/users");
const { listCategories } = require("./controllers/categories");
const {
  registerCustomer,
  updateCustomer,
  getAllCustomers,
  getCustomerById,
} = require("./controllers/customers");

const {
  customerUpdateFields,
  customerRegisterFields,
  customerId,
} = require("./middlewares/md_customers");
const {
  loginFields,
  auth,
  registerFields,
  updateFields,
} = require("./middlewares/md_users");
const {
  deleteProductById,
  registerProduct,
  listProducts,
  detailProducts,
  updateProduct,
} = require("./controllers/products");
const {
  productFields,
  validateProdutoId,
  multer,
} = require("./middlewares/md_products");
const { registerOrder } = require("./controllers/orders");
const { orderFields } = require("./middlewares/md_orders");
const { listOrders } = require("./controllers/orders");

const router = Router();

router.post("/usuario", registerFields, registerUser);

router.post("/login", loginFields, login);

router.get("/categoria", listCategories);

router.use(auth);

router.put("/usuario", updateFields, updateUser);
router.get("/usuario", userProfile);
router.get("/categoria", listCategories);
router.get("/cliente", getAllCustomers);

router.get("/cliente/:id", customerId, getCustomerById);
router.delete("/produto/:id", deleteProductById);
router.post(
  "/produto",
  multer.single("produto_imagem"),
  productFields,
  registerProduct
);
router.put(
  "/produto/:id",
  multer.single("produto_imagem"),
  productFields,
  validateProdutoId,
  updateProduct
);
router.get("/produto", listProducts);
router.get("/produto/:id", detailProducts);

router.post("/cliente", customerRegisterFields, registerCustomer);
router.put("/cliente/:id", customerUpdateFields, updateCustomer);

router.post("/pedido", orderFields, registerOrder);
router.get("/pedido", listOrders);

module.exports = router;
