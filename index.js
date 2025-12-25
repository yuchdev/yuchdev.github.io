// index.js
(() => {
    /**
     * List of Latin quotes to be displayed on the home page.
     * @type {string[]}
     */
    const quotes = [
        "Verba volant, Scripta manent",         // Spoken words fly away, written ones remain
        "Vasa vana plurimum sonant",            // Empty pots make the most noise
        "In absentia lucis, Tenebrae vincunt",  // In absence of light, darkness prevails
        "Carpe diem",                           // Live today
        "Alea iacta est",                       // The die is cast
        "Ut avertam oculos meos ad intendum",   // I close my eyes to see
        "Qui tacet consentire",                 // Whoever remains silent, consents to anything
        "Parva leves capiunt animas",           // Small things occupy light minds
        "Barba tenus sapientes",                // His wisdom as long as his beard
        "Doscendo discimus",                    // By teaching we learn
        "Bellum se ipsum alet",                 // War feeds itself
        "Omnes una manet nox",                  // One night awaits everyone
        "Igne natura renovatur integra",        // Nature reborn through fire
        "Nunquam non paratus",                  // Never unprepared is always ready
        "Non progredi est regredi",             // Not going forward is going backward
        "Factum fieri infectum non potest",     // The deed can't be undone
        "Eo ipso",                              // By this act or fact
        "Nullus agenti dies longus est",        // No day is long for hardworking
        "Dixi",                                 // I have spoken
        "Caesar non supra grammaticos",         // Caesar is not above grammar
        "Corruptissima republica plurimae leges",           // The more numerous the laws, the more corrupt the state
        "De hoc multi multa, Omnes aliquid, Nemo satis",    // They said many things, all something, no one enough
        "Accensa domo proximi, Tua quoque periclitatur",    // When neighbor's house is on fire, your own is in danger
        "Dum inter homines sumus, Colamus humanitatem",     // Among humans, be humane
        "Omnium Rerum Principia Parva Sunt",                // All the principles are simple and constant
        "Disce quasi semper victurus vive quasi cras moriturus" // Learn as if you live forever, live as if you die tomorrow
    ];

    const el = document.querySelector("p.latin-quote");
    if (!el) {
        return;
    }
    el.textContent = quotes[Math.floor(Math.random() * quotes.length)];
})();
