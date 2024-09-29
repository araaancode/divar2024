var mongoose = require("mongoose");
var config = require("../config");
var rand = require("random-key");

var adminSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    username: {
      type: String,
      unique: true,
      required: [true, "username required"],
    },
    password: {
      type: String,
      required: [true, "password required"],
    },
    accessType: {
      type: String,
      enum: ["administrator", "readonly"],
    },
    access: [String],
  },
  config.MONGO_SCHEMA_CONFIG_JSON
);
adminSchema.plugin(require("mongoose-bcrypt"));
var Admin = mongoose.model("admin", adminSchema);
module.exports = {
  Admin,
};
