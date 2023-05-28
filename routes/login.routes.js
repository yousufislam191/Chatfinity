const { getLogin } = require("../controllers/login.controllers");

const router = require("express").Router();

router.get("/", getLogin);

module.exports = router;
