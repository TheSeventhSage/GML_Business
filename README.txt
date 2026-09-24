THE BUSINESS DIAGNOSTIC & ROADMAP SESSION — SITE HANDOFF
==========================================================

WHAT'S HERE
-----------
index.html              Home
the-diagnostic.html     What the session includes (qualifying page)
book-your-session.html  Booking form + payment
thank-you.html          Post-payment confirmation
assets/style.css        All styling (no framework, plain CSS)
assets/script.js        Mobile nav toggle

No build step. Open index.html directly in a browser to preview, or
upload the whole folder as-is to any static host (cPanel, Netlify,
GitHub Pages, etc).

BEFORE THIS GOES LIVE
----------------------
1. Payment. book-your-session.html uses Paystack's inline checkout.
   Open that file, find PAYSTACK_PUBLIC_KEY near the bottom, and
   replace the placeholder with the client's real Paystack public key.
   The client-side callback redirects to thank-you.html, but for
   anything you need to actually trust (confirming a slot, sending a
   receipt), set up a Paystack webhook on a small backend — don't rely
   on the browser callback alone as proof of payment.

2. Content placeholders. Every spot marked with a dashed underline
   (search the files for class="fill-me") needs a real value:
     - Phone number, email, city (site-wide, in the header/footer)
     - A one-line consultant bio (footer)
     - Rescheduling and refund policy text (book-your-session.html)
     - Privacy Policy / Terms & Conditions links (footer, currently
       plain text, not real pages)

3. Testimonials. The sales letter you gave me marks this as
   "[TESTIMONIALS]" too, meaning there's no real quote yet. I left it
   out entirely rather than invent one — add a short testimonials
   section once you have real client quotes to use; fabricated ones
   would be a liability on a payment page.

4. Booking data. The form currently only feeds Paystack (name,
   email, amount). It doesn't save anywhere on its own. Wire the
   submit handler in book-your-session.html to your CRM, a spreadsheet,
   or an email notification so bookings don't only exist inside
   Paystack's dashboard.

DESIGN NOTES
------------
Fonts: Fraunces (display) + IBM Plex Sans (body) + IBM Plex Mono (small
numeric/data labels), loaded from Google Fonts.
Icons: Font Awesome 6.5.2, loaded from cdnjs.
Palette: deep ink navy background, warm paper-white text, muted gold
accent for CTAs and "healthy" markers, a rust red used sparingly for
the pain-point/symptom list. All defined as CSS variables at the top
of assets/style.css if the brand wants adjustments.
