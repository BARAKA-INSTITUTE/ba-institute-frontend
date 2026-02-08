import { connectToDatabase } from './lib/db.js';
import { ContactEntry } from './models/ContactEntry.js';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'Name, email, and message are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Save to database
    await ContactEntry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      message: message.trim(),
    });

    // Send email notification (optional - won't fail if not configured)
    if (resend) {
      try {
        const ownerEmail = process.env.OWNER_EMAIL || 'info@barakah-it.com';
        
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: ownerEmail,
          replyTo: email,
          subject: `New Contact Message from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px;">
              <h2 style="color: #333;">📧 New Contact Message</h2>
              <hr style="border: none; border-top: 2px solid #eee; margin: 20px 0;" />
              
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Message:</strong></p>
              <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${message.replace(/\n/g, '<br>')}</p>
              
              <hr style="border: none; border-top: 2px solid #eee; margin: 20px 0;" />
              <p style="color: #666; font-size: 12px;">Submitted at ${new Date().toLocaleString()}</p>
            </div>
          `,
        });
        console.log('[contact] Email sent successfully');
      } catch (emailError) {
        console.error('[contact] Email sending failed:', emailError);
        // Don't fail the request if email fails
      }
    } else {
      console.warn('[contact] RESEND_API_KEY not configured; skipping email');
    }

    return res.status(201).json({ message: 'Contact message received' });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({
      message: 'Unable to submit message at this time',
    });
  }
}
