const db = require("../config/db");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String,
  role: {
    type: String,
    default: "user",
  },
});

const Users = db.model("user", userSchema);

module.exports = Users;
