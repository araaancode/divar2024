var express = require("express");
var router = express.Router();
var userController = require("../../controller/user/auth");
router.post("/", userController.preAuth);
router.post("/login", userController.login);
router.post("/verify", userController.verify);
router.post("/setPassword", userController.setPassword);

module.exports = router;
