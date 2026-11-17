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

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (header) header.innerHTML = buildHeader();
  if (footer) footer.innerHTML = buildFooter();
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


// Photo slots: show a photo only if the file exists; otherwise keep the dotted placeholder.
document.querySelectorAll(".photo-slot").forEach(function (slot) {
  var img = slot.querySelector("img");
  if (!img) return;
  function ok() { slot.classList.add("has-photo"); }
  img.addEventListener("load", ok);
  img.addEventListener("error", function () { img.remove(); });
  if (img.complete) { if (img.naturalWidth) ok(); else img.remove(); }
});

/* ==========================================================
   TIMELINE (timeline.html)
   Without JavaScript the page is a plain list of every year.
   With JavaScript it becomes an interactive scrubber: one year
   at a time, filter buttons, previous/next and arrow keys.
   ========================================================== */
function initTimeline() {
  const root = document.getElementById("tl-root");
  if (!root) return;
  const sections = Array.from(root.querySelectorAll(".tl-year"));
  const years = sections.map(s => +s.id.slice(1));
  const all = Array.from({ length: 20 }, (_, i) => 1990 + i);
  const kinds = { runway: true, designer: true, model: true };
  let current = null;

  root.classList.add("tl-js");
  // hide the plain decade headings; the scrubber replaces them
  root.querySelectorAll(".tl-decade").forEach(h => h.hidden = true);

  const ui = document.createElement("div");
  ui.className = "tl-ui";
  ui.innerHTML = `
    <div class="tl-filters" role="group" aria-label="Show only">
      <button type="button" class="tl-f" data-k="runway" aria-pressed="true">Runways</button>
      <button type="button" class="tl-f" data-k="designer" aria-pressed="true">Designers</button>
      <button type="button" class="tl-f" data-k="model" aria-pressed="true">Models</button>
    </div>
    <div class="tl-scrub" role="group" aria-label="Choose a year"></div>
    <div class="tl-nav">
      <button type="button" id="tlPrev">&larr; Previous year</button>
      <span class="tl-big" id="tlBig" aria-hidden="true"></span>
      <button type="button" id="tlNext">Next year &rarr;</button>
    </div>
    <p class="sr-only" id="tlLive" role="status" aria-live="polite"></p>`;
  root.insertBefore(ui, root.firstChild);
  const scrub = ui.querySelector(".tl-scrub");
  const live = ui.querySelector("#tlLive");
  const big = ui.querySelector("#tlBig");

  function count(y) {
    const s = document.getElementById("y" + y);
    if (!s) return 0;
    return Array.from(s.querySelectorAll("li")).filter(li => kinds[li.dataset.k]).length;
  }

  all.forEach(y => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "tl-tick"; b.dataset.y = y;
    b.innerHTML = `<span class="tl-bar" aria-hidden="true"></span><span class="tl-yy">${y % 10 === 0 || y === 1995 || y === 2005 ? y : "’" + String(y).slice(2)}</span>`;
    b.addEventListener("click", () => show(y, true));
    scrub.appendChild(b);
  });

  function paintBars() {
    const max = Math.max(1, ...all.map(count));
    scrub.querySelectorAll(".tl-tick").forEach(b => {
      const y = +b.dataset.y, n = count(y);
      b.querySelector(".tl-bar").style.height = (6 + (n / max) * 54) + "px";
      b.setAttribute("aria-label", y + ", " + n + (n === 1 ? " event" : " events"));
    });
  }

  function show(y, focus) {
    y = Math.max(1990, Math.min(2009, y));
    current = y;
    sections.forEach(s => s.hidden = (s.id !== "y" + y));
    scrub.querySelectorAll(".tl-tick").forEach(b => {
      const on = +b.dataset.y === y;
      b.classList.toggle("on", on);
      if (on) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current");
    });
    // hide filtered-out items inside the year, and show a note if none are left
    const s = document.getElementById("y" + y);
    let n = 0;
    if (s) {
      s.querySelectorAll("li").forEach(li => { const on = kinds[li.dataset.k]; li.hidden = !on; if (on) n++; });
    }
    let empty = root.querySelector(".tl-empty");
    if (!empty) { empty = document.createElement("p"); empty.className = "tl-empty"; root.appendChild(empty); }
    empty.hidden = n > 0;
    empty.textContent = s ? "Nothing to show for " + y + " with these filters." : "Nothing recorded for " + y + " in this museum yet.";
    big.textContent = y;
    ui.querySelector("#tlPrev").disabled = y === 1990;
    ui.querySelector("#tlNext").disabled = y === 2009;
    live.textContent = y + ": " + n + (n === 1 ? " event" : " events");
    try { history.replaceState(null, "", "#y" + y); } catch (e) {}
  }

  ui.querySelector("#tlPrev").addEventListener("click", () => show(current - 1));
  ui.querySelector("#tlNext").addEventListener("click", () => show(current + 1));
  ui.querySelectorAll(".tl-f").forEach(b => b.addEventListener("click", () => {
    const k = b.dataset.k;
    kinds[k] = !kinds[k];
    b.setAttribute("aria-pressed", String(kinds[k]));
    paintBars(); show(current);
  }));
  // arrow keys move between years while a timeline control has focus
  ui.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      show(current + (e.key === "ArrowRight" ? 1 : -1));
      const t = scrub.querySelector(".tl-tick.on"); if (t && e.target.classList.contains("tl-tick")) t.focus();
    }
  });

  paintBars();
  const h = /^#y(\d{4})$/.exec(location.hash);
  show(h ? +h[1] : 1990);
}
document.addEventListener("DOMContentLoaded", initTimeline);
