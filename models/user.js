const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "password is required"]
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true
  },
  is_admin: {
    type: Boolean,
    enum: [true, false],
    default: false
  }
});

module.exports = mongoose.model("User", userSchema);
