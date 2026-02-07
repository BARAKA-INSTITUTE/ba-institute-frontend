// Simple Express server for local development API testing
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import API handler
const contactModule = await import('./api/contact.js');
const contactHandler = contactModule.default;

// API routes
app.post('/api/contact', async (req, res) => {
  // Wrap the serverless function to work with Express
  try {
    await contactHandler(req, res);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`\n🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📧 Resend API: ${process.env.RESEND_API_KEY ? '✓ Configured' : '✗ Missing'}`);
  console.log(`🗄️  MongoDB: ${process.env.MONGODB_URI ? '✓ Configured' : '✗ Missing'}`);
  console.log(`📬 Owner Email: ${process.env.OWNER_EMAIL || 'Not set'}\n`);
});
