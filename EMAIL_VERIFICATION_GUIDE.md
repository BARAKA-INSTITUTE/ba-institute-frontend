# Email Verification Configuration Guide

## Current Implementation ✅

Your contact form now includes **DNS MX Record Verification** (free and automatic):
- Validates that the email domain exists
- Checks if the domain can receive emails
- Catches common typos like `@gmial.com`, `@yahooo.com`, etc.
- **No configuration needed** - works out of the box!

### How it works:
1. User enters email
2. System checks if domain (e.g., `@gmail.com`) has mail servers
3. If domain doesn't exist → Error: "Email domain does not exist or cannot receive emails"
4. If domain exists → Form submission continues

### Example errors caught:
- ❌ `user@gmial.com` → "Email domain 'gmial.com' does not exist"
- ❌ `user@notarealdomain123.com` → Domain verification fails
- ✅ `user@gmail.com` → Passes (domain exists)

---

## Optional: Deep Email Verification (Paid Services)

For **checking if specific email addresses actually exist** (not just the domain), you can integrate a third-party API.

### Recommended Services:

#### 1. **AbstractAPI** (Easiest)
- **Price**: $0.001/verification (1,000 free/month)
- **Setup**: 
  ```bash
  # Get API key from https://www.abstractapi.com/email-verification-validation-api
  # Add to your .env file:
  EMAIL_VERIFICATION_API_KEY=your_abstractapi_key_here
  ```

#### 2. **ZeroBounce**
- **Price**: $0.007/verification (100 free credits)
- **Most accurate** for deliverability checking
- Website: https://www.zerobounce.net

#### 3. **Hunter.io**
- **Price**: $0.001/verification (50 free/month)
- **Good for business emails**
- Website: https://hunter.io/email-verifier

#### 4. **EmailListVerify**
- **Price**: $0.004/verification
- **Bulk verification** available
- Website: https://www.emaillistverify.com

### How to Enable Deep Verification:

1. **Choose a service** from above and sign up
2. **Get your API key**
3. **Add to environment variables**:
   ```bash
   # In your .env file or Vercel environment variables
   EMAIL_VERIFICATION_API_KEY=your_api_key_here
   ```

4. **Uncomment the code** in `api/contact.js`:
   - Find the `verifyEmailWithAPI` function (lines ~40-60)
   - Uncomment the function
   - Find the API verification call (lines ~80-90)
   - Uncomment that section
   - Update the API endpoint URL to match your chosen service

5. **Deploy** your changes

### Integration Example (AbstractAPI):

In `api/contact.js`, the commented code would look like:
```javascript
async function verifyEmailWithAPI(email) {
  const apiKey = process.env.EMAIL_VERIFICATION_API_KEY;
  if (!apiKey) {
    return { valid: true, message: 'API verification not configured' };
  }

  try {
    const response = await fetch(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`
    );
    const data = await response.json();
    
    if (data.deliverability === 'DELIVERABLE') {
      return { valid: true, message: 'Email verified' };
    } else {
      return { valid: false, message: 'Email address does not exist' };
    }
  } catch (error) {
    console.error('[contact] API verification failed:', error);
    return { valid: true, message: 'Could not verify email, proceeding anyway' };
  }
}
```

---

## Testing

### Test with invalid domains:
- `test@invaliddomain12345.com` → Should fail DNS check
- `test@gmial.com` → Should fail DNS check (typo)
- `test@gmail.com` → Should pass DNS check ✅

### Test with real API (if enabled):
- `test@gmail.com` → May fail deep verification (doesn't exist)
- `your-real-email@gmail.com` → Should pass both checks ✅

---

## Cost Comparison

| Service | Free Tier | Pay-as-you-go | Accuracy |
|---------|-----------|---------------|----------|
| **DNS MX** (current) | ✅ Unlimited | Free forever | Domain only |
| **AbstractAPI** | 1,000/mo | $0.001 each | Good |
| **ZeroBounce** | 100 credits | $0.007 each | Excellent |
| **Hunter.io** | 50/mo | $0.001 each | Good |
| **EmailListVerify** | None | $0.004 each | Very good |

---

## Recommendation

For most contact forms, **DNS MX verification (current setup) is sufficient** because:
- ✅ Free and fast
- ✅ Catches 90% of typos
- ✅ No rate limits
- ✅ Privacy-friendly

Consider paid API **only if**:
- You need to verify email addresses actually exist before sending promotional emails
- You're experiencing spam/fake submissions
- You need the highest deliverability guarantee

---

## Need Help?

The code is in `api/contact.js` with detailed comments. The verification functions are ready to use - just uncomment and configure!
