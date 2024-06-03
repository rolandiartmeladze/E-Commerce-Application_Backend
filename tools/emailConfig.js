const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // or any other email service
  auth: {
    user: 'rartmeladze@gmail.com',
    pass: 'Paroli123'
  }
});

module.exports = transporter;