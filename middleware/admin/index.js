var config = require("../../config");
var adsDatabase = require("../../database/ads");
var adminDatabase = require("../../database/admin");
module.exports = {
  isLogin: (req, res, next) => {
    if (req.session.isLogin == true) {
      next();
    } else {
      res.render("admin/login/index");
    }
  },
  isActive: (req, res, next) => {
    adminDatabase.Admin.findById(req.session.adminId).exec((err, adminInfo) => {
      if (adminInfo.isActive == true) {
        req.ejsData.adminInfo = adminInfo;
        next();
      } else {
        req.session = null;
        res.redirect("/adminPanel");
      }
    });
  },
  isAccess: (req, res, next) => {
    var access = req.originalUrl.split("/").filter(function (el) {
      return el ? true : false;
    });
    if (access.length >= 2) {
      if (req.ejsData.adminInfo.access.includes(access[1])) {
        next();
      } else {
        res.status(403).send("<h1>403 Error-Access Denied</h1>");
        // res.status(403).render("admin/errorPage");
      }
    } else {
      next();
    }
  },
  filterAccess: (req, res, next) => {
    req.ejsData.sideBar = req.ejsData.sideBar.filter(
      (x) =>
        req.ejsData.adminInfo.access.includes(x.slug) || x.slug == "dashboard"
    );
    next();
  },
  setEjsData: (req, res, next) => {
    req.ejsData = {};
    req.ejsData.sideBar = config.ADMIN_PANEL_SIDE_BAR;
    req.ejsData.dataTableLanguage = config.DATA_TABLE_LANGUAGE;
    req.ejsData.accessList = config.ADMIN_PANEL_ACCESS;
    req.ejsData.accessTypeList = config.ADMIN_PANEL_ACCESS_TYPE;
    next();
  },
};
