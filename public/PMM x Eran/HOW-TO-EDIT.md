# How to edit this presentation yourself

All text, KPIs, and images live in **one file**:

```
src/content.json
```

Open it in any text editor (VS Code, Notepad, etc.). Change the values inside the quotes. Save. The browser auto-reloads.

---

## Examples

### Change the hero title
Open `src/content.json` and find:
```json
"section1_hero": {
  "title": "PMM ♥ Eran",
  "date": "July 2026",
  "subtitle": "PMMs are the CMO's secret sauce"
}
```
Edit any of those strings. Don't remove the quotes.

### Change the agenda items
Find `section2_agenda.agenda` — it's a list:
```json
"agenda": [
  "What is PMM",
  "Deliverables we own",
  "Why critical now",
  "Must-win battles",
  "Partnership"
]
```
Add, remove, or edit lines. Keep the commas between items.

### Add/edit deliverables
Find `section4_deliverables.items` — each is a card in the gallery:
```json
{
  "name": "Elevate product sessions",
  "image": "",
  "kpi": "4.7★",
  "kpi_detail": "1.2K attendees per session"
}
```
- `name` — title shown on the card
- `image` — leave empty for the placeholder, OR fill with `/images/yourfile.jpg` after dropping a file into `public/images/`
- `kpi` — the big number shown in gradient
- `kpi_detail` — small text under the number

### Add an image
1. Drop the image into `public/images/` (e.g. `elevate.jpg`)
2. In `content.json`, set `"image": "/images/elevate.jpg"`

### Edit the verticals table
Find `section6_battles.battles[1].subviews[0]` (the Baseline view of the Verticals card). Edit `rows`:
```json
"rows": [
  ["IT", "1,200", "8%", "$240K", "70 / 30"],
  ["Project", "...", "...", "...", "..."]
]
```
Each inner array is one row of the table.

### Change brand colors
Find `brand.colors` at the top of the file:
```json
"colors": {
  "primary": "#6161ff",
  "success": "#00ca72",
  ...
}
```
These are stored but most of the design uses the violet/indigo/sky palette baked into the CSS. To change accent colors globally, edit `src/index.css` (the `--c-violet`, `--c-indigo`, `--c-sky` lines near the top).

---

## What you cannot edit in content.json

- **Section order** — that lives in `src/App.tsx` (each section is one line)
- **Layout / spacing / typography** — that's in `src/index.css` and the section files in `src/sections/`
- **Animations** — those are in `src/components/`

For any of those, ping Claude.

---

## Running locally

```bash
cd "PMM x Eran"
npm run dev
```
Then open http://localhost:5174 (or whatever port Vite prints).
