# Contact Form Testing Checklist

Use this checklist to verify all acceptance criteria are met.

## AC01: Contact Us Page Exists and Is Accessible from Navigation

- [ ] Click "Contact" in the navigation menu
- [ ] Page scrolls to the Contact section smoothly
- [ ] Contact form is visible on the page

## AC02: Page Contains Only a Contact Form

- [ ] ✅ Only the contact form is displayed
- [ ] ✅ No additional contact methods shown
- [ ] ✅ Form is centered and well-designed

## AC03: No Phone Number, Chat, Physical Address, or Map

- [ ] ✅ No phone number displayed
- [ ] ✅ No live chat widget
- [ ] ✅ No physical address shown
- [ ] ✅ No Google Maps or location map

## AC04: Contact Form Includes Mandatory Fields

- [ ] First Name field is present
- [ ] Last Name field is present
- [ ] Email Address field is present
- [ ] Query / Message field is present
- [ ] All fields are marked with asterisk (*)
- [ ] All fields have clear labels

## AC05: Email Field Validates Correct Email Format

Test with these inputs:

### Valid Emails (Should Accept)
- [ ] `john.doe@example.com` ✅
- [ ] `test+tag@domain.co.uk` ✅
- [ ] `user_name@company.org` ✅

### Invalid Emails (Should Reject)
- [ ] `notanemail` ❌ Shows error
- [ ] `missing@domain` ❌ Shows error
- [ ] `@nodomain.com` ❌ Shows error
- [ ] `spaces in@email.com` ❌ Shows error

## AC06: User Cannot Submit Form with Missing Fields

### Test Empty Fields
- [ ] Try submitting with all fields empty → Shows error for all fields
- [ ] Fill only First Name → Shows errors for other fields
- [ ] Fill only Email → Shows errors for other fields
- [ ] Fill all except Message → Shows error for Message
- [ ] Verify form does NOT submit when validation fails

### Test Whitespace Only
- [ ] Enter only spaces in First Name → Shows "required" error
- [ ] Enter only spaces in Message → Shows "required" error

## AC07: On Successful Submission

### Email Delivery
- [ ] Fill out all fields correctly
- [ ] Click "Send" button
- [ ] Check configured email inbox (OWNER_EMAIL)
- [ ] Verify email received with:
  - [ ] Subject: "New Contact Inquiry from [First] [Last]"
  - [ ] Sender name displayed correctly
  - [ ] Reply-to set to user's email
  - [ ] All form fields included in email body
  - [ ] Timestamp included
  - [ ] Inquiry ID included
  - [ ] Professional HTML formatting

### Success Confirmation
- [ ] Green success message appears at top of form
- [ ] Success message includes check icon
- [ ] Message text: "Thank you! Your inquiry has been successfully submitted..."
- [ ] Form fields are cleared after successful submission
- [ ] Page scrolls to show success message

### Backend Processing
- [ ] Check MongoDB Atlas → inquiries collection
- [ ] Verify new document created with:
  - [ ] firstName
  - [ ] lastName
  - [ ] email (lowercase)
  - [ ] message
  - [ ] createdAt timestamp
  - [ ] status: "pending"
- [ ] Check Resend dashboard for email delivery status

### Error Handling
- [ ] Test with invalid Resend API key → Shows error message
- [ ] Test with MongoDB down → Shows error message
- [ ] Error message is user-friendly (no technical details in production)

## AC08: No Inquiry Data Is Publicly Accessible

- [ ] ✅ No public API endpoint exposes inquiry data
- [ ] ✅ MongoDB data is private (requires authentication)
- [ ] ✅ Only owner receives email notifications
- [ ] ✅ No inquiry list is displayed on the website
- [ ] ✅ Database credentials are in .env (not in code)
- [ ] ✅ .env is in .gitignore

## AC09-11: Multi-language Support

### English (Default)
- [ ] Page loads in English by default
- [ ] All form labels in English:
  - [ ] "First Name"
  - [ ] "Last Name"
  - [ ] "Email Address"
  - [ ] "Query / Message"
- [ ] Button text: "Send"
- [ ] Success message in English
- [ ] Error messages in English
- [ ] Validation errors in English

