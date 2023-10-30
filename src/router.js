const { Router } = require("express");
const { registerUser } = require("./controllers/users");
const { registerFields } = require("./middlewares/md_users");

const router = Router();

router.post("/usuario", registerFields, registerUser);

module.exports = router;