# Business Diagnostic Platform

## Project Overview

This project is a simple static website for the Business Diagnostic & Roadmap Session.

The site guides visitors from the main landing page through the session information and booking process, including payment through Paystack.

There is no build process or framework involved. The project uses plain HTML, CSS, and JavaScript.

## Project Structure

```text
/
├── index.html
├── the-diagnostic.html
├── book-your-session.html
├── thank-you.html
│
└── assets/
    ├── style.css
    └── script.js
```

### Pages

**index.html**
Home page and primary landing page.

**the-diagnostic.html**
Explains what the diagnostic session includes and helps qualify potential clients.

**book-your-session.html**
Contains the booking form and Paystack payment integration.

**thank-you.html**
Displayed after the payment flow is completed.

### Assets

**assets/style.css**
Contains all site styling. No CSS framework is used.

**assets/script.js**
Contains the JavaScript used for the mobile navigation toggle.

## Running the Project

There is no build step.

To preview the site locally, open `index.html` directly in a browser.

For deployment, upload the entire project folder to any static hosting service, such as:

- cPanel
- Netlify
- GitHub Pages
- Other static hosting services

Make sure the folder structure is preserved when uploading.

---

# Before Going Live

The following items need to be completed before the website is used publicly.

## 1. Paystack Payment Setup

The booking page uses Paystack's inline checkout.

Open:

```text
book-your-session.html
```

Find:

```javascript
PAYSTACK_PUBLIC_KEY;
```

Replace the value with the client's actual Paystack public key.

### Payment Verification

The current payment flow redirects the customer to `thank-you.html` through the client-side Paystack callback.

The browser callback should not be treated as reliable proof that a payment has been completed.

For anything that depends on confirmed payment, such as:

- Confirming a booking
- Reserving a session slot
- Sending a receipt
- Updating booking status

a Paystack webhook should be implemented on a backend.

---

### Legal Pages

The footer currently contains links for:

- Privacy Policy
- Terms & Conditions

---

## 2. Booking Data

After a successful payment, the booking is saved to `data/bookings.json` by `server.js`. It is a single file with no npm packages and no build step, and it needs Node.js 20.6 or newer.

**Setup (one time):**

1. Copy `.env.example` to `.env`.
2. Put the Paystack **secret** key in `.env` (Paystack dashboard > Settings > API Keys & Webhooks). Never put the secret key in the HTML.

**Run:**

```bash
node --env-file=.env server.js
```

Then open `http://localhost:3000`. Pages must be opened through the server, not by double-clicking the HTML file, or bookings won't save.

Before saving, the server checks each payment with Paystack, so fake bookings can't be added. Each record looks like this:

```json
{
  "reference": "diag_1727258400000_48213",
  "full_name": "Ada Obi",
  "phone": "0803...",
  "email": "ada@example.com",
  "business_name": "Obi Foods",
  "format": "in-person",
  "amount_paid": 150000,
  "currency": "NGN",
  "paid_at": "2026-09-25T10:02:00.000Z"
}
```

`data/` and `.env` are git-ignored, because they hold customer details and the secret key. The server only serves the HTML pages and `assets/`, so neither can be downloaded from the site.

**Hosting:** the host must run Node.js, for example cPanel's "Setup Node.js App", Render, Railway or a VPS. Set `PAYSTACK_SECRET_KEY` in the host's environment settings. Static-only hosts such as GitHub Pages or Netlify can't save bookings.

---

# Design

The site uses a custom visual style built entirely with CSS.

## Fonts

Three fonts are used:

- **Fraunces** for display headings
- **IBM Plex Sans** for general body text
- **IBM Plex Mono** for small numeric and data labels

The fonts are loaded from Google Fonts.

## Icons

The site uses **Font Awesome 6.5.2**, loaded through cdnjs.

## Colour Palette

The main visual palette consists of:

- Deep ink navy for the background
- Warm paper-white for primary text
- Muted gold for CTAs and positive or healthy indicators
- Rust red for pain points and symptom-related content

The colours are defined as CSS variables at the top of:

```text
assets/style.css
```

This makes it straightforward to adjust the brand colours without changing individual components throughout the stylesheet.

---

# Deployment Checklist

Before the site goes live, confirm that:

- [ ] Paystack public key has been added
- [ ] Paystack webhook/backend verification has been implemented where required
- [ ] Phone number has been added
- [ ] Email address has been added
- [ ] City has been added
- [ ] Consultant bio has been added
- [ ] Rescheduling policy has been added
- [ ] Refund policy has been added
- [ ] Privacy Policy page/link has been added
- [ ] Terms & Conditions page/link has been added
- [ ] Booking data storage/notification has been connected
- [ ] Real testimonials have been added when available
- [ ] All pages have been tested on mobile
- [ ] Payment flow has been tested before accepting real bookings

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Paystack Inline Checkout
- Google Fonts
- Font Awesome
