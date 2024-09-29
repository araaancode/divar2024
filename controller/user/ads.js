var ads = require("../../database/ads");
module.exports = {
  GET_ADS_BY_ID: (req, res, next) => {
    ads.UserAdvertising.findById(req.params.adsId).exec((err, doc) => {
      res.send(doc);
    });
  },
  DELETE_ADS_BY_ID: (req, res, next) => {
    ads.UserAdvertising.findByIdAndDelete(req.params.adsId).exec((err, doc) => {
      res.send({
        delete: 1,
      });
    });
  },
  UPDATE_ADS_JUST_INFO: (req, res, next) => {
    ads.UserAdvertising.findByIdAndUpdate(req.params.adsId, {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      address: req.body.address,
    }).exec((err, doc) => {
      if (doc) {
        res.send({
          update: 1,
        });
      } else {
        res.status(400).send({
          err,
        });
      }
    });
  },
  UPDATE_ADS_JUST_MAP: (req, res, next) => {
    ads.UserAdvertising.findByIdAndUpdate(req.params.adsId, {
      lat: req.body.lat,
      lng: req.body.lng,
    }).exec((err, doc) => {
      if (doc) {
        res.send({
          update: 1,
        });
      } else {
        res.status(400).send({
          err,
        });
      }
    });
  },
  UPDATE_ADS_JUST_PRIME_PHOTO: (req, res, next) => {
    ads.UserAdvertising.findByIdAndUpdate(req.params.adsId, {
      primePhoto: req.file.filename,
    }).exec((err, doc) => {
      if (doc) {
        res.send({
          update: 1,
        });
      } else {
        res.status(400).send({
          err,
        });
      }
    });
  },
  UPDATE_ADS_JUST_PHOTOS: (req, res, next) => {
    console.log(req.file);
    ads.UserAdvertising.findByIdAndUpdate(req.params.adsId, {
      $push: {
        photos: {
          filename: req.file.filename,
        },
      },
    }).exec((err, doc) => {
      if (doc) {
        res.send({
          update: 1,
        });
      } else {
        res.status(400).send({
          err,
        });
      }
    });
  },
  DELETE_ADS_JUST_PHOTOS: (req, res, next) => {
    ads.UserAdvertising.findByIdAndUpdate(req.params.adsId, {
      $pull: {
        photos: {
          _id: req.params.photoId,
        },
      },
    }).exec((err, doc) => {
      if (doc) {
        res.send({
          update: 1,
        });
      } else {
        res.status(400).send({
          err,
        });
      }
    });
  },
  POST_Create_Ads: (req, res, next) => {
    var photos = [];
    if (req.files.photos) {
      req.files.photos.forEach((element) => {
        photos.push(element.filename);
      });
    }

    new ads.UserAdvertising({
      userId: req.session.userId,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      primePhoto: req.files.primePhoto[0].filename,
      photos,
      address: req.body.address,
      lat: req.body.lat,
      lng: req.body.lng,
    }).save((err, doc) => {
      if (doc) {
        res.send({
          insert: 1,
        });
      } else {
        res.status(400).send({
          err,
        });
      }
    });
  },
};
