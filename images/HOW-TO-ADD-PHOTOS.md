# How to add photos to the magazine

The magazine on the home page looks for two optional files in this folder:

| File | Where it shows |
|---|---|
| `cover.jpg` | The magazine cover (tall / portrait, about 3:4 works best) |
| `inside.jpg` | The inside-cover page, the left page when the magazine is open |

If a file is not there, the site keeps the drawn dress form. Nothing breaks.

## Steps
1. Get the image (your own photo, or a licensed one, e.g. from Wikimedia Commons).
2. Rename it exactly `cover.jpg` (lowercase!) and drop it in this `images/` folder.
   On GitHub: open the `images` folder, click **Add file, then Upload files**, drag it in, and click **Commit changes**.
3. Open `js/main.js`, find the `MAGAZINE` block near the bottom, and fill in:
   - `coverAlt`: a short description of the photo (for screen readers)
   - `coverCredit`: the credit shown on the cover, e.g. `Cover: Name / Wikimedia Commons / CC BY-SA 4.0`
4. Add the same details to `SOURCES.md`: photographer, source, license, link.
5. Keep photos under about 500 KB so the site loads fast.

Do not use a photo if you cannot say who made it and what license it has.
