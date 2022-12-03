const mongoose = require("mongoose");
const mongoDB = "mongodb://127.0.0.1/pweb_login_sistem";
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", () => console.log("berhasil terhubung ke database"));
db.on("error", () => console.log("gagal terhubung ke database"));

module.exports = db;
