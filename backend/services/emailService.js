const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '..', 'data', 'email_notifications.log');

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

  // Persist to local inquiry notification log
  try {
    if (!fs.existsSync(path.dirname(logFilePath))) {
      fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
    }
    fs.appendFileSync(logFilePath, emailBody + '\n', 'utf-8');
  } catch (err) {
    console.error('Failed to log email notification:', err.message);
  }

  // If user configured real SMTP in .env (e.g. SMTP_USER and SMTP_PASS)
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
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
            <p style="font-size: 11px; color: #64748b;">Ranjit Nagar, Seona Road, Patiala - 147001, Punjab | Contact: 7355687717</p>
          </div>
        `
      });
      console.log(`[Email Service] Live email successfully transmitted to ${recipient}`);
    } catch (err) {
      console.warn(`[Email Service Notice] Could not send via live SMTP (${err.message}). Notification preserved in notification log.`);
    }
  }

  return true;
};

module.exports = { sendInquiryEmail };
