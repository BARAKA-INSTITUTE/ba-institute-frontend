# Contact Form Architecture

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│                                                                 │
│  ┌───────────────────────────────────────────────────────┐    │
│  │           Contact Form Component                       │    │
│  │           (src/pages/Contact.jsx)                     │    │
│  │                                                        │    │
│  │  ┌──────────────────────────────────────────────┐    │    │
│  │  │  Form Fields:                                 │    │    │
│  │  │  • First Name (required)                      │    │    │
│  │  │  • Last Name (required)                       │    │    │
│  │  │  • Email (required, validated)                │    │    │
│  │  │  • Message (required)                         │    │    │
│  │  └──────────────────────────────────────────────┘    │    │
│  │                                                        │    │
│  │  ┌──────────────────────────────────────────────┐    │    │
│  │  │  Client-Side Validation                       │    │    │
│  │  │  • Required field check                       │    │    │
│  │  │  • Email regex validation                     │    │    │
│  │  │  • Real-time error display                    │    │    │
│  │  │  • Multi-language error messages             │    │    │
│  │  └──────────────────────────────────────────────┘    │    │
│  │                                                        │    │
│  │               ↓ (on submit)                           │    │
│  │                                                        │    │
│  │  ┌──────────────────────────────────────────────┐    │    │
│  │  │  fetch('/api/contact', {                      │    │    │
│  │  │    method: 'POST',                            │    │    │
│  │  │    body: JSON.stringify(formData)            │    │    │
│  │  │  })                                           │    │    │
│  │  └──────────────────────────────────────────────┘    │    │
│  └───────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS POST Request
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    VERCEL SERVERLESS FUNCTION                   │
│                    (api/contact.js)                             │
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐      │
│  │  Server-Side Validation                              │      │
│  │  • Check all required fields                         │      │
│  │  • Validate email format                             │      │
│  │  • Sanitize input (trim whitespace)                 │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                 │
│                    ↓ (parallel operations)                      │
│                                                                 │
│  ┌─────────────────────┐          ┌──────────────────────┐    │
│  │   MongoDB Save      │          │   Resend Email       │    │
│  │                     │          │                      │    │
│  │  Store inquiry:     │          │  Send notification   │    │
│  │  • firstName        │          │  to owner email      │    │
│  │  • lastName         │          │                      │    │
│  │  • email            │          │  Email contains:     │    │
│  │  • message          │          │  • User details      │    │
│  │  • createdAt        │          │  • Message           │    │
│  │  • status: pending  │          │  • Timestamp         │    │
│  │  • _id (auto)       │          │  • Inquiry ID        │    │
│  └─────────────────────┘          └──────────────────────┘    │
│           │                                    │                │
└───────────┼────────────────────────────────────┼────────────────┘
            │                                    │
            ↓                                    ↓
┌─────────────────────┐          ┌──────────────────────────┐
│   MongoDB Atlas     │          │   Resend Service         │
│                     │          │                          │
│  Database:          │          │  Routes email to:        │
│  barakah-it         │          │  OWNER_EMAIL             │
│                     │          │                          │
│  Collection:        │          │  Delivery tracking       │
│  inquiries          │          │  available in dashboard  │
│                     │          │                          │
│  Stored securely    │          │  From: noreply@...       │
│  with indexes       │          │  Reply-To: user email    │
└─────────────────────┘          └──────────────────────────┘
            │                                    │
            │                                    ↓
            │                        ┌────────────────────┐
            │                        │  Owner Email Inbox │
            │                        │                    │
            │                        │  Receives:         │
            │                        │  • Formatted email │
            │                        │  • All details     │
            │                        │  • Can reply       │
            │                        └────────────────────┘
            │
            ↓ (success response)
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│                                                                 │
│  ┌───────────────────────────────────────────────────────┐    │
│  │           Success State                                │    │
│  │                                                        │    │
│  │  ✓ Green success message displayed                    │    │
│  │  ✓ "Thank you! Your inquiry has been submitted..."   │    │
│  │  ✓ Form fields cleared                                │    │
│  │  ✓ Page scrolls to show message                       │    │
│  └───────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Form Submission (Client → Server)

```javascript
// User fills form and clicks "Send"
{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john.doe@example.com",
  "message": "I would like to know more about your courses."
}
```

**↓ POST /api/contact**

### 2. Server Processing

**Validation:**
- Check all fields present ✓
- Validate email format ✓
- Trim whitespace ✓

**Parallel Operations:**

**A. MongoDB Storage:**
```javascript
{
  "_id": ObjectId("..."),
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "message": "I would like to know more about your courses.",
  "createdAt": ISODate("2024-02-07T14:30:00.000Z"),
  "status": "pending"
}
```

**B. Email Sending (via Resend):**
```
From: Barakah IT Contact Form <noreply@barakah-it.com>
To: info@barakah-it.com
Reply-To: john.doe@example.com
Subject: New Contact Inquiry from John Doe

[Professional HTML email with all details]
```

### 3. Response to Client

**Success:**
```javascript
{
  "success": true,
  "message": "Inquiry submitted successfully",
  "inquiryId": "65c3f8a9b8c9d2e4f5a6b7c8"
}
```

**Error:**
```javascript
{
  "error": "Failed to submit inquiry"
}
```

## Technology Stack

