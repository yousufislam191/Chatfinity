const { getUser, deleteUser } = require("../controllers/users.controllers");
const { checkLogin } = require("../middlewares/common/checkLogin");
const {
  decorateHtmlResponse,
} = require("../middlewares/common/decorateHtmlResponse");

const router = require("express").Router();

router.get("/", decorateHtmlResponse("User"), checkLogin, getUser);
router.delete("/:id", deleteUser);

module.exports = router;
