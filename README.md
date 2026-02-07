# Barakah IT Institute - Frontend

A modern, responsive website for Barakah IT Institute built with React, Vite, and Tailwind CSS. Features multi-language support, dark mode, and a comprehensive contact form with backend integration.

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, professional design with smooth animations (GSAP)
- 🌐 **Multi-language Support** - English, French, and German (i18next)
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works perfectly on all devices
- 📧 **Contact Form** - Integrated with Resend for email delivery
- 💾 **Database Integration** - MongoDB for storing inquiries
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development
- 🎭 **Smooth Animations** - GSAP for beautiful scroll-based animations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB Atlas account (for contact form)
- Resend account (for email delivery)

### Installation & Running

See [QUICKSTART.md](./QUICKSTART.md) for detailed development setup instructions.

Quick commands:
```bash
# Install dependencies
npm install

# Install API dependencies
cd api && npm install && cd ..

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Run frontend (Terminal 1)
npm run dev

# Run backend API (Terminal 2)
node server.js
```

Visit `http://localhost:5173` (check terminal for actual port)

## 📋 Project Structure

```
proj-BA-frontend/
├── api/                    # Backend API (serverless functions)
│   ├── contact.js         # Contact form handler
│   └── package.json       # API dependencies
├── public/                # Static assets
├── src/
│   ├── assets/           # Images, icons, etc.
│   ├── components/       # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Sidebar.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── LanguageSwitcher.jsx
│   ├── locales/          # Translation files
│   │   ├── en/
│   │   ├── fr/
│   │   └── de/
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── FAQ.jsx
│   │   ├── Contact.jsx  # ⭐ New contact form
│   │   └── Testimonials.jsx
│   ├── utils/            # Utility functions and constants
│   ├── App.jsx           # Main app component
│   ├── i18n.js          # Internationalization config
│   └── main.jsx         # Entry point
├── server.js            # Development API server
├── vercel.json          # Vercel deployment config
├── .env.example         # Environment variables template
└── README_CONTACT_SETUP.md  # Detailed contact form setup

```

## 📧 Contact Form Features

The contact form meets all acceptance criteria:

✅ **AC01-03**: Contact Us page accessible from navigation with form only
✅ **AC04**: Mandatory fields - First Name, Last Name, Email, Query/Message
✅ **AC05**: Email format validation
✅ **AC06**: Cannot submit with missing fields
✅ **AC07**: Sends to owner's email + success confirmation
✅ **AC08**: No data publicly accessible (stored in MongoDB)
✅ **AC09-11**: Multi-language support (EN/FR/DE)
✅ **AC12-13**: Optimized performance, supports 50+ concurrent users

### Setup Instructions

For detailed setup of Resend and MongoDB integration:
- See [README_CONTACT_SETUP.md](./README_CONTACT_SETUP.md)

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **GSAP** - Animations
- **i18next** - Internationalization
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime
- **Express** - Server framework (dev)
- **Resend** - Email delivery service
- **MongoDB** - Database
- **Vercel Functions** - Serverless API (production)

## 🌍 Available Languages

- 🇬🇧 English (default)
- 🇫🇷 French
- 🇩🇪 German

All content including form labels, validation messages, and success/error notifications are fully translated.

## 🎨 Themes

- ☀️ Light Mode
- 🌙 Dark Mode

Theme preference is saved to localStorage.

## 📱 Pages & Sections

1. **Home** - Hero section with call-to-action
2. **About** - Institute information and mission
3. **Services** - Business analysis services offered
4. **FAQ** - Frequently asked questions
5. **Contact** - Inquiry form ⭐ NEW
6. **Testimonials** - (In development)

## 🔧 Development

```bash
# Start development servers
npm run dev           # Frontend (Vite)
node server.js        # Backend API

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables in Vercel dashboard:
   - `RESEND_API_KEY`
   - `MONGODB_URI`
   - `MONGODB_DB_NAME`
   - `OWNER_EMAIL`

4. Production deployment:
```bash
vercel --prod
```

See [README_CONTACT_SETUP.md](./README_CONTACT_SETUP.md) for detailed deployment instructions.

## 📄 Documentation

- [QUICKSTART.md](./QUICKSTART.md) - Quick development setup
- [README_CONTACT_SETUP.md](./README_CONTACT_SETUP.md) - Contact form integration guide
- [.env.example](./.env.example) - Environment variables template

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary to Barakah IT Institute.

## 📞 Support

For questions or support, please use the contact form on the website or reach out to the development team.

---

**Built with ❤️ for Barakah IT Institute**
