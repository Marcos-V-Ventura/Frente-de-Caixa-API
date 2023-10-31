const { Router } = require("express");
const { registerUser, login, editUser } = require("./controllers/users");
const { registerFields, auth } = require("./middlewares/md_users");

const router = Router();

router.post("/usuario", registerFields, registerUser);
router.post('/login', login)

router.use(auth)

router.put('/usuario', editUser)

module.exports = router;

