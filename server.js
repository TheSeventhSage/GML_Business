// Serves the site and saves booking requests to data/bookings.json.
// No npm install, no build. Run with:  node server.js

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, "data", "bookings.json");
const FIELDS = ["full_name", "phone", "email", "business_name"];

async function saveBooking(req, res) {
  const input = JSON.parse(await readBody(req));
  const clean = (v) => String(v || "").trim().slice(0, 200);

  const booking = { id: crypto.randomUUID() };
  for (const f of FIELDS) booking[f] = clean(input[f]);
  booking.format = input.format === "video-call" ? "video-call" : "in-person";
  booking.submitted_at = new Date().toISOString();

  if (FIELDS.some((f) => !booking[f])) {
    return send(res, 400, { error: "Missing details" });
  }

  const bookings = fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE, "utf8")) : [];
  bookings.push(booking);
  fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
  fs.writeFileSync(DB_FILE, JSON.stringify(bookings, null, 2));
  send(res, 200, { ok: true });
}

// Serve the HTML pages and assets/ folder only (never data/ or this file)
function serveFile(req, res) {
  let url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (url === "/") url = "/index.html";
  const file = path.join(__dirname, path.normalize(url));
  const rel = path.relative(__dirname, file);
  const isPage = !rel.includes(path.sep) && rel.endsWith(".html");
  const isSeoFile = rel === "robots.txt" || rel === "sitemap.xml";
  const isAsset = rel.startsWith("assets" + path.sep);

  if ((!isPage && !isAsset && !isSeoFile) || !fs.existsSync(file)) {
    res.writeHead(404);
    return res.end("Not found");
  }
  const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".txt": "text/plain", ".xml": "application/xml" };
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
