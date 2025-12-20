// index.js
(() => {
    const quotes = [
        "Verba volant scripta manent",
        "Fortes fortuna adiuvat",
        "Festina lente",
        "Audentes fortuna iuvat",
        "Carpe diem",
        "Amor vincit omnia",
        "Alea iacta est",
        "Mens sana in corpore sano",
    ];

    const el = document.querySelector("p.latin-quote");
    if (!el) return;

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    el.textContent = randomQuote;
})();
