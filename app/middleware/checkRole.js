const { StatusCodes } = require("http-status-codes");

exports.checkSession = (req, res, next) => {
  try {
    const checkSession = req.session;

    if (!checkSession) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        msg: "Harap login ke akun anda",
      });
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }
};

exports.checkRole = (req, res, next) => {
  try {
    const checkRole = req.session.role;

    if (!checkRole) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        msg: "Admin Only !",
      });
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }
};
