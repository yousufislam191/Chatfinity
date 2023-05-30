const { getSignup } = require("../controllers/signup.controllers");
const {
  decorateHtmlResponse,
} = require("../middlewares/common/decorateHtmlResponse");

const router = require("express").Router();

router.get("/", decorateHtmlResponse("Sign up"), getSignup);

module.exports = router;