```
┌─────────────────────────────────────────────────┐
│              FRONTEND LAYER                     │
├─────────────────────────────────────────────────┤
│ React 19          → UI Components               │
│ Tailwind CSS 4    → Styling                     │
│ GSAP              → Animations                  │
│ react-i18next     → Multi-language              │
│ Vite              → Build Tool                  │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│              API LAYER                          │
├─────────────────────────────────────────────────┤
│ Vercel Functions  → Serverless API              │
│ Express.js        → Dev Server                  │
│ Node.js           → Runtime                     │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│              EXTERNAL SERVICES                  │
├─────────────────────────────────────────────────┤
│ Resend            → Email Delivery              │
│ MongoDB Atlas     → Database Storage            │
└─────────────────────────────────────────────────┘
```

## Environment Variables Flow

```
Development (.env file):
┌────────────────────────────┐
│ RESEND_API_KEY=re_xxx      │
│ MONGODB_URI=mongodb+srv... │
│ MONGODB_DB_NAME=barakah-it │
│ OWNER_EMAIL=info@...       │
└────────────────────────────┘
           │
           ↓ (loaded by)
┌────────────────────────────┐
│ server.js (local dev)      │
│ OR                         │
│ Vercel Functions (prod)    │
└────────────────────────────┘
           │
           ↓ (used by)
┌────────────────────────────┐
│ api/contact.js             │
│ - Resend client init       │
│ - MongoDB connection       │
└────────────────────────────┘
```

## Security Layers

```
┌─────────────────────────────────────────┐
│  1. Client-Side Validation              │
│     • Required fields                   │
│     • Email format                      │
│     • Prevents unnecessary API calls    │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  2. Server-Side Validation              │
│     • Re-validate all inputs            │
│     • Sanitize data (trim)              │
│     • Email format check                │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  3. Environment Variables               │
│     • API keys in .env                  │
│     • Not in code or version control    │
│     • .gitignore protection             │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  4. HTTPS (Production)                  │
│     • Encrypted data transmission       │
│     • Vercel provides SSL               │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  5. Database Security                   │
│     • MongoDB Atlas authentication      │
│     • IP whitelist                      │
│     • Encrypted connections             │
└─────────────────────────────────────────┘
```

## Deployment Architecture

```
LOCAL DEVELOPMENT:
┌──────────────┐     ┌──────────────┐
│ Vite Dev     │────▶│ Express API  │
│ :5173        │     │ :3001        │
└──────────────┘     └──────────────┘
                            │
                            ↓
                    ┌──────────────┐
                    │ Resend API   │
                    │ MongoDB      │
                    └──────────────┘

PRODUCTION (Vercel):
┌──────────────────────────────────┐
│         Vercel CDN               │
│  ┌────────────────────────┐      │
│  │ Static Assets (React)  │      │
│  └────────────────────────┘      │
│                                  │
│  ┌────────────────────────┐      │
│  │ Serverless Functions   │      │
│  │ /api/contact.js        │      │
│  └────────────────────────┘      │
└──────────────────────────────────┘
             │
             ↓
    ┌──────────────┐
    │ Resend API   │
    │ MongoDB      │
    └──────────────┘
```

## Performance Considerations

```
┌─────────────────────────────────────────┐
│  Frontend Optimizations                 │
├─────────────────────────────────────────┤
│ • Code splitting (React.lazy)           │
│ • Tree shaking (Vite)                   │
│ • Minification (production build)       │
│ • Lazy loading of components            │
│ • Optimized images                      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Backend Optimizations                  │
├─────────────────────────────────────────┤
│ • MongoDB connection pooling            │
│ • Cached DB connections                 │
│ • Parallel email/DB operations          │
│ • Vercel edge network                   │
│ • Auto-scaling                          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  External Service Limits                │
├─────────────────────────────────────────┤
│ • Resend: 3,000 emails/month (free)     │
│ • MongoDB: 512MB storage (free tier)    │
│ • Vercel: Unlimited requests (hobby)    │
└─────────────────────────────────────────┘
```

## Error Handling Flow

```
Form Submit
    │
    ↓
Client Validation
    │
    ├─ FAIL → Display error messages
    │              (stay on form)
    │
    ↓ PASS
    │
API Request
    │
    ↓
Server Validation
    │
    ├─ FAIL → 400 Response
    │              ↓
    │         Display error message
    │              (stay on form)
    │
    ↓ PASS
    │
Save to MongoDB
    │
    ├─ FAIL → 500 Response
    │              ↓
    │         Display error message
    │              (stay on form)
    │
    ↓ SUCCESS
    │
Send Email
    │
    ├─ FAIL → 500 Response
    │              ↓
    │         Display error message
    │         (data saved but email failed)
    │
    ↓ SUCCESS
    │
200 Response
    ↓
Display success message
Clear form
Scroll to top
```

## Multi-Language Architecture

```
┌────────────────────────────────┐
│  Language Files                │
│                                │
│  /locales/en/translation.json  │
│  /locales/fr/translation.json  │
│  /locales/de/translation.json  │
└────────────────────────────────┘
            │
            ↓ (loaded by)
┌────────────────────────────────┐
│  i18next Configuration         │
│  (src/i18n.js)                 │
└────────────────────────────────┘
            │
            ↓ (used by)
┌────────────────────────────────┐
│  Contact Component             │
│                                │
│  const { t } = useTranslation()│
│  t('contactContent.title')     │
│  t('contactContent.form....")  │
└────────────────────────────────┘
            │
            ↓ (renders)
┌────────────────────────────────┐
│  Localized UI                  │
│  • Labels in selected language │
│  • Errors in selected language │
│  • Messages in selected lang   │
└────────────────────────────────┘
```

---

**This architecture ensures:**
- ✅ Separation of concerns
- ✅ Scalability
- ✅ Security
- ✅ Performance
- ✅ Maintainability
- ✅ Internationalization
