const Users = require("../../models/usersModel");
const argon2 = require("argon2");
const { StatusCodes } = require("http-status-codes");

exports.renderSignIn = (req, res, next) => {
  try {
    res.render("signin");
  } catch (e) {
    console.log(e.message);
  }
};
exports.renderSignUp = (req, res, next) => {
  try {
    res.render("signup");
  } catch (e) {
    console.log(e.message);
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const checkEmail = await Users.findOne({ email });
    if (checkEmail) {
      res.status(StatusCodes.BAD_REQUEST).json({
        msg: "email telah terdaftar",
      });
    } else {
      const hashPass = await argon2.hash(password, 10);
      const result = new Users({
        email: email.toLowerCase(),
        password: hashPass,
      }).save();

      if (result) {
        res.status(StatusCodes.OK).json({
          msg: "Berhasil mendaftar",
        });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          msg: "Gagal mendaftar",
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};
exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const getEmailFromDatabase = await Users.findOne({ email });

    if (!getEmailFromDatabase) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid Credentials" });
    } else {
      const verifyPass = await argon2.verify(
        getEmailFromDatabase.password,
        password
      );
      if (!verifyPass) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Invalid Credentials" });
      } else {
        req.session.email = getEmailFromDatabase.email;
        req.session.role = getEmailFromDatabase.role;
        res.status(StatusCodes.OK).json({ msg: "Selamat Datang" });
      }
    }
  } catch (e) {
    console.log(e);
  }
};
