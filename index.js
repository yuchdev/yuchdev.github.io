// index.js
(() => {
    const quotes = [
        "Verba volant, Scripta manent",         // Spoken words fly away, written ones remain
        "Vasa vana plurimum sonant",            // Empty pots make the most noise
        "In absentia lucis, Tenebrae vincunt",  // In absence of light, darkness prevails
        "Carpe diem",                           // Live today
        "Amor vincit omnia",                    // Love conquers all
        "Alea iacta est",                       // The die is cast
        "Dum inter homines sumus, Colamus humanitatem",             // Among humans, be humane
        "Disce quasi semper victurus vive quasi cras moriturus",    // Learn as if you live forever, live as if you die tomorrow
        "Ut avertam oculos meos ad intendum",   // I close my eyes to see
        "Qui tacet consentire",                 // Whoever silent consents to anything
        "Parva leves capiunt animas",           // Small things occupy light minds
        "Barba tenus sapientes",                // His wisdom as long as his beard
        "Doscendo discimus",                    // By teaching we learn
        "Bellum se ipsum alet",                 // War feeds itself
        "De hoc multi multa, Omnes aliquid, Nemo satis" // They said many things, all something, no one enough
    ];

    const el = document.querySelector("p.latin-quote");
    if (!el) {
        return;
    }
    el.textContent = quotes[Math.floor(Math.random() * quotes.length)];
})();
