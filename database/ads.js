var mongoose = require("mongoose");
var config = require("../config");
var fileSchema = new mongoose.Schema(
  {
    filename: String,
  },
  config.MONGO_SCHEMA_CONFIG_JSON
);
var userAdvertisingSchema = new mongoose.Schema(
  {
    userId: {
      type: config.ObjectId,
      ref: "user",
    },
    title: String,
    description: String,
    price: Number,
    primePhoto: String,
    photos: [fileSchema],
    address: String,
    lat: Number,
    lng: Number,
    isActive: {
      type: Boolean,
      default: false,
    },
    deActiveText: {
      type: String,
      default: "در حال بررسی",
    },
  },
  config.MONGO_SCHEMA_CONFIG_JSON
);
var UserAdvertising = mongoose.model("usersAdvertising", userAdvertisingSchema);
module.exports = {
  UserAdvertising,
};
