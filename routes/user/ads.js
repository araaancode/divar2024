var express = require("express");
var router = express.Router();
var upload = require("../../libs/upload");
var controller = require("../../controller/user/ads");
var indexMiddleware = require("../../middleware/user/index");
var userDatabase = require("../../database/user");
router.use((req, res, next) => {
  userDatabase.User.findById(req.session.userId).exec((err, userInfo) => {
    if (userInfo.isActive == true) {
      next();
    } else {
      res.status(403).send({
        isActive: false,
      });
    }
  });
});
router.post(
  "/",
  upload.adsUpload.fields([
    {
      name: "primePhoto",
      maxCount: 1,
    },
    {
      name: "photos",
      maxCount: 6,
    },
  ]),
  controller.POST_Create_Ads
);
router.delete("/:adsId", controller.DELETE_ADS_BY_ID);
router.get("/:adsId", controller.GET_ADS_BY_ID);
router.put("/:adsId", controller.UPDATE_ADS_JUST_INFO);
router.put("/:adsId/map", controller.UPDATE_ADS_JUST_MAP);
router.put(
  "/:adsId/primePhoto",
  upload.adsUpload.single("primePhoto"),
  controller.UPDATE_ADS_JUST_PRIME_PHOTO
);
router.put(
  "/:adsId/photos",
  upload.adsUpload.single("photos"),
  controller.UPDATE_ADS_JUST_PHOTOS
);
router.delete("/:adsId/photos/:photoId", controller.DELETE_ADS_JUST_PHOTOS);
//router.put("/:adsId/photos");
//router.put("/:adsIdPrimePhoto", controller.UPDATE_ADS)
//router.put("/:adsIdPhotos", controller.UPDATE_ADS)

module.exports = router;
