var adsDatabase = require("../../database/ads");
var adminDatabase = require("../../database/admin");
module.exports = {
  dashboard: (req, res, next) => {
    req.ejsData.title = "داشبورد";
    req.ejsData.active = "/adminPanel";
    res.render("admin/panel/index", req.ejsData);
  },
  getAdminList: (req, res, next) => {
    req.ejsData.title = "ادمین ها";
    req.ejsData.active = "/adminPanel/admins";
    adminDatabase.Admin.find({}).exec((err, docs) => {
      req.ejsData.list = docs;
      res.render("admin/panel/admins", req.ejsData);
    });
  },
  getAdsList: (req, res, next) => {
    req.ejsData.title = "نمایش آگهی ها";
    adsDatabase.UserAdvertising.find({}).exec((err, docs) => {
      req.ejsData.list = docs;
      res.render("admin/panel/ads", req.ejsData);
    });
  },
  login: (req, res, next) => {
    adminDatabase.Admin.findOne({
      username: req.body.username,
    }).exec((err, adminInfo) => {
      adminInfo
        .verifyPassword(req.body.password)
        .then(function (valid) {
          req.session.isLogin = true;
          req.session.adminId = adminInfo._id;
          res.redirect("/adminPanel");
        })
        .catch(function (err) {
          res.redirect("/adminPanel");
        });
    });
  },
};
