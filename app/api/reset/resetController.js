const Users = require("../../models/usersModel");
const argon2 = require("argon2");
const { StatusCodes } = require("http-status-codes");
const { sendEmailForgot } = require("../../controller/nodemailer");

exports.renderReset = (req, res, next) => {
  try {
    res.render("reset");
  } catch (e) {
    console.log(e.message);
  }
};

exports.renderResetPass = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Users.findById(id);
    if (!result) {
      res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Halaman tidak ditemukan",
      });
    } else {
      res.render("resetPass", { result });
    }
  } catch (e) {
    console.log(e);
  }
};

exports.sendResetEmail = async (req, res, next) => {
  try {
    // ambil email
    const { email } = req.body;

    // check kedalam database
    const getEmailUser = await Users.findOne({ email: email.toLowerCase() });

    // percabangan ketika email tidak ditemukan
    if (!getEmailUser) {
      res.status(StatusCodes.BAD_REQUEST).json({
        msg: "email tidak ditemukan",
      });
    } else {
      // ketika ditemukan jalankan fungsi nodemailer
      const sendEmail = sendEmailForgot(getEmailUser._id, email);

      // Ketika gagal mengirimkan email
      if (!sendEmail) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          msg: "gagal kirim email",
        });
      } else {
        // ketika berhasil terkirimkan email
        res.status(StatusCodes.OK).json({
          msg: "Email reset password berhasil terkirim, Silahkan cek email anda",
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

exports.handleResetPassword = async (req, res, next) => {
  try {
    const { email, password, confirmPass } = req.body;

    if (password !== confirmPass) {
      res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Password tidak sama",
      });
    } else if (password.length <= 5) {
      res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Password minimal 5 karakter",
      });
    } else {
      const hashPass = await argon2.hash(password, 10);
      const result = await Users.findOneAndUpdate({
        email: email.toLowerCase(),
        password: hashPass,
      });

      if (!result) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          msg: "Server error",
        });
      } else {
        res.status(StatusCodes.CREATED).json({
          msg: "Berhasil ubah password",
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};
