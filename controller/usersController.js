const Users = require("../models/Users");
const argon2 = require("argon2");
const { StatusCodes } = require("http-status-codes");

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const checkEmail = await Users.findOne({ email });
    if (checkEmail) {
      res.json({
        msg: "email telah terdaftar",
      });
    } else {
      const hashPass = await argon2.hash(password, 10);
      const result = new Users({ email, password: hashPass }).save();

      if (!result) {
        res.json({
          msg: "Berhasil mendaftar",
        });
      } else {
        res.json({
          msg: "Gagal mendaftar",
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const getEmailFromDatabase = await Users.findOne({ email });

    if (!getEmailFromDatabase) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid Credentials" });
    } else {
      const verifyPass = await argon2.verify(
        password,
        getEmailFromDatabase.password
      );
      if (!verifyPass) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Invalid Credentials" });
      } else {
        res.status(StatusCodes.OK).json({ msg: "Invalid Credentials" });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { signUp, signIn };
