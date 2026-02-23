const nodemailer = require('nodemailer');

// Function to send email notifications
function sendRenewalReminder(email, name) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail', // or your service provider
        auth: {
            user: 'your-email@gmail.com', // your email
            pass: 'your-email-password' // your email password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '