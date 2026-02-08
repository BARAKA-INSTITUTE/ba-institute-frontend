# Contact Form Implementation Guide

## Overview
This contact form implementation follows the same pattern as the Joe's Family reference repository, using a simple and reliable approach with MongoDB and Resend email notifications.

## Architecture

### Frontend (`/src/pages/Contact.jsx`)
- Simple form with name, email, phone (optional), and message fields
- Client-side validation for required fields
- Success/error message display
- Posts to `/api/contact`

### Backend (`/api/contact.js`)
- Vercel serverless function
- Validates incoming data
- Saves to MongoDB using Mongoose
- Sends email notification via Resend (optional, won't fail if not configured)
- Returns simple success/error responses

### Database Model (`/api/models/ContactEntry.js`)
```javascript
{
  name: String (required),
  email: String (required),
  phone: String (optional),
  message: String (required),
  timestamps: true
}
```

## Configuration

### Required Environment Variables (.env)
```env
# MongoDB - REQUIRED
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=your-app

# Resend - OPTIONAL (form will work without email)
RESEND_API_KEY=re_your_api_key_here
OWNER_EMAIL=your-email@example.com
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### Optional Environment Variables
- `RESEND_FROM_EMAIL`: Custom "from" email address (if you have a verified domain in Resend)
- `MONGODB_DB_NAME`: Database name (optional, defaults to connection string setting)

## How It Works

1. **User fills form** → Client-side validation checks required fields
2. **Form submission** → POST request to `/api/contact` with form data
3. **Server validation** → Backend validates data again
4. **Database save** → Contact entry saved to MongoDB
5. **Email notification** → Optional email sent to owner (won't fail if Resend not configured)
6. **Success response** → User sees success message

## Testing Locally

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment
Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

### 3. Run development server
```bash
npm run dev:full
```
This uses Vercel CLI to run the serverless functions locally.

### 4. Test the form
- Navigate to `/contact` page
- Fill in the form
- Submit and check:
  - MongoDB for saved entry
  - Email inbox for notification (if configured)
  - Browser console for any errors

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The `vercel.json` configuration ensures API routes work correctly.

## Differences from Previous Implementation

### Simplified
- Combined firstName + lastName into single `name` field
- Removed complex inquiry schema
- Simplified validation logic
- Made email sending optional

### Improved
- Better error handling
- Won't fail if email service is down  
- Cleaner code structure
- Follows serverless best practices

## Troubleshooting

### Form submission fails
- Check browser console for errors
- Verify MongoDB connection string
- Check Vercel function logs

### Email not sending
- Verify `RESEND_API_KEY` is set
- Check `OWNER_EMAIL` is configured
- Review Vercel function logs
- Note: Form will still work without email

### Database connection issues
- Verify MongoDB URI format
- Check IP whitelist in MongoDB Atlas
- Ensure database user has write permissions

## Reference
Based on implementation from: https://github.com/Positiveoo1/joesfamily
