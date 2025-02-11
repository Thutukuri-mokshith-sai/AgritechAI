const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // For Gmail
  auth: {
    user: 'agritechai9@gmail.com', // Your Gmail email address
    pass: 'Mokshith@1',   // Your Gmail password (or use App Password if 2FA is enabled)
  },
});

// Set up email data
const mailOptions = {
  from: 'agritechai9@gmail.com',  // Sender address
  to: 'mokshiths001@gmail.com',  // List of recipients
  subject: 'Test Email from Node.js',  // Subject line
  text: 'This is a test email sent from Node.js using Nodemailer!',  // Plain text body
  // html: '<b>This is a test email sent from Node.js using Nodemailer!</b>' // If you want to send HTML content
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
