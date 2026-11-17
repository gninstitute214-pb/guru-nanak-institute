const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '..', 'data', 'email_notifications.log');

const appendLog = (content) => {
  try {
    if (!fs.existsSync(path.dirname(logFilePath))) {
      fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
    }
    fs.appendFileSync(logFilePath, content + '\n', 'utf-8');
  } catch (err) {
    console.error('Failed to write to notification log:', err.message);
  }
};

const sendInquiryEmail = async ({ name, phone, email, courseInterested, message }) => {
  const recipient = process.env.INSTITUTE_EMAIL || 'gninstitute214@gmail.com';
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const emailSubject = `🔔 New Student Inquiry: ${name} (${courseInterested})`;
  const emailBody = `
=================================================================
📧 INQUIRY NOTIFICATION DISPATCHED TO: ${recipient}
Institute: ${process.env.INSTITUTE_NAME || 'Guru Nanak Institute of Computer Education'}
Time: ${timestamp}
-----------------------------------------------------------------
Student Name: ${name}
Phone Number: ${phone}
Student Email: ${email || 'Not provided'}
Course of Interest: ${courseInterested}

Message:
"${message}"
=================================================================
`;

  console.log(emailBody);
  appendLog(emailBody);

  // If live SMTP configured
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      });

      await transporter.sendMail({
        from: `"Guru Nanak Institute Portal" <${process.env.SMTP_USER}>`,
        to: recipient,
        subject: emailSubject,
        text: `Student Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nCourse: ${courseInterested}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
            <h2 style="color: #312e81;">Guru Nanak Institute of Computer Education</h2>
            <h3 style="color: #059669;">New Student Inquiry Received</h3>
            <p><strong>Student Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Email:</strong> ${email || 'N/A'}</p>
            <p><strong>Course:</strong> ${courseInterested}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background: #f8fafc; padding: 10px; border-left: 4px solid #6366f1;">${message}</blockquote>
          </div>
        `
      });
    } catch (err) {
      console.warn(`[Email Service Notice] Could not send via live SMTP: ${err.message}`);
    }
  }

  return true;
};

const sendOtpEmail = async (email, otp) => {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const otpMessage = `
=================================================================
🔑 PASSWORD RESET OTP DISPATCHED TO: ${email}
Institute: ${process.env.INSTITUTE_NAME || 'Guru Nanak Institute of Computer Education'}
Time: ${timestamp}
-----------------------------------------------------------------
Your 6-Digit Password Reset Verification Code is:

                    >>> ${otp} <<<

This code is valid for 10 minutes. Do not share this code with anyone.
=================================================================
`;

  console.log(otpMessage);
  appendLog(otpMessage);

  // If live SMTP configured
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      });

      await transporter.sendMail({
        from: `"Guru Nanak Institute Security" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `🔑 Your Password Reset OTP: ${otp}`,
        text: `Your OTP for resetting Guru Nanak Institute Admin Password is: ${otp}. It is valid for 10 minutes.`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 25px; border: 1px solid #e2e8f0; border-radius: 12px; max-width: 500px; margin: auto;">
            <h2 style="color: #1e1b4b; text-align: center;">Guru Nanak Institute of Computer Education</h2>
            <h4 style="color: #4338ca; text-align: center;">Admin Password Reset Verification</h4>
            <p style="font-size: 14px; color: #475569;">Hello Administrator,</p>
            <p style="font-size: 14px; color: #475569;">We received a request to reset your password. Use the verification code below:</p>
            <div style="text-align: center; margin: 25px 0;">
              <span style="display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 6px; padding: 12px 24px; background: #eef2ff; color: #3730a3; border-radius: 8px; border: 1px dashed #6366f1;">${otp}</span>
            </div>
            <p style="font-size: 12px; color: #94a3b8; text-align: center;">This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
          </div>
        `
      });
    } catch (err) {
      console.warn(`[Email Service Notice] Could not send OTP via SMTP: ${err.message}`);
    }
  }

  return true;
};

module.exports = { sendInquiryEmail, sendOtpEmail };
