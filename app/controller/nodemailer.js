const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "grover.oberbrunner44@ethereal.email",
    pass: "tCnjckva6jq3YdxT6g",
  },
});

exports.sendEmailForgot = async (id, emailUser) => {
  try {
    let link = `http://localhost:3000/reset/${id}`;
    let messageEmail = {
      from: "muhammadfitrian0712@gmail.com",
      to: emailUser,
      subject: "Permohonan Ubah Password",
      html: `Silahkan ubah password dengan klik link berikut <a href=${link}>Disini</a>`,
    };
    const sendEmail = await transporter.sendMail(messageEmail);
  } catch (e) {
    console.log(e);
  }
};

transporter.verify((err, succ) => {
  if (err) {
    throw new Error("Terjadi kesalahan server nodemailer");
  } else {
    console.log("Server siap mengirimkan email");
  }
});
