var databaseAdmin = require("../../database/admin");
module.exports = {
  CREATE_ADMINS: (req, res, next) => {
    new databaseAdmin.Admin({
      username: req.body.username,
      password: req.body.password,
      access: req.body.access,
      accessType: req.body.accessType,
    }).save((err, doc) => {
      if (doc) {
        res.send({
          insert: true,
        });
      } else {
        res.status(400).send({
          insert: false,
          msg: "ادمین تکراری است",
        });
      }
    });
  },
};
