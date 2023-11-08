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
} = require("./middlewares/md_customers");
const {
    loginFields,
    editFields,
    auth,
    registerFields,
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
} = require("./middlewares/md_products");

const router = Router();

router.post("/usuario", registerFields, registerUser);
router.post("/login", loginFields, login);
router.get("/categoria", listCategories);

router.use(auth);

router.put("/usuario", editFields, updateUser);
router.get("/usuario", userProfile);
router.get("/categoria", listCategories);
router.get("/cliente", getAllCustomers);
router.get("/cliente/:id", getCustomerById);
router.delete("/produto/:id", deleteProductById);
router.post("/produto", productFields, registerProduct);
router.put("/produto/:id", productFields, validateProdutoId, updateProduct);
router.get("/produto", listProducts);
router.get("/produto/:id", detailProducts);

router.post("/cliente", customerRegisterFields, registerCustomer);
router.put("/cliente/:id", customerUpdateFields, updateCustomer);

module.exports = router;