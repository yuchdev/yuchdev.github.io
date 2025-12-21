// contact.js
// Temporary static-only implementation:
// - Collect form fields
// - Apply basic anti-bot checks (honeypot + min time + simple client-side throttling)
// - Open user's mail client with a prefilled mailto: link
//
// NOTE: Static sites cannot safely "send email" themselves without a backend.
// This is a stopgap until you add a serverless endpoint next weekend.

(function () {
  "use strict";

  // === Configure your weekly alias HERE (obfuscated to reduce scraping) ===
  // Replace the string below with your NEW alias each week.
  // How to generate: in DevTools console -> btoa("alias@example.com")
  const aliasB64 = "dGVtcC1hbGlhcy1jaGFuZ2UtbWVAZXhhbXBsZS5jb20="; // temp-alias-change-me@example.com
  const TO_EMAIL = safeAtob(aliasB64);

  // === Simple client-side throttling (per-browser) ===
  const STORAGE_KEY_LAST_SENT = "contact_last_sent_ms";
  const MIN_SECONDS_BETWEEN_SENDS = 45; // per browser tab/device (not real security)

  // === Minimum time on page before allowing submit (helps against some bots) ===
  const PAGE_LOAD_MS = Date.now();
  const MIN_SECONDS_ON_PAGE = 4;

  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("contact-status");
  const sendBtn = document.getElementById("send-btn");

  if (!form || !statusEl || !sendBtn) return;

  function safeAtob(b64) {
    try {
      return atob(b64);
    } catch (e) {
      return "";
    }
  }

  function setStatus(msg, isError) {
    statusEl.textContent = msg || "";
    statusEl.style.color = isError ? "#b00020" : "inherit";
  }

  function nowMs() {
    return Date.now();
  }

  function getLastSentMs() {
    const v = localStorage.getItem(STORAGE_KEY_LAST_SENT);
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }

  function setLastSentMs(ms) {
    try {
      localStorage.setItem(STORAGE_KEY_LAST_SENT, String(ms));
    } catch (e) {
      // ignore
    }
  }

  function isHoneypotTripped() {
    const hp = document.getElementById("website");
    return hp && String(hp.value || "").trim().length > 0;
  }

  function isTooSoonSincePageLoad() {
    return (nowMs() - PAGE_LOAD_MS) < (MIN_SECONDS_ON_PAGE * 1000);
  }

  function isRateLimited() {
    const last = getLastSentMs();
    return last > 0 && (nowMs() - last) < (MIN_SECONDS_BETWEEN_SENDS * 1000);
  }

  function normalize(s) {
    return String(s || "").replace(/\r\n/g, "\n").trim();
  }

  function buildMailto(to, subject, body) {
    // Keep it small-ish: mailto links can break if too long.
    // We'll be careful with encoding.
    const params = new URLSearchParams();
    params.set("subject", subject);
    params.set("body", body);
    return `mailto:${encodeURIComponent(to)}?${params.toString()}`;
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    setStatus("");

    if (!TO_EMAIL) {
      setStatus("Contact form is not configured (missing alias).", true);
      return;
    }

    // Anti-bot checks
    if (isHoneypotTripped()) {
      setStatus("Submission rejected.", true);
      return;
    }

    if (isTooSoonSincePageLoad()) {
      setStatus(`Please wait a couple seconds before sending (anti-bot check).`, true);
      return;
    }

    if (isRateLimited()) {
      setStatus(`Please wait before sending another message (rate limit).`, true);
      return;
    }

    const name = normalize(document.getElementById("name")?.value);
    const email = normalize(document.getElementById("email")?.value);
    const subject = normalize(document.getElementById("subject")?.value);
    const message = normalize(document.getElementById("message")?.value);

    if (!name || !email || !subject || !message) {
      setStatus("Please fill in all fields.", true);
      return;
    }

    // Basic email sanity check (not strict)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("Please enter a valid email address.", true);
      return;
    }

    // Compose body
    const body = [
      "New message from your website contact form",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
      "",
      "---",
      `Sent from: ${window.location.href}`,
      `Timestamp: ${new Date().toISOString()}`
    ].join("\n");

    // Build mailto URL
    const mailtoUrl = buildMailto(TO_EMAIL, `[Website] ${subject}`, body);

    // Record "send" attempt for throttling
    setLastSentMs(nowMs());

    // UX
    sendBtn.disabled = true;
    setStatus("Opening your email client…");

    // Trigger mail client
    window.location.href = mailtoUrl;

    // Re-enable after a moment (mail client may not open in all browsers)
    setTimeout(() => {
      sendBtn.disabled = false;
      setStatus("If your email app didn't open, please copy your message and contact me via LinkedIn/GitHub.", false);
    }, 2500);
  });
})();
