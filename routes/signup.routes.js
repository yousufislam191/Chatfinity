const {
  getSignup,
  createNewUser,
} = require("../controllers/signup.controllers");
const avatarUpload = require("../middlewares/avatarUploads");
const {
  decorateHtmlResponse,
} = require("../middlewares/common/decorateHtmlResponse");
const {
  signUpValidator,
  signupValidationHandler,
} = require("../middlewares/userValidator");

const router = require("express").Router();

router.get("/", decorateHtmlResponse("Sign up"), getSignup);
router.post(
  "/",
  avatarUpload,
  signUpValidator,
  signupValidationHandler,
  createNewUser
);

module.exports = router;
