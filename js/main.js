/* ==========================================================
   main.js - shared pieces used on every page.
   Instead of copy-pasting the header and footer into every
   HTML file, JavaScript builds them once from this list.
   ========================================================== */
const PAGES = [
  { href: "designers.html", label: "Designers" },
  { href: "runways.html",   label: "Runways" },
  { href: "models.html",    label: "Models" },
  { href: "timeline.html",  label: "Timeline" },
  { href: "mannequin.html", label: "Mannequin Room" },
  { href: "search.html",    label: "Search" },
];

function currentFile() {
  const f = location.pathname.split("/").pop();
  return f === "" ? "index.html" : f;
}

function buildHeader() {
  const here = currentFile();
  const links = PAGES.map(p =>
    `<li><a href="${p.href}"${p.href === here ? ' aria-current="page"' : ""}>${p.label}</a></li>`
  ).join("");
  return `
    <div class="wrap">
      <a class="logo" href="index.html" aria-label="ARCHIVE, home">ARCHIVE</a>
      <nav class="nav" aria-label="Main"><ul>${links}</ul></nav>
    </div>`;
}

function buildFooter() {
  return `
    <div class="wrap">
      <p>ARCHIVE &mdash; a student project, 2026. Not affiliated with any designer or brand.</p>
      <ul>
        <li><a href="sources.html">Sources</a></li>
        <li><a href="accessibility.html">Accessibility</a></li>
        <li><a href="about.html">About</a></li>
      </ul>
    </div>`;
}

function buildTicker() {
  const words = ["Valentino","Versace","McQueen","Galliano","Tom Ford","Gaultier","Lagerfeld","Helmut Lang","Calvin Klein","Naomi","Kate","Gisele","Adriana","Doutzen"];
  const row = words.map(w => `<span>${w}</span>`).join("");
  // repeated twice so the scroll loops seamlessly
  return `<div class="ticker-track" aria-hidden="true">${row}${row}</div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  const ticker = document.getElementById("ticker");
  if (header) header.innerHTML = buildHeader();
  if (footer) footer.innerHTML = buildFooter();
  if (ticker) ticker.innerHTML = buildTicker();
});

/* ==========================================================
   THE MAGAZINE (home page)
   ----------------------------------------------------------
   TO ADD YOUR PHOTOS:
   1. Put your cover photo in the  images/  folder and name it  cover.jpg
      (portrait / tall works best, about 3:4).
   2. Optional: put a second photo named  inside.jpg  (shows on the
      inside-cover page when the magazine is open).
   3. Fill in the text below. The ALT text describes the photo for
      people using screen readers. The CREDIT is shown on the cover and
      MUST also be written in SOURCES.md (photographer, source, license).
   ========================================================== */
const MAGAZINE = {
  coverImage:   "images/cover.jpg",
  coverAlt:     "",   // e.g. "A model in a black dress on a grey background"
  coverCredit:  "",   // e.g. "Cover: Jane Doe / Wikimedia Commons / CC BY-SA 4.0"
  insideImage:  "images/inside.jpg",
  insideCredit: ""    // e.g. "Photo: John Doe / Wikimedia Commons / CC BY 2.0"
};

/* Try to load an image. If the file exists we use it, if not we keep the drawing. */
function tryImage(url, onFound) {
  const img = new Image();
  img.onload = () => onFound(url);
  img.src = url;   // a missing file just never calls onload
}

function initMagazine() {
  const book = document.getElementById("book");
  if (!book) return;
  const coverBtn  = document.getElementById("coverBtn");
  const coverWrap = document.getElementById("coverWrap");
  const coverBack = document.getElementById("coverBack");
  const page      = document.getElementById("contentsPage");
  const closeBtn  = document.getElementById("closeMag");
  const hint      = document.getElementById("magHint");
  const reduced   = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- photos ---
  tryImage(MAGAZINE.coverImage, url => {
    coverWrap.querySelector(".cf-photo").style.backgroundImage = `url("${url}")`;
    book.classList.add("has-photo");
    if (MAGAZINE.coverCredit) document.getElementById("coverCredit").textContent = MAGAZINE.coverCredit;
    coverBtn.setAttribute("aria-label",
      "Open the magazine: Archive, issue 1." + (MAGAZINE.coverAlt ? " Cover photo: " + MAGAZINE.coverAlt : ""));
  });
  tryImage(MAGAZINE.insideImage, url => {
    document.getElementById("insidePhoto").style.backgroundImage = `url("${url}")`;
    book.classList.add("has-inside");
    document.getElementById("insideCredit").textContent = MAGAZINE.insideCredit;
  });

  // --- open / close ---
  function setOpen(open, first) {
    book.classList.toggle("open", open);
    book.style.removeProperty("--ry"); book.style.removeProperty("--rx");   // drop leftover mouse tilt
    coverBtn.setAttribute("aria-expanded", String(open));
    // `inert` keeps hidden things out of the tab order and away from screen readers
    page.inert = !open;
    coverBack.inert = !open;
    coverBtn.inert = open;
    page.setAttribute("aria-hidden", String(!open));
    coverBack.setAttribute("aria-hidden", String(!open));
    hint.textContent = open ? "Pick a section, or press Esc to close" : "Click the cover to open the issue";
    if (first) return;
    if (open) setTimeout(() => page.querySelector("a").focus(), reduced ? 0 : 700);
    else coverBtn.focus();
  }
  setOpen(false, true);

  coverBtn.addEventListener("click", () => setOpen(true));
  closeBtn.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && book.classList.contains("open")) setOpen(false);
  });

  // --- the closed magazine follows the mouse a little ---
  if (!reduced) {
    const stage = book.parentElement;
    stage.addEventListener("mousemove", e => {
      if (book.classList.contains("open")) return;
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      book.style.setProperty("--ry", (-8 + x * 26) + "deg");
      book.style.setProperty("--rx", (2 - y * 18) + "deg");
    });
    stage.addEventListener("mouseleave", () => {
      book.style.removeProperty("--ry"); book.style.removeProperty("--rx");
    });
  }
}
document.addEventListener("DOMContentLoaded", initMagazine);
