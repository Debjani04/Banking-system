require('dotenv').config();
const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     type: 'OAuth2',
//     user: process.env.EMAIL_USER,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     refreshToken: process.env.REFRESH_TOKEN,
//   },
// });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});


// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Banking-system" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


async function sendRegistrationEmail(userEmail, name ) {
    const subject = "Welcome to Banking-system! ";
    const text = `Hello ${name},\n\nThank you for registering at Banking-system.
    We'are excited to have you on board!\n\nBest regards,\nThe Banking-system Team ` ;
    const html = ` <p>Hello ${name}, </p> <p>Thank you for registering at Banking-system. We're excited to have you on board!   </p> <p> Best regards, <br> The Banking-system Team</p>` ;

    await sendEmail(userEmail, subject, text, html) ;


}

async function sendTransaction(userEmail, name, toAccount, amount) {
    const subject = 'Transaction Successful!';
    const text = `Hello ${name},\n\nYour transaction of $${amount} to account ${toAccount} was successful!\n\nBest regards,\nThe Banking-system Team`;
    const html = `<p>Hello ${name}, </p><p>Your transaction of $${amount} to account ${toAccount} was successful!</p><p>Best regards,<br>The Banking-system Team</p>`;

    await sendEmail(userEmail, subject, text, html) ;
}

async function sendTransactionFailed(userEmail, name, toAccount, amount) {
    const subject = 'Transaction Failed!';
    const text = `Hello ${name},\n\nWe regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later or contact support for assistance.\n\nBest regards,\nThe Banking-system Team`;
    const html = `<p>Hello ${name}, </p><p>We regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later or contact support for assistance.</p><p>Best regards,<br>The Banking-system Team</p>`;

    await sendEmail(userEmail, subject, text, html);
}

module.exports = {
  sendRegistrationEmail,
  sendTransaction,
  sendTransactionFailed 
};