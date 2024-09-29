var userDatabase = require("../../database/user");
module.exports = {
  preAuth: (req, res, next) => {
    userDatabase.User.findOne({
      phone: req.body.phone,
    }).exec((err, doc) => {
      if (doc) {
        if (doc.isActive == true) {
          res.send({
            preAuth: true,
          });
        } else {
          res.status(403).send({
            login: false,
            msg: "user not active",
          });
        }
      } else {
        userDatabase.sendOTP(req.body.phone);
        res.send({
          preAuth: false,
        });
      }
    });
  },
  login: (req, res, next) => {
    userDatabase.User.findOne({
      phone: req.body.phone,
      isActive: true,
    }).exec((err, doc) => {
      if (doc) {
        doc
          .verifyPassword(req.body.password)
          .then(function (valid) {
            if (valid) {
              req.session.userId = doc._id;
              req.session.isLogin = true;
              res.send({
                login: true,
              });
            } else {
              res.status(403).send({
                login: false,
                msg: "password wrong",
              });
            }
          })
          .catch(function (err) {
            res.status(403).send({
              login: false,
              msg: "password wrong",
            });
          });
      } else {
        res.status(403).send({
          login: false,
          msg: "no phone number found",
        });
      }
    });
  },
  verify: (req, res, next) => {
    userDatabase.UserOTP.findOne({
      phone: req.body.phone,
      code: req.body.code,
    }).exec((err, doc) => {
      if (doc) {
        res.send({
          verify: true,
        });
      } else {
        res.status(403).send({
          verify: false,
          msg: "verify code not valid",
        });
      }
    });
  },
  setPassword: (req, res, next) => {
    new userDatabase.User({
      fname: req.body.fname,
      lname: req.body.lname,
      phone: req.body.phone,
      password: req.body.password,
    }).save((err, doc) => {
      if (err) {
        res.status(403).send({
          setPassword: false,
          msg: "user duplicate",
        });
      } else {
        req.session.userId = doc._id;
        req.session.isLogin = true;
        res.send({
          setPassword: true,
        });
      }
    });
  },
};
