(() => {
    const form = document.getElementById("contact-form");
    const statusEl = document.getElementById("contact-status");
    const sendBtn = document.getElementById("send-btn");
    const BACKEND_URL = window.CONTACT_BACKEND_URL;
    const TIMEOUT_MS = 12000;
    const FALLBACK_EMAIL = "yurii.cherkasov-0xfa@atatat.net";
    const CONTACT_SECRET = decodeBase64Utf8(
        window.CONTACT_BACKEND_SECRET_B64 || ""
    );


    function decodeBase64Utf8(b64) {
        try {
            // atob gives binary string → decode UTF-8 properly
            const binary = atob(b64);
            const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
            return new TextDecoder("utf-8").decode(bytes);
        } catch {
            return "";
        }
    }

    function setStatus(text, isError) {
        statusEl.textContent = text;
        // optional inline styling without touching CSS:
        statusEl.style.color = isError ? "#b42318" : "";
    }

    function setStatusHtml(html, isError) {
        statusEl.innerHTML = html;
        statusEl.style.color = isError ? "#b42318" : "";
    }

    function setSending(isSending) {
        sendBtn.disabled = isSending;
        sendBtn.textContent = isSending ? "Sending..." : "Send";
    }

    function basicEmailOk(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isLocal() {
        return (
            window.location.protocol === "file:" ||
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1"
        );
    }

    function showFallback(reason) {
        const name = (form.elements.namedItem("name")?.value || "").trim();
        const subject = (form.elements.namedItem("subject")?.value || "").trim();
        const message = (form.elements.namedItem("message")?.value || "").trim();

        const body = `From: ${name} \n\nMessage: ${message}`;
        const mailtoUrl = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        setStatusHtml(`${reason} Would you like to <a href="${mailtoUrl}" style="color: inherit; text-decoration: underline;">send an email</a> instead?`, true);
    }

    async function postJson(url, payload) {
        const controller = new AbortController();
        const t = setTimeout(() => controller.abort(), TIMEOUT_MS);

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            let data = null;
            const ct = res.headers.get("Content-Type") || "";
            if (ct.includes("application/json")) {
                try {
                    data = await res.json();
                } catch { /* ignore */
                }
            }

            return {res, data};
        } finally {
            clearTimeout(t);
        }
    }

    if (!form) return;

    form.addEventListener("submit", async (ev) => {
        ev.preventDefault();
        setStatus("");

        if (!BACKEND_URL || !CONTACT_SECRET) {
            showFallback("Contact form is not configured yet.");
            return;
        }

        const name = (form.elements.namedItem("name")?.value || "").trim();
        const email = (form.elements.namedItem("email")?.value || "").trim();
        const subject = (form.elements.namedItem("subject")?.value || "").trim();
        const message = (form.elements.namedItem("message")?.value || "").trim();
        const website = (form.elements.namedItem("website")?.value || "").trim(); // honeypot

        // Client-side validation (backend will validate too)
        if (!name || !email || !subject || !message) {
            setStatus("Please fill in all required fields.", true);
            return;
        }
        if (!basicEmailOk(email)) {
            setStatus("Please enter a valid email address.", true);
            return;
        }

        // Your backend contract
        const payload = {
            secret: CONTACT_SECRET,
            name,
            email,
            subject,
            message,
            website
        };

        setSending(true);
        setStatus("Sending...", false);

        try {
            const {res, data} = await postJson(BACKEND_URL, payload);

            // Success
            if (res.ok && data && data.status === "ok") {
                setStatus(data.message || "Thank you! Message sent.", false);
                form.reset();
                return;
            }

            // Accepted but queued (GitHub failed / Telegram fallback / etc.)
            if (res.status === 202 && data && data.status === "queued") {
                setStatus(data.message || "Received. I’ll get back to you soon.", false);
                form.reset();
                return;
            }

            // Generic error (don’t leak backend details)
            if (res.status === 403 && isLocal()) {
                showFallback("Submission failed (403). Backend likely rejects local requests due to CORS/Origin restrictions.");
            } else {
                showFallback("Could not send your message.");
            }
        } catch (e) {
            showFallback("Network error.");
        } finally {
            setSending(false);
        }
    });
})();
