const { getUser, deleteUser } = require("../controllers/users.controllers");
const {
  decorateHtmlResponse,
} = require("../middlewares/common/decorateHtmlResponse");

const router = require("express").Router();

router.get("/", decorateHtmlResponse("User"), getUser);
router.delete("/:id", deleteUser);

module.exports = router;