### French
- [ ] Switch language to French
- [ ] Form labels translated:
  - [ ] "Prénom" (First Name)
  - [ ] "Nom de famille" (Last Name)
  - [ ] "Adresse e-mail" (Email Address)
  - [ ] "Question / Message" (Query/Message)
- [ ] Button: "Envoyer"
- [ ] Success message in French
- [ ] Error messages in French
- [ ] Validation errors in French

### German
- [ ] Switch language to German
- [ ] Form labels translated:
  - [ ] "Vorname" (First Name)
  - [ ] "Nachname" (Last Name)
  - [ ] "E-Mail-Adresse" (Email Address)
  - [ ] "Anfrage / Nachricht" (Query/Message)
- [ ] Button: "Senden"
- [ ] Success message in German
- [ ] Error messages in German
- [ ] Validation errors in German

### Language Consistency
- [ ] Language selection persists across page navigation
- [ ] Language selection saved to localStorage
- [ ] All parts of website use selected language
- [ ] No mixed-language content

## AC12: Contact Page Loads Without Noticeable Delay

### Performance Testing
- [ ] Initial page load < 2 seconds
- [ ] Form appears immediately (no lazy loading delay)
- [ ] Form inputs are immediately interactive
- [ ] Animations are smooth (60fps)
- [ ] No layout shifts during load
- [ ] Images optimized
- [ ] JavaScript bundle size reasonable

### Network Conditions
Test on different network speeds:
- [ ] Fast 3G - Page loads < 5 seconds
- [ ] Slow 3G - Page still usable
- [ ] Offline - Shows appropriate error

### Browser DevTools
- [ ] Run Lighthouse audit
- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 90

## AC13: Website Supports at Least 50 Concurrent Users

### Load Testing (Optional - Production Only)

Using tools like Apache Bench or k6:

```bash
# Example with Apache Bench (install first)
ab -n 500 -c 50 https://your-site.com/
```

Expected results:
- [ ] All 50 concurrent requests succeed
- [ ] Response time < 2 seconds average
- [ ] No server errors (500)
- [ ] No timeout errors
- [ ] MongoDB handles concurrent writes
- [ ] Resend handles concurrent emails

### Deployment Verification
- [ ] Deployed to Vercel (handles auto-scaling)
- [ ] MongoDB Atlas tier supports traffic
- [ ] Resend rate limits checked (3000/month on free tier)
- [ ] Environment variables set in production
- [ ] API routes working in production

## Additional Security & UX Tests

### Security
- [ ] HTTPS enabled in production
- [ ] CORS properly configured
- [ ] No API keys exposed in client code
- [ ] MongoDB connection string not in client bundle
- [ ] Input sanitization working (no XSS)
- [ ] No SQL injection possible (using MongoDB drivers)

### User Experience
- [ ] Form validation is instant (on blur/change)
- [ ] Error messages are helpful
- [ ] Success state is clear
- [ ] Submit button disabled during submission
- [ ] Submit button shows loading state ("Sending...")
- [ ] Users can't double-submit
- [ ] Form works on mobile devices
- [ ] Form works on tablets
- [ ] Form works on all major browsers:
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

### Accessibility
- [ ] All form fields have proper labels
- [ ] Form is keyboard navigable (Tab key)
- [ ] Focus states are visible
- [ ] Error messages are announced to screen readers
- [ ] Color contrast meets WCAG standards
- [ ] Works with screen readers (VoiceOver, NVDA)

## Final Checklist

- [ ] All acceptance criteria (AC01-AC13) passed
- [ ] No console errors in browser
- [ ] No network errors (check DevTools)
- [ ] Email delivery confirmed
- [ ] Database storage confirmed
- [ ] All languages tested
- [ ] Mobile responsive
- [ ] Production deployment successful

## Test Reports

### Test Date: _______________
### Tester: _______________
### Environment: [ ] Local [ ] Staging [ ] Production

### Issues Found:
(List any issues discovered during testing)

1. 
2. 
3. 

### Notes:
(Any additional observations)

---

✅ **All tests passed** - Ready for production
❌ **Issues found** - Requires fixes before deployment
