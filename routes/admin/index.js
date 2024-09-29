var express = require("express");
var router = express.Router();
var indexController = require("../../controller/admin/index");
var indexMiddleware = require("../../middleware/admin/index");
/* GET home page. */
var middleware = [
  indexMiddleware.setEjsData,
  indexMiddleware.isLogin,
  indexMiddleware.isActive,
  indexMiddleware.isAccess,
  indexMiddleware.filterAccess,
];
router.get("/", middleware, indexController.dashboard);
router.get("/admins", middleware, indexController.getAdminList);
router.get("/ads", middleware, indexController.getAdsList);
router.post("/login", indexController.login);
router.get("/logout", (req, res, next) => {
  req.session = null;
  res.redirect("/userPanel");
});

module.exports = router;
