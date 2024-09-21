const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
  },
  email: {
    type: String,
    required: [true, "User email is required"],
  },
  password: {
    type: String,
    required: [true, "User password is required"],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
