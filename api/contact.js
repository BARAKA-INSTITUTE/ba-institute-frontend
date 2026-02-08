import { connectToDatabase } from './lib/db.js';
import { ContactEntry } from './models/ContactEntry.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Save to database
    const entry = await ContactEntry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      message: message.trim(),
    });

    console.log('[contact] Saved to DB:', entry._id);

    // Send email notification via Resend (optional – won't fail the request)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(resendApiKey);

        const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
        const notificationEmail = process.env.NOTIFICATION_EMAIL || 'info@barakah-it.com';

        await resend.emails.send({
          from: fromEmail,
          to: notificationEmail,
          replyTo: email,
          subject: `New Contact Message from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px;">
              <h2 style="color: #333;">New Contact Message</h2>
              <hr style="border: none; border-top: 2px solid #eee; margin: 20px 0;" />
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Message:</strong></p>
              <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${message.replace(/\n/g, '<br>')}</p>
              <hr style="border: none; border-top: 2px solid #eee; margin: 20px 0;" />
              <p style="color: #666; font-size: 12px;">Submitted at ${new Date().toISOString()}</p>
            </div>
          `,
        });
        console.log('[contact] Email sent successfully');
      } catch (emailError) {
        console.error('[contact] Email sending failed:', emailError.message || emailError);
      }
    } else {
      console.warn('[contact] RESEND_API_KEY not configured; skipping email');
    }

    return res.status(201).json({
      success: true,
      message: 'Contact message received',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);

    let errorMessage = 'Unable to submit message at this time';
    if (error.message?.includes('MONGODB_URI')) {
      errorMessage = 'Database configuration error';
    } else if (error.message?.includes('Database connection')) {
      errorMessage = 'Database connection failed';
    } else if (error.name === 'ValidationError') {
      errorMessage = 'Invalid data provided';
    }

    // Ensure we always return JSON
    return res.status(500).json({
      success: false,
      message: errorMessage,
      debug: process.env.NODE_ENV === 'development' ? {
        errorName: error.name,
        errorMessage: error.message,
        stack: error.stack
      } : undefined
    });
  }
}
