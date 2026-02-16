// index.js
(() => {
    /**
     * List of Latin quotes to be displayed on the home page with their translations.
     * @type {{latin: string, translation: string}[]}
     */
    const quotes = [
        { latin: "Verba volant, Scripta manent", translation: "Spoken words fly away, written words remain" },
        { latin: "Vasa vana plurimum sonant", translation: "Empty pots make the most noise" },
        { latin: "In absentia lucis, Tenebrae vincunt", translation: "In the absence of light, darkness prevails" },
        { latin: "Carpe diem", translation: "Live today" },
        { latin: "Alea iacta est", translation: "The die is cast" },
        { latin: "Ut avertam oculos meos ad intendum", translation: "I close my eyes to see" },
        { latin: "Qui tacet consentire", translation: "Whoever remains silent, consents to anything" },
        { latin: "Parva leves capiunt animas", translation: "Small things occupy light minds" },
        { latin: "Barba tenus sapientes", translation: "His wisdom is as long as his beard" },
        { latin: "Doscendo discimus", translation: "By teaching we learn" },
        { latin: "Bellum se ipsum alet", translation: "War feeds itself" },
        { latin: "Omnes una manet nox", translation: "One night awaits everyone" },
        { latin: "Igne natura renovatur integra", translation: "Nature reborn through fire" },
        { latin: "Nunquam non paratus", translation: "Never unprepared is always ready" },
        { latin: "Non progredi est regredi", translation: "Not going forward is going backward" },
        { latin: "Factum fieri infectum non potest", translation: "The deed can't be undone" },
        { latin: "Nullus agenti dies longus est", translation: "No day is long for hardworking" },
        { latin: "Eo ipso", translation: "By this act or fact" },
        { latin: "Dixi", translation: "I have spoken" },
        { latin: "Caesar non supra grammaticos", translation: "Caesar is not above grammar" },
        { latin: "Corruptissima republica plurimae leges", translation: "The more numerous the laws, the more corrupt the state" },
        { latin: "De hoc multi multa, Omnes aliquid, Nemo satis", translation: "They said many things - all something, no one enough" },
        { latin: "Accensa domo proximi, Tua quoque periclitatur", translation: "When neighbor's house is on fire, your own is in danger" },
        { latin: "Dum inter homines sumus, Colamus humanitatem", translation: "Among humans, be humane" },
        { latin: "Omnium Rerum Principia Parva Sunt", translation: "All the principles are simple and constant" },
        { latin: "Disce quasi semper victurus vive quasi cras moriturus", translation: "Learn as if you live forever, live as if you die tomorrow" }
    ];

    const el = document.querySelector("p.latin-quote");
    if (el) {
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        el.textContent = quote.latin;

        let tooltipTimeout;
        let tooltipEl;

        /**
         * Shows the translation as a tooltip.
         */
        const showTooltip = (_) => {
            if (tooltipEl) return;

            tooltipEl = document.createElement("div");
            tooltipEl.className = "quote-tooltip";
            tooltipEl.textContent = quote.translation;
            document.body.appendChild(tooltipEl);

            const rect = el.getBoundingClientRect();
            tooltipEl.style.left = `${rect.left + window.scrollX}px`;
            tooltipEl.style.top = `${rect.bottom + window.scrollY + 5}px`;
        };

        /**
         * Hides and removes the tooltip.
         */
        const hideTooltip = () => {
            clearTimeout(tooltipTimeout);
            if (tooltipEl) {
                tooltipEl.remove();
                tooltipEl = null;
            }
        };

        el.addEventListener("mouseenter", () => {
            tooltipTimeout = setTimeout(showTooltip, 1000);
        });

        el.addEventListener("mouseleave", hideTooltip);
        el.addEventListener("mousemove", (_) => {
            // If the mouse is moving but the tooltip isn't shown yet, we don't reset the timer
            // unless we want it to be 1 second of STILLNESS. 
            // The prompt says "hovering over the quote's text for a second". 
            // Usually this means the mouse being inside the area for a second.
        });
    }

    /**
     * Social media links data.
     * @type {{href: string, icon: string}[]}
     */
    const socialLinks = [
        { href: "https://www.linkedin.com/in/yurii-cherkasov-653b213a0/", icon: "fab fa-linkedin-in" },
        { href: "https://github.com/yuchdev", icon: "fab fa-github-alt" },
        { href: "https://www.facebook.com/yuchdev", icon: "fab fa-facebook-f" },
        { href: "https://x.com/yuchdev", icon: "fab fa-x-twitter" },
        { href: "https://www.instagram.com/yuchdev", icon: "fab fa-instagram" }
    ];

    /**
     * Injects social media links into the header.
     */
    const injectSocialLinks = () => {
        const header = document.querySelector("header");
        if (!header) return;

        // Try to find the placeholder or existing section
        let socialSection = document.getElementById("header-social");
        if (!socialSection) {
            socialSection = document.createElement("section");
            socialSection.id = "header-social";
            header.appendChild(socialSection);
        } else {
            // Clear existing content if it's there
            socialSection.innerHTML = "";
        }

        socialLinks.forEach(link => {
            const anchor = document.createElement("a");
            anchor.href = link.href;
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";

            const icon = document.createElement("i");
            icon.className = link.icon;

            anchor.appendChild(icon);
            socialSection.appendChild(anchor);
        });
    };

    injectSocialLinks();
})();
