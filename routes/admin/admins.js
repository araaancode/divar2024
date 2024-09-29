var express = require("express");
var router = express.Router();
var controller = require("../../controller/admin/admins");
router.post("/", controller.CREATE_ADMINS);
module.exports = router;
