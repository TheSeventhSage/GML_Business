# Business Diagnostic Platform

## Project Overview

This project is a simple static website for the Business Diagnostic & Roadmap Session.

The site guides visitors from the main landing page through the session information and booking process, including the booking form.

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
Contains the booking form. Submitting it saves the details and sends the visitor to `thank-you.html`.

**thank-you.html**
Displayed after the booking form is submitted, then redirects to the TidyCal booking page.

### Assets

**assets/css/style.css**
Contains all site styling. No CSS framework is used.

**assets/js/script.js**
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

## 1. Booking Form

The form has no payment step. It saves the visitor's details, then sends them to `thank-you.html`, which redirects to the TidyCal page.

---

### Legal Pages

The footer currently contains links for:

- Privacy Policy
- Terms & Conditions

---

## 2. Booking Data

The site is fully static and has no backend. The booking form does not store anything: submitting it sends the visitor to `thank-you.html`, which redirects to the TidyCal page, where the booking itself is recorded.

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
assets/css/style.css
```

This makes it straightforward to adjust the brand colours without changing individual components throughout the stylesheet.

---

# Deployment Checklist

Before the site goes live, confirm that:

- [ ] Phone number has been added
- [ ] Email address has been added
- [ ] City has been added
- [ ] Consultant bio has been added
- [ ] Rescheduling policy has been added
- [ ] Refund policy has been added
- [ ] Privacy Policy page/link has been added
- [ ] Terms & Conditions page/link has been added
- [ ] Real testimonials have been added when available
- [ ] All pages have been tested on mobile
- [ ] Booking form has been tested before accepting real bookings

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts
- Font Awesome
