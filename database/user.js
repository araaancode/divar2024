var mongoose = require("mongoose");
var config = require("../config");
var rand = require("random-key");

var userSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    fname: {
      type: String,
      default: "",
    },
    lname: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /09\d{9}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, "User phone number required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password required"],
    },
  },
  config.MONGO_SCHEMA_CONFIG_JSON
);
userSchema.plugin(require("mongoose-bcrypt"));
var User = mongoose.model("user", userSchema);

var userOPTSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /09\d{9}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, "User phone number required"],
      unique: true,
    },
    code: String,
  },
  config.MONGO_SCHEMA_CONFIG_JSON
);
var UserOTP = mongoose.model("userOTP", userOPTSchema);

var sendOTP = (phone) => {
  var code = rand.generateDigits(5);
  new UserOTP({
    phone,
    code,
  }).save((err, doc) => {
    console.log(err);
    console.log(doc);
    if (err) {
      UserOTP.findOneAndUpdate(
        {
          phone,
        },
        {
          code,
        },
        {
          new: true,
        }
      ).exec();
    }
  });
};

// new User({
//   phone: "09035020585",
//   password: "123456",
// }).save();
module.exports = {
  User,
  UserOTP,
  sendOTP,
};
