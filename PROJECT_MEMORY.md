# Project Memory: ARCHIVE, a Museum of Fashion (1990-2009)

## Purpose and audience
A virtual museum where fashion students and enthusiasts explore the designers, runway shows and models of the 1990s and 2000s.

## Change from original proposal (IMPORTANT, explain to instructor)
- Original idea: a wellness / meditation website (motivational phrases, problem-solving).
- New idea: a fashion museum website.
- Why: the fashion idea has a clearer audience, more content to organize, and more room to show real design and development work (data-driven pages, search, filters, an interactive feature).

## Tech (kept deliberately simple)
- Plain HTML, CSS and JavaScript. No frameworks, no build step.
- Content is written directly in HTML pages (one page per designer, runway show and model). A small JavaScript file builds the shared header and footer, and will power search.
- Hosted free on GitHub Pages.

## Design direction
90s editorial / magazine style. Black and grey with off-white paper, film grain. Fonts: Bodoni Moda, Anton, Space Mono (Google Fonts).

## Scope
- 9 designers, 9 runway shows (one per designer), 9 models linked to the designers' shows, a timeline, a Mannequin Room and a search page.

## Accessibility
Semantic HTML, keyboard navigation, visible focus, alt text, WCAG AA contrast, prefers-reduced-motion support.

## AI assistance disclosure (honest account of who did what)
I used Claude (Anthropic) throughout this project. This is what each of us did.

| Part | Claude | Me |
|---|---|---|
| Idea, topic, audience | Suggested options | Chose the fashion museum, the era (1990-2009), the designers and models, and the 90s editorial direction |
| Design | Built the page layouts and the 3D openable magazine, and tried several versions | Compared the versions, chose the final one, asked for changes (simpler cover, one mannequin, grey/black colors, cleaner top bar) |
| Code | Wrote the HTML, CSS and JavaScript | Uploaded and tested the files, and reviewed how they work |
| Text and facts | Researched sources and wrote first drafts in original words | Chose the subjects, reviewed the text, and (to do) edit it in my own words |
| Photos and credits | Does not download or add photos of people | (to do) Add licensed photos and credit them in SOURCES.md |
| Testing | Ran automated checks (layout, links, keyboard) | (to do) Test on my own devices and fill in TESTING.md |

(to do: add a few sentences about what I learned.)

## Decision log
- 2026-11-16: Switched from meditation to fashion museum. Chose plain HTML/CSS/JS + GitHub Pages. Chose 90s editorial style.
- 2026-11-17: Restarted the repository to keep it clean. Chose one runway show per designer, and models who are linked to those designers' shows. Decided the black scrolling strip at the top made the page messy, so it was removed.
- 2026-11-17: While checking sources for the runway pages, found and corrected a factual mistake in the Galliano page (the Marchesa Casati inspiration belongs to the Spring/Summer 1998 Dior show, not 1997). Lesson: check every claim against a second source.
- 2026-11-17: Decided the inner pages felt too plain next to the magazine home page. Added numbered cards, an italic standfirst under each title, a drop cap, a black "Moments to know" band, and one red accent (checked for AA contrast).
- 2026-11-17: Chose nine models who connect to the designers and shows (for example Shalom Harlow and McQueen's No. 13), plus three 2000s models (Gisele Bündchen, Adriana Lima, Doutzen Kroes) to cover the whole 1990-2009 period. Left out private or legal matters and kept to careers.
- 2026-11-17: Compared three layouts for the Models page (contact sheet, catwalk timeline, casting board) and chose the casting board of taped Polaroids. Built the Timeline page automatically from the dates already written on the designer, runway and model pages, so it cannot disagree with them.
- 2026-11-17: Redesigned the Runways page after feedback that it was repetitive. Compared invitations, a show programme and a catwalk; chose front-row tickets (seat numbers, barcode stub, perforation). Also made the Timeline interactive (year scrubber, filters, arrow keys).
- 2026-11-17: Built the Mannequin Room: a drawn mannequin that can be dressed with nine pieces taken from the shows and designers in the museum (red dress, white dress with the robot spray, jungle dress, and so on). Each piece links back to its story. I drew the clothes as simple illustrations and say so on the page, because they are not copies of the real garments.

## Design iteration log (evidence of planning and iteration)
The home page went through several versions. Each one is saved in the repository history/branches.

| # | Version | What it was | What I decided |
|---|---|---|---|
| 1 | Red editorial | Magazine-style page with black, off-white and a red accent | Liked the layout, but wanted a calmer colour scheme |
| 2 | Monochrome polaroid | Grey paper, film grain, polaroid photo frames | Too dependent on photos; did not feel like a magazine |
| 3 | Giant-type collage | Huge overlapping type, halftone mannequin, taped polaroids | Bold, but I preferred my first layout |
| 4 | Monochrome + openable magazine (chosen) | Version 1 layout in greys, with a 3D magazine that opens on click to show the menu | Chosen: most original and interactive |
| 5 | Cover refinements | Tried a busy cover (starburst, many cover lines), found it messy, simplified to masthead + mannequin + one line | Dark cover with "The era that never left" |

**Why I chose the final design:** (write 2 or 3 sentences in your own words here)

**What I learned / changed myself:** (add notes as you go)
