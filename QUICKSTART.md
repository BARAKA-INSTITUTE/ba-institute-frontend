# Quick Start Guide - Development Mode

This guide will help you run the project locally for development and testing.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Step 1: Install Frontend Dependencies

```bash
npm install
```

## Step 2: Install Backend Dependencies

```bash
cd api
npm install
cd ..
```

Or if you prefer to install server dependencies for local testing:

```bash
npm install express cors dotenv mongodb resend
```

## Step 3: Set Up Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your credentials:
```env
RESEND_API_KEY=re_your_actual_api_key_here
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DB_NAME=barakah-it
OWNER_EMAIL=your-email@example.com
NODE_ENV=development
```

**Note:** For detailed setup instructions for Resend and MongoDB, see [README_CONTACT_SETUP.md](./README_CONTACT_SETUP.md)

## Step 4: Run the Development Servers

You need to run TWO servers simultaneously:

### Terminal 1 - Frontend (Vite)
```bash
npm run dev
```
This will start the Vite dev server at `http://localhost:5173` (or similar)

### Terminal 2 - Backend API (Express)
```bash
node server.js
```
This will start the API server at `http://localhost:3001`

## Step 5: Access the Application

Open your browser and navigate to:
- Frontend: `http://localhost:5173` (check terminal for actual port)
- The Contact form will proxy API requests to `http://localhost:3001`

## Testing the Contact Form

1. Navigate to the Contact section by clicking "Contact" in the navigation
2. Fill out all required fields:
   - First Name
   - Last Name
   - Email Address
   - Query/Message
3. Click "Send"
4. Check:
   - Success message appears on the page
   - Email arrives at the configured `OWNER_EMAIL`
   - Entry is created in MongoDB Atlas

## Common Issues

### Port Already in Use

If port 3001 is already in use, edit `server.js` and change:
```javascript
const PORT = process.env.PORT || 3002; // Use different port
```

Then update `vite.config.js`:
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3002', // Match new port
      changeOrigin: true,
    },
  },
},
```

### CORS Errors

If you see CORS errors, make sure:
1. Both servers are running
2. The proxy is configured in `vite.config.js`
3. The backend server has CORS enabled (already configured in `server.js`)

### Environment Variables Not Loading

Make sure:
1. `.env` file is in the root directory
2. Variables don't have quotes (e.g., `KEY=value` not `KEY="value"`)
3. Restart the backend server after changing `.env`

## Alternative: Using Vercel CLI

For a production-like environment:

```bash
# Install Vercel CLI globally
npm install -g vercel

# Run development environment
vercel dev
```

This will automatically:
- Start the frontend
- Handle API routes
- Load environment variables from Vercel

## Building for Production

```bash
npm run build
```

This creates a `dist` folder with production-ready files.

To preview the production build locally:
```bash
npm run preview
```

## Next Steps

- See [README_CONTACT_SETUP.md](./README_CONTACT_SETUP.md) for detailed Resend and MongoDB setup
- Deploy to Vercel for production use
- Customize email templates in `api/contact.js`
- Add rate limiting for production

## Support

If you encounter issues, check:
1. All dependencies are installed (`node_modules` exists)
2. Both servers are running
3. Environment variables are set correctly
4. MongoDB and Resend credentials are valid
