# Next Trip Expedition — Website

A rebuild of the Next Trip Expedition travel site in **Next.js 16 (App Router)** with
**React 19**, **TypeScript**, **Tailwind CSS 4** and **Framer Motion**.

All copy, imagery and page structure come from the existing site at
`webdemo.thedaps.com/TravelNew` — the presentation layer is new.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # production
```

---

## Project layout

```
src/
  app/
    layout.tsx            Fonts, metadata, JSON-LD, nav + footer shell
    page.tsx              Homepage section assembly
    tours/[slug]/page.tsx Bhutan / Nepal / India tour pages (+ Paris, Kedarnath)
    terms/page.tsx        Terms, payment, cancellation & privacy
    api/contact/route.ts  Enquiry form handler
    not-found.tsx
    globals.css           Design tokens + shared utilities
  components/
    layout/               Navbar, Footer
    sections/             One file per page section
    ui/                   Reveal, TiltCard, Button, SectionHeading, Aurora, BackgroundVideo
    providers/            SmoothScroll (Lenis)
  data/
    site.ts               Brand, contact details, nav
    home.ts               Hero slides, destinations, services, trips, trust, about
    tours.ts              Full per-destination tour content and itineraries
    terms.ts              Policy content
public/assets/image/      All original imagery and video
```

**Content lives in `src/data/`.** Editing copy, adding a destination or changing a
phone number is a data edit — no component changes needed.

---

## Contact form

`POST /api/contact` validates the submission, then relays it by email via SMTP.

Set these in `.env.local` (see `.env.example`):

| Variable    | Purpose                                   |
| ----------- | ----------------------------------------- |
| `SMTP_HOST` | e.g. `smtp.gmail.com`                     |
| `SMTP_PORT` | `587` (STARTTLS) or `465` (TLS)           |
| `SMTP_USER` | Sending mailbox                           |
| `SMTP_PASS` | App password — **not** the account password |
| `CONTACT_TO`| Where enquiries land (defaults to the site address) |

Until SMTP is configured the route returns a clear "please call us" message
rather than reporting success for an email that was never sent. The submission
is logged server-side so nothing is lost during setup.

The form also carries a honeypot field and server-side validation of every
input, including the destination whitelist.

---

## Notes for the client

Two things carried over from the original site that are worth a decision:

1. **Paris and Kedarnath have no tour content.** Both were linked from the
   homepage but returned 404 on the live site. They now render a proper
   destination page built from the homepage summary plus a direct enquiry
   route, instead of a dead link. Send through the copy and itineraries and
   they can become full pages like Bhutan/Nepal/India — add an entry to
   `src/data/tours.ts` and they render automatically.

2. **The terms page lists a different contact** (`+91-8595230598` /
   `operation@nextripexpedition.com`) to the rest of the site
   (`9654659085` / `nextripexpedition@gmail.com`). Both have been preserved
   as-is. Confirm which is correct.

**Typography.** The original set headings in Corinthia, a handwriting script.
It's been dropped in favour of Poppins for headings and Inter for body text —
the script was hard to read at display sizes and undercut the premium
positioning. Accent words now carry a gold gradient instead. Brand colours
(blue `#1E5A8E`, gold `#f4c42d`, navy `#0A1628`) are unchanged.

**Media.** Background videos were re-encoded from 1440p to 1080p — they were
45 MB and 34 MB, which would have dominated page load. Total media dropped from
185 MB to 110 MB. They now load only when scrolled into view, behind a poster
frame, and are skipped entirely for visitors who prefer reduced motion.
