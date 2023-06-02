const { getLogin, login, logout } = require("../controllers/login.controllers");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin");
const {
  decorateHtmlResponse,
} = require("../middlewares/common/decorateHtmlResponse");
const {
  loginInValidator,
  loginValidationHandler,
} = require("../middlewares/userValidator");

const router = require("express").Router();

router.get("/", decorateHtmlResponse("Login"), redirectLoggedIn, getLogin);
router.post(
  "/",
  decorateHtmlResponse("Login"),
  loginInValidator,
  loginValidationHandler,
  login
);
router.delete("/", logout);

module.exports = router;
