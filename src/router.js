const { Router } = require("express");
const { registerUser, login, editUser, userProfile, getAllClients, getClientById } = require("./controllers/users");
const { listCategories } = require("./controllers/categories");
const { registerCustomer, editCustomer } = require("./controllers/customers");
const { customerRegisterFields, customerUpdateFields } = require("./middlewares/md_customers");

const router = Router();

router.post("/usuario", registerFields, registerUser);
router.post("/login", loginFields, login);
router.get("/categoria", listCategories);

router.use(auth);

router.put("/usuario", editFields, editUser);
router.get("/usuario", userProfile);
router.get("/categoria", listCategories);
router.get("/cliente", getAllClients);
router.get("/cliente/:id", getClientById);
router.delete("/produto/:id", deleteProductById);
router.post("/produto", productFields, registerProduct);
router.put("/produto/:id", productFields, validateProdutoId, editProduct);

router.post('/cliente', customerRegisterFields ,registerCustomer)
router.put('/cliente/:id', customerUpdateFields, editCustomer)

module.exports = router;
