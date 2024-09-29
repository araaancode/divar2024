var express = require("express");
var router = express.Router();
var indexController = require("../../controller/user/index");
var indexMiddleware = require("../../middleware/user/index");
/* GET home page. */
var middleware = [
  indexMiddleware.isLogin,
  indexMiddleware.isActive,
  indexMiddleware.setEjsData,
  indexMiddleware.setUserInfo,
  indexMiddleware.setCountAds,
];
router.get("/", middleware, indexController.dashboard);

router.get("/create-ads", middleware, indexController.createAds);

router.get("/ads", middleware, indexController.getAdsList);

router.get("/logout", (req, res, next) => {
  req.session = null;
  res.redirect("/userPanel");
});

module.exports = router;
