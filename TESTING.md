# Testing

Last updated: 2026-11-19. Automated tests were run by the AI assistant; manual tests are marked for the author to do.

## Automated (done)
- [x] Accessibility scan with axe-core on every page (38 pages): no violations.
- [x] No horizontal scrolling at phone width (375 px) and desktop width (1280 px).
- [x] Every internal link points to a page that exists.
- [x] Every page has exactly one main heading.
- [x] The magazine on the home page opens, and the menu inside it can be reached.
- [x] Timeline: next/previous, year buttons, filters, arrow keys, link to a year (#y1998).
- [x] Search: results for "paris", "mcqueen", "1995", "brazil", accent-insensitive ("bundchen"), filters, empty result message.
- [x] Quiz: played a full round, correct and wrong answers, score screen, missed list, play again; focus moves to the "Next" button.
- [x] Mannequin Room: putting on and taking off pieces, a dress replacing a top, the robot spray, zoom, "Surprise me", "Undress".

## Manual (to do by the author)
- [ ] Opens from the live GitHub Pages link in a private window.
- [ ] Works in Chrome, Safari and Firefox.
- [ ] Works on a real phone.
- [ ] Keyboard only: Tab through the home page, open the magazine with Enter, close it with Esc.
- [ ] Screen reader (VoiceOver on Mac: Cmd+F5): visit one runway page and the Quiz.
- [ ] Browser zoom at 200%: the pages still read well.
- [ ] Every YouTube video plays.
- [ ] Read each page once for typos and facts.

## Problems found and fixed
- 2026-11-17: a fact about the Galliano / Dior show was attached to the wrong season. Corrected on the page, the timeline and the sources.
- 2026-11-17: the McQueen show date was inconsistent (September 1998 shown, Spring/Summer 1999 season). Wording fixed.
- 2026-11-17: empty photo slots showed a broken-image icon. Fixed so nothing shows until a photo exists.
- 2026-11-18: the first Mannequin Room looked stiff, so it was redrawn as a full-body mannequin with a gallery.
