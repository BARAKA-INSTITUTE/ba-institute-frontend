# Contact Form Setup Guide

This guide will help you set up the contact form with Resend email service and MongoDB database integration.

## Prerequisites

1. **Resend Account** - For sending emails
2. **MongoDB Atlas Account** - For storing inquiries
3. **Vercel Account** (optional) - For deployment

## Step 1: Set Up Resend

1. Go to [https://resend.com](https://resend.com) and create an account
2. Navigate to **API Keys** in the dashboard
3. Click **Create API Key**
4. Give it a name (e.g., "Barakah IT Contact Form")
5. Copy the API key (starts with `re_`)
6. Add it to your `.env` file:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### Configure Your Domain (Optional but Recommended)

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `barakah-it.com`)
4. Follow the DNS configuration instructions
5. Once verified, update the `from` field in `api/contact.js`:
   ```javascript
   from: 'Barakah IT Contact Form <noreply@yourdomain.com>',
   ```

## Step 2: Set Up MongoDB

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or log in
3. Create a new cluster (free tier is sufficient)
4. Click **Connect** → **Connect your application**
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Add it to your `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
   MONGODB_DB_NAME=barakah-it
   ```

### Configure Database Access

1. In MongoDB Atlas, go to **Database Access**
2. Click **Add New Database User**
3. Create a username and strong password
4. Grant **Read and write to any database** permission
5. Click **Add User**

### Configure Network Access

1. In MongoDB Atlas, go to **Network Access**
2. Click **Add IP Address**
3. For development: Click **Allow Access from Anywhere** (0.0.0.0/0)
4. For production: Add your server/Vercel IP addresses

## Step 3: Environment Variables

Create a `.env` file in the root directory:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DB_NAME=barakah-it
OWNER_EMAIL=your-email@example.com
NODE_ENV=development
```

**Important:** Never commit `.env` to version control! It's already in `.gitignore`.

## Step 4: Install Dependencies

Run this command to install required backend dependencies:

```bash
cd api
npm install
```

## Step 5: Local Development Setup

For local development with API routes:

### Option A: Using Vite Proxy (Recommended)

Update your `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
})
```

Then create a simple Express server for development (`server.js`):

```javascript
import express from 'express';
import dotenv from 'dotenv';
import contactHandler from './api/contact.js';

dotenv.config();

const app = express();
app.use(express.json());

app.post('/api/contact', contactHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
```

### Option B: Using Vercel CLI (For Production-like Testing)

```bash
npm install -g vercel
vercel dev
```

## Step 6: Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Add environment variables in Vercel dashboard:
   - Go to your project in Vercel
   - Settings → Environment Variables
   - Add each variable:
     - `RESEND_API_KEY`
     - `MONGODB_URI`
     - `MONGODB_DB_NAME`
     - `OWNER_EMAIL`

5. Redeploy:
   ```bash
   vercel --prod
   ```

## Step 7: Testing

### Test the Form Locally

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Contact page
3. Fill out the form with test data
4. Submit and check:
   - Terminal for any errors
   - Your email inbox for the notification
   - MongoDB Atlas → Collections → inquiries for the saved data

### Test Email Delivery

Check your Resend dashboard at [https://resend.com/emails](https://resend.com/emails) to see:
- Email delivery status
- Open rates
- Any delivery errors

### Test Database Storage

1. Go to MongoDB Atlas
2. Click on your cluster → Browse Collections
3. Select `barakah-it` database
4. View the `inquiries` collection
5. You should see your submitted inquiries

## Data Schema

Each inquiry is stored with the following structure:

```javascript
{
  _id: ObjectId("..."),
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  message: "This is my inquiry...",
  createdAt: ISODate("2024-02-07T10:30:00.000Z"),
  status: "pending"  // pending | reviewed | resolved
}
```

## Security Best Practices

1. **Never expose API keys** - Keep them in `.env` and server environment variables
2. **Use HTTPS** - Always use HTTPS in production
3. **Rate Limiting** - Consider adding rate limiting to prevent spam:
   - Use Vercel's built-in rate limiting
   - Or add middleware like `express-rate-limit`
4. **Input Validation** - Already implemented in the API
5. **CORS** - Configure proper CORS headers if needed
6. **MongoDB Security**:
   - Use strong passwords
   - Limit network access
   - Enable MongoDB audit logs for production

## Monitoring and Maintenance

### View Submitted Inquiries

To view and manage inquiries, you can:

1. **MongoDB Atlas Dashboard** - Browse collections directly
2. **Create an Admin Panel** - Build a simple React admin interface
3. **Use MongoDB Compass** - Desktop application for database management

### Email Notifications

All inquiries are sent to the email specified in `OWNER_EMAIL`. Update this in your environment variables to change the recipient.

## Troubleshooting

### Form Submission Fails

1. Check browser console for errors
2. Check API route logs
3. Verify environment variables are set
4. Test MongoDB connection
5. Check Resend API key is valid

### Email Not Received

1. Check Resend dashboard for delivery status
2. Check spam folder
3. Verify domain is set up correctly (if using custom domain)
4. Check `OWNER_EMAIL` is correct

### Database Connection Issues

1. Verify MongoDB URI is correct
2. Check database user credentials
3. Ensure IP address is whitelisted
4. Test connection using MongoDB Compass

## Cost Estimate

- **Resend**: Free tier includes 3,000 emails/month
- **MongoDB Atlas**: Free tier (M0) includes 512MB storage
- **Vercel**: Free tier includes unlimited hobby deployments

This setup is completely free for small to medium traffic websites!

## Support

For issues or questions:
- Resend: [https://resend.com/docs](https://resend.com/docs)
- MongoDB: [https://docs.mongodb.com](https://docs.mongodb.com)
- Vercel: [https://vercel.com/docs](https://vercel.com/docs)
