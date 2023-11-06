const { Router } = require("express");
const { registerUser, login, editUser, userProfile } = require("./controllers/users");
const { registerFields, auth, loginFields, editFields } = require("./middlewares/md_users");
const { listCategories } = require("./controllers/categories");

const router = Router();

router.post("/usuario", registerFields, registerUser);
router.post("/login", loginFields, login);
router.get("/categoria", listCategories);

router.use(auth);

router.put("/usuario", editFields, editUser);
router.get("/usuario", userProfile);

module.exports = router;
