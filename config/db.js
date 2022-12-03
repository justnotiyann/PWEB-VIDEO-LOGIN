const mongoose = require("mongoose");
//Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1/pweb_login_sistem";
mongoose.connect(mongoDB, { useNewUrlParser: true });
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.once("open", () => console.log("berhasil terhubung ke database"));
db.on("error", () => console.log("gagal terhubung ke database"));

module.exports = db;
