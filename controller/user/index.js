var adsDatabase = require("../../database/ads");
module.exports = {
  dashboard: (req, res, next) => {
    req.ejsData.title = "داشبورد";
    req.ejsData.active = "/userPanel";
    res.render("user/panel/index", req.ejsData);
  },
  createAds: (req, res, next) => {
    req.ejsData.title = "ایجاد آگهی";
    req.ejsData.active = "/userPanel/create-ads";
    res.render("user/panel/createAds", req.ejsData);
  },
  getAdsList: (req, res, next) => {
    req.ejsData.title = "نمایش آگهی ها";
    req.ejsData.active = "/userPanel/ads";
    adsDatabase.UserAdvertising.find({
      userId: req.session.userId,
    }).exec((err, docs) => {
      req.ejsData.list = docs;
      res.render("user/panel/ads", req.ejsData);
    });
  },
};
