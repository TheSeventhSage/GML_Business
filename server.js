// Serves the site and saves paid bookings to data/bookings.json.
// No npm install, no build. Run with:  node --env-file=.env server.js

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const DB_FILE = path.join(__dirname, "data", "bookings.json");

// Save a booking after payment
async function saveBooking(req, res) {
  const booking = JSON.parse(await readBody(req));

  // Ask Paystack if this payment really happened (so nobody can fake a booking)
  const check = await fetch("https://api.paystack.co/transaction/verify/" + encodeURIComponent(booking.reference), {
    headers: { Authorization: "Bearer " + SECRET_KEY },
  }).then((r) => r.json());

  if (!check.status || check.data.status !== "success") {
    return send(res, 400, { error: "Payment not confirmed" });
  }

  const bookings = fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE, "utf8")) : [];
  if (!bookings.some((b) => b.reference === booking.reference)) {
    bookings.push({
      reference: booking.reference,
      full_name: booking.full_name,
      phone: booking.phone,
      email: booking.email,
      business_name: booking.business_name,
      format: booking.format,
      amount_paid: check.data.amount / 100,
      currency: check.data.currency,
      paid_at: check.data.paid_at,
    });
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(bookings, null, 2));
  }
  send(res, 200, { ok: true });
}

// Serve the HTML pages and assets/ folder only (never data/ or this file)
function serveFile(req, res) {
  let url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (url === "/") url = "/index.html";
  const file = path.join(__dirname, path.normalize(url));
  const rel = path.relative(__dirname, file);
  const isPage = !rel.includes(path.sep) && rel.endsWith(".html");
  const isAsset = rel.startsWith("assets" + path.sep);

  if ((!isPage && !isAsset) || !fs.existsSync(file)) {
    res.writeHead(404);
    return res.end("Not found");
  }
  const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml" };
  res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(body || "{}"));
  });
}

function send(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

http
  .createServer((req, res) => {
    if (req.method === "POST" && req.url === "/api/bookings") {
      saveBooking(req, res).catch((err) => {
        console.error(err);
        send(res, 500, { error: "Could not save booking" });
      });
    } else {
      serveFile(req, res);
    }
  })
  .listen(PORT, () => console.log("Site running at http://localhost:" + PORT));
