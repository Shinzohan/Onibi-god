<h1 align="center">Onibi — Aniflow Interactive</h1>

<p align="center">
  The promo site for <strong>Onibi</strong>, an adventure &amp; exploration game where you play a fledgling guardian spirit.<br/>
  Dash, possess, and explore alongside the child you're sworn to protect.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2.3-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-11-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-live-brightgreen?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/first_commit-June_2024-blueviolet?style=flat-square" alt="First commit" />
  <img src="https://img.shields.io/badge/PRs-welcome-ff69b4?style=flat-square" alt="PRs welcome" />
</p>

---

> One of the first websites I ever built. Started June 2024, still hosted, still a little nostalgic every time
> I open the repo. The animation timings are hand-tuned by a version of me who had just discovered
> `framer-motion` and refused to stop using it.

## What's in here

A three-page Next.js App Router site, heavy on motion and video:

| Route | What it does |
| --- | --- |
| `/` | Hero landing — fullscreen looping video revealed through an expanding `clip-path` circle, staggered title text, and a play button orbited by two counter-rotating gradient rings that link out to the trailer. |
| `/Game/` | Scroll-driven feature showcase. Five parallax cards (from `src/app/data.ts`) stack and scale as you scroll, each with its own gameplay clip. |
| `/contact/` | Animated block-grid contact page with an EmailJS-powered form, client-side rate limiting (1 message/minute, persisted to `localStorage`), and toast notifications. |

Every page shares a floating navbar with home/game/contact links plus Discord, Twitch, and Steam socials.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling, with `Poetsen One` / `Mystery Quest` / `Bangers` / `Pacifico` pulled from Google Fonts
- **Framer Motion** for page transitions, scroll progress, and the reveal animations
- **GSAP** for the launching-text effect on the Game page
- **EmailJS** (`@emailjs/browser`) so the contact form works with no backend
- **react-icons**, **react-intersection-observer**, **tailwind-merge**

## Running it locally

```bash
git clone https://github.com/Shinzohan/Onibi-god.git
cd Onibi-god
npm install
npm run dev
```

Then open <http://localhost:3000>.

### Environment variables

The contact form needs three EmailJS values. Create a `.env` (or `.env.local`) in the project root:

```ini
NEXT_PUBLIC_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_PUBLIC_KEY=your_emailjs_public_key
```

Grab them from your [EmailJS dashboard](https://dashboard.emailjs.com/). These are `NEXT_PUBLIC_*`, so they ship
to the browser by design — that's how EmailJS works, but it means the public key is not a secret. Keep the
form's rate limit in place and set an allowed-origin restriction in EmailJS.

The email template should expect `user_email` and `user_message` fields, matching the form inputs.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint via `eslint-config-next` |

## Project layout

```
src/
├── app/
│   ├── layout.tsx        # Root layout, Inter font, page-transition wrapper
│   ├── page.tsx          # Landing page
│   ├── globals.css       # Google Fonts import + global styles
│   ├── data.ts           # Feature cards for the Game page
│   ├── Game/page.tsx     # Scroll parallax showcase
│   └── contact/page.tsx  # Contact form
├── components/
│   ├── Animatedpage.tsx  # Route transition wrapper
│   ├── Animatedtext.tsx  # GSAP "launching" text
│   ├── navbar.tsx        # Floating nav + social links
│   ├── navlinks.tsx
│   ├── card.tsx          # Parallax feature card
│   ├── button.tsx
│   └── Notification.tsx  # Toast for the contact form
public/
├── Background.mp4        # Landing hero loop
├── video/                # Gameplay clips (dash, possess, trial, dialogue, nightboy)
└── *.svg, *.png          # Logos and posters
```

`next.config.mjs` sets `trailingSlash: true`, so internal links are written as `/Game/` and `/contact/`.

## Deploying

Vercel is the path of least resistance — import the repo, add the three `NEXT_PUBLIC_*` variables, deploy.
Any Node host works too (`npm run build && npm start`).

Because the site is fully client-rendered, it also exports to static files. Add `output: 'export'` to
`next.config.mjs` and `npm run build` writes a deployable `out/` folder for GitHub Pages, Netlify, or any
static host. (`trailingSlash: true` is already set, which static hosts prefer.)

> Heads up: the video files in `public/` are the bulk of the payload. If bandwidth is a concern, move them to
> a CDN or a hosted video service rather than shipping them with the build.

## Links

- 🎮 Trailer — [YouTube](https://www.youtube.com/watch?v=YbkXclwDjSg)
- 💬 [Discord](https://discord.gg/vGCjA32myP)
- 📺 [Twitch](https://www.twitch.tv/aug16th)

## Credits

Built by [Shinzohan](https://github.com/Shinzohan). Onibi and all game art, video, and characters belong to
**Aniflow Interactive**.
