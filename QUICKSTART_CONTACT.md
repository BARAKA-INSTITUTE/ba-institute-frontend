# Quick Start Guide

## ✅ Setup Complete!

Your contact form now connects directly to MongoDB using Mongoose with connection caching - no separate backend server needed!

## 🚀 Running the App

### For Quick Frontend Development:
```bash
npm run dev
```
- Runs on `http://localhost:5173`
- Fast development mode
- Contact form API won't work (needs deployment or full stack mode)

### For Full Stack Testing (with Contact Form):
```bash
npm run dev:full
```
- Runs on `http://localhost:3000`
- Includes serverless API functions
- When prompted "Would you like to pull environment variables?", answer **n** (we're using local `.env`)
- Test the complete contact form functionality

## 📝 What Changed

### ✨ Simplified Architecture:
- ❌ **Removed**: Separate Express backend server
- ✅ **Added**: Direct MongoDB connection with Mongoose
- ✅ **Added**: Connection caching for serverless efficiency
- ✅ **Added**: Vercel CLI for local API testing

### 📦 Updated Files:
1. **`api/contact.js`** - Now uses Mongoose with cached connections
2. **`api/package.json`** - Updated to use `mongoose` instead of `mongodb`
3. **`vite.config.js`** - Removed proxy configuration
4. **`vercel.json`** - Configured for Vercel deployment
5. **`.env`** - Cleaned up environment variables

### 🔗 How It Works:
```
User fills form → Frontend sends to /api/contact → 
Serverless function → Connects to MongoDB (cached) → 
Saves inquiry + Sends email → Returns success
```

## 🧪 Testing

1. Start the full stack server:
   ```bash
   npm run dev:full
   ```

2. Answer **n** when asked about environment variables

3. Visit: `http://localhost:3000/contact`

4. Fill out the contact form and submit

5. Check:
   - ✅ Success message appears
   - ✅ Email received at `vistulaabubakrsiddik@gmail.com`
   - ✅ Entry saved in MongoDB `inquiries` collection

## 🚢 Deployment to Vercel

1. Push code to GitHub

2. Import project in Vercel

3. Add environment variables:
   - `RESEND_API_KEY`
   - `MONGODB_URI`
   - `MONGODB_DB_NAME`
   - `OWNER_EMAIL`

4. Deploy! The serverless API works automatically.

## 📊 Database Schema

Collection: `Inquiries`
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  message: String,
  status: 'pending',  // pending, reviewed, resolved
  createdAt: Date
}
```

## 🔍 Troubleshooting

**Can't connect to MongoDB:**
- Check MongoDB Atlas allows connections from 0.0.0.0/0
- Verify USERNAME and PASSWORD in connection string
- Test connection string in MongoDB Compass

**Email not sending:**
- Verify Resend API key is active
- Check domain verification in Resend
- Update `from` email in `api/contact.js` if needed

**Vercel dev not starting:**
- Make sure you're in the project directory
- Run `vercel login` if needed
- Answer 'n' when asked about pulling env variables

---

**Current Environment Variables:**
- ✅ RESEND_API_KEY: Configured
- ✅ MONGODB_URI: Configured  
- ✅ MONGODB_DB_NAME: barakah-it
- ✅ OWNER_EMAIL: vistulaabubakrsiddik@gmail.com

Everything is ready to go! 🎉
