const Products = require("./Products");
const { StatusCodes } = require("http-status-codes");

exports.getAllProducts = async (req, res, next) => {
  try {
    const result = await Products.find();

    if (!result) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        msg: "Server error",
      });
    } else {
      res.status(StatusCodes.OK).json({
        msg: "Berikut data terkait",
        data: result,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const result = new Products(req.body).save();

    if (!result) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        msg: "Server error",
      });
    } else {
      res.status(StatusCodes.CREATED).json({
        msg: "Berhasil tambah data",
      });
    }
  } catch (e) {
    console.log(e);
  }
};
