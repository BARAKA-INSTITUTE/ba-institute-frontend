# Contact Form API Setup Guide

## Simple Setup - No Backend Server Required!

The contact form now connects directly to MongoDB using serverless functions. No separate backend needed!

### Step 1: Configure Environment Variables

Your `.env` file is already set up with:

```bash
RESEND_API_KEY=re_9M5NP74b_9WH2qnrwXTpyLZtEfySMc5df
MONGODB_URI=mongodb+srv://barakah:Positive_oo1@*@barakah-it.jvitlub.mongodb.net/?appName=barakah-it
MONGODB_DB_NAME=barakah-it
OWNER_EMAIL=vistulaabubakrsiddik@gmail.com
```

### Step 2: Run Development Server

**Option A: Frontend Only (Quick Start)**
```bash
npm run dev
```
App runs on `http://localhost:5173` - Contact form will only work after deployment.

**Option B: Full Stack with API (Recommended for Testing)**
```bash
npm run dev:full
```
App runs on `http://localhost:3000` - Contact form works locally with serverless API!

### Step 3: Test the Contact Form

**Using Option A (Frontend Only):**
- Deploy to Vercel first to test the contact form
- Or use Option B for local testing

**Using Option B (Full Stack):**
1. Visit `http://localhost:3000/contact`
2. Fill out the form  
3. Submit - it will save to MongoDB and send email via Resend

## How It Works

- **Frontend**: React app with Vite
- **API**: Serverless function in `/api/contact.js`
- **Database**: MongoDB with Mongoose (direct connection, cached)
- **Email**: Resend API

No Express server, no separate backend - everything runs as serverless functions!

## For Production (Vercel)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `RESEND_API_KEY`
   - `MONGODB_URI`
   - `MONGODB_DB_NAME`
   - `OWNER_EMAIL`
4. Deploy!

Vercel automatically handles the serverless functions.

## MongoDB Schema

Contact submissions are saved to the `inquiries` collection:

```javascript
{
  firstName: String,
  lastName: String,
  email: String,
  message: String,
  status: String (default: 'pending'),
  createdAt: Date
}
```

## Troubleshooting

### API not working in development
- Make sure you're using `vercel dev` (via `npm run dev`)
- Check that `.env` file has all required variables
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0) for development

### Email not sending
- Verify Resend API key is valid
- Check domain verification in Resend dashboard
- Update `from` email in `api/contact.js` if needed

### Database connection fails
- Verify MongoDB URI is correct
- Check MongoDB Atlas network access settings
- Ensure database user has read/write permissions
