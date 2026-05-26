import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter using SMTP (works with any email provider)
// This uses a generic SMTP configuration that works with most email providers
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true' || false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.log('⚠️ Email service not configured:', error.message);
  } else {
    console.log('✅ Email service ready');
  }
});

export const emailService = {
  // Send contact form email
  async sendContactEmail(name, email, subject, message) {
    try {
      // Email to admin
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Form: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Sent from Nutrition & Wellness Platform</small></p>
        `
      });

      // Confirmation email to user
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'We received your message - Nutrition & Wellness',
        html: `
          <h2>Thank you for contacting us!</h2>
          <p>Hi ${name},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <hr>
          <p><strong>Your Message:</strong></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p>Best regards,<br>Nutrition & Wellness Team</p>
        `
      });

      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Email error:', error);
      throw error;
    }
  },

  // Send registration confirmation email
  async sendRegistrationEmail(name, email, userId) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to Nutrition & Wellness Platform!',
        html: `
          <h2>Welcome, ${name}!</h2>
          <p>Your account has been successfully created.</p>
          <p>You can now log in and start tracking your nutrition.</p>
          <hr>
          <p><strong>Account Details:</strong></p>
          <p>Email: ${email}</p>
          <p>User ID: ${userId}</p>
          <hr>
          <p><a href="http://localhost:5173/login" style="background-color: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Login to Your Account</a></p>
          <hr>
          <p>Best regards,<br>Nutrition & Wellness Team</p>
        `
      });

      return { success: true, message: 'Registration email sent' };
    } catch (error) {
      console.error('Email error:', error);
      throw error;
    }
  },

  // Send password reset email
  async sendPasswordResetEmail(email, resetToken) {
    try {
      const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
      
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset - Nutrition & Wellness',
        html: `
          <h2>Password Reset Request</h2>
          <p>We received a request to reset your password.</p>
          <p><a href="${resetLink}" style="background-color: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Your Password</a></p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <hr>
          <p>Best regards,<br>Nutrition & Wellness Team</p>
        `
      });

      return { success: true, message: 'Password reset email sent' };
    } catch (error) {
      console.error('Email error:', error);
      throw error;
    }
  },

  // Send login notification email
  async sendLoginNotificationEmail(name, email) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Login Notification - Nutrition & Wellness',
        html: `
          <h2>Login Notification</h2>
          <p>Hi ${name},</p>
          <p>Your account was just logged in.</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p>If this wasn't you, please change your password immediately.</p>
          <hr>
          <p>Best regards,<br>Nutrition & Wellness Team</p>
        `
      });

      return { success: true, message: 'Login notification sent' };
    } catch (error) {
      console.error('Email error:', error);
      // Don't throw - this is optional
      return { success: false, message: 'Could not send notification' };
    }
  }
};

export default emailService;
