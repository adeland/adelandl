# Portfolio

A minimal, single-page personal portfolio built with **React + Vite**. Light/dark
themes, no backend, no external services — deploys to Vercel with zero configuration.

Sections: **Hero · About · Experience · Projects · Notes · Contact**.

## Tech stack

- **React 19** + **Vite** (no router — single page with smooth anchor scrolling)
- Plain, modular **CSS** with custom properties for theming (light/dark)
- Content lives in plain data files under [`src/data/`](src/data) — no CMS
- Contact is a `mailto:` link — no API keys, nothing to run server-side

## Local development

Requires [Node.js](https://nodejs.org/) 20+.

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build → dist/
npm run preview  # serve the built dist/ locally
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project** and import the repo.
3. Vercel auto-detects the **Vite** preset (build `vite build`, output `dist/`). Just click **Deploy** — no environment variables, no `vercel.json` needed.

## Make it yours

Everything you need to edit is content + a few tokens:

| What | Where |
| --- | --- |
| Name, headline, intro, initials (hole cards), clock city | [`src/data/heroData.js`](src/data/heroData.js) |
| Bio paragraphs | [`src/data/aboutData.js`](src/data/aboutData.js) |
| Skills — the GTO range chart (`raise` = expert, `call` = proficient) | [`src/data/skills.js`](src/data/skills.js) |
| Session stats (the big figures under About) | [`src/data/statsData.js`](src/data/statsData.js) |
| Work history — the dial / order book | [`src/data/experiences.js`](src/data/experiences.js) |
| Projects — the hand of cards | [`src/data/projects.js`](src/data/projects.js) |
| Field notes | [`src/data/notesData.js`](src/data/notesData.js) |
| Contact email, links, location, résumé URL (⌘K command) | [`src/data/contactData.js`](src/data/contactData.js) |
| Ticker tape items | [`src/data/tickerData.js`](src/data/tickerData.js) |
| Footer sign-off | [`src/data/footerData.js`](src/data/footerData.js) |
| Nav labels / logo (drives navbar, footer, and ⌘K palette) | [`src/data/navbarData.js`](src/data/navbarData.js) |
| **Colors (palette)** | [`src/styles/base/variables.css`](src/styles/base/variables.css) — edit `--accent-color`, `--gold`, backgrounds, and text tokens for light + dark |
| Favicon | [`public/favicon.svg`](public/favicon.svg) |
| Page title / social preview | [`index.html`](index.html) (`<title>`, `og:*`), [`public/manifest.json`](public/manifest.json) |

The theme also reads two hardcoded browser-chrome colors in
[`src/contexts/ThemeContext.jsx`](src/contexts/ThemeContext.jsx) (`THEME_COLOR_LIGHT` /
`THEME_COLOR_DARK`) — update them if you change the background colors.

> PWA icons are served from the single SVG favicon. If you want raster PNG icons
> (`192×192`, `512×512`) for installability, export them from `favicon.svg` into
> `public/` and add them back to `manifest.json`.

## License

MIT.
