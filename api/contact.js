// API Route for handling contact form submissions
// This is a serverless function compatible with Vercel

import { Resend } from 'resend';
import mongoose from 'mongoose';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// MongoDB connection caching
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const connectionUri = process.env.MONGODB_URI;
    if (!connectionUri) {
      throw new Error('MONGODB_URI is not set in environment variables');
    }

    cached.promise = mongoose.connect(connectionUri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Inquiry Schema
const inquirySchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

// Check if model exists to prevent recompilation in serverless
const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
 }

    // Connect to MongoDB and save the inquiry
    await connectToDatabase();
    
    const inquiry = await Inquiry.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      status: 'pending'
    });

    // Send email via Resend
    const ownerEmail = process.env.OWNER_EMAIL || 'info@barakah-it.com';
    
    await resend.emails.send({
      from: 'Barakah IT Contact Form <noreply@barakah-it.com>',
      to: ownerEmail,
      replyTo: email,
      subject: `New Contact Inquiry from ${firstName} ${lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #10b981; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #059669; margin-bottom: 5px; }
              .value { background-color: white; padding: 10px; border-radius: 4px; border: 1px solid #d1d5db; }
              .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">New Contact Inquiry</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">From:</div>
                  <div class="value">${firstName} ${lastName}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
                <div class="field">
                  <div class="label">Submitted:</div>
                  <div class="value">${new Date().toLocaleString()}</div>
                </div>
                <div class="field">
                  <div class="label">Inquiry ID:</div>
                  <div class="value">${result.insertedId}</div>
                </div>
              </div>inquiry._i
              <div class="footer">
                <p>This inquiry has been automatically saved to your database.</p>
                <p>&copy; ${new Date().getFullYear()} Barakah IT Institute. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return res.status(200).json({
      success: true,
      message: 'Inquiry submitted successfully',
      inquiryId: inquiry._id,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: 'Failed to submit inquiry',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
