var config = require("../../config");
var adsDatabase = require("../../database/ads");
var userDatabase = require("../../database/user");
module.exports = {
  isLogin: (req, res, next) => {
    if (req.session.isLogin == true) {
      next();
    } else {
      res.render("user/login/index");
    }
  },
  isActive: (req, res, next) => {
    userDatabase.User.findById(req.session.userId).exec((err, userInfo) => {
      if (userInfo.isActive == true) {
        next();
      } else {
        req.session = null;
        res.redirect("/userPanel");
      }
    });
  },
  setEjsData: (req, res, next) => {
    req.ejsData = {};
    req.ejsData.sideBar = config.USER_PANEL_SIDE_BAR;
    req.ejsData.dataTableLanguage = config.DATA_TABLE_LANGUAGE;
    next();
  },
  setUserInfo: (req, res, next) => {
    userDatabase.User.findById(req.session.userId).exec((err, userInfo) => {
      req.ejsData.userInfo = userInfo;
      next();
    });
  },
  setCountAds: (req, res, next) => {
    adsDatabase.UserAdvertising.find({
      userId: req.session.userId,
    })
      .count()
      .exec((err, count) => {
        req.ejsData.sideBar[1].count = count;
        next();
      });
  },
};
