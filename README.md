# bgnacinski.github.io

Personal site for **Borys Gnaciński**, plus a dedicated project page for **Conductor**.

Built as plain HTML, CSS, and a small amount of vanilla JavaScript — no build step, no framework, no dependencies to install.

## Pages

| Path | Purpose |
| --- | --- |
| `/` | Profile, selected projects, about, and contact links |
| `/conductor/` | Deep dive into the Conductor contactless fare-payment stack |
| `/assets/` | Shared stylesheet, JavaScript, and favicon |

## Preview locally

From the project root:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. (Opening `index.html` directly also works, but the local server matches GitHub Pages behaviour more closely.)

## Publish with GitHub Pages

The site must live in a repository named **`bgnacinski.github.io`** to appear at `https://bgnacinski.github.io/`.

1. Create a **public** repository named `bgnacinski.github.io` on GitHub.
2. From this directory, push the existing history:

   ```bash
   # Skip this line if `origin` is already configured.
   git remote add origin git@github.com:bgnacinski/bgnacinski.github.io.git
   git push -u origin main
   ```

3. In the repository, open **Settings → Pages** and set:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`

GitHub will publish the profile at `https://bgnacinski.github.io/` and Conductor at `https://bgnacinski.github.io/conductor/`.

> If you use a different repository name, the site still works — but it will be served from `https://bgnacinski.github.io/<repo-name>/`, not the root domain.

## Structure

```text
.
├── index.html              # Profile page
├── conductor/
│   └── index.html          # Conductor project page
├── assets/
│   ├── css/style.css       # All styling, light + dark themes
│   ├── js/main.js          # Theme toggle, mobile nav, reveal animations, copy buttons
│   ├── favicon.svg
│   ├── og-home.png         # Social preview for the profile page
│   └── og-conductor.png    # Social preview for the Conductor page
├── 404.html                # Custom not-found page
├── robots.txt
├── sitemap.xml
├── .nojekyll               # Skip Jekyll processing on GitHub Pages
└── README.md
```

## Editing

- **Projects on the profile page:** edit the featured project in `.feature` and the remaining entries in `.work-list` inside `index.html`.
- **Conductor details:** edit `conductor/index.html`. The protocol diagram, response codes, and component descriptions are plain HTML.
- **Colours and typography:** the design tokens are at the top of `assets/css/style.css`. `:root` defines the light paper theme and `[data-theme="dark"]` overrides it.
- **Links:** all links are relative (`../`, `#anchor`) so the site works at the domain root or under a project subpath.

## Notes

- The theme follows the visitor's system preference on first load and can be toggled; the choice is stored in `localStorage`.
- The handshake diagram and clone commands include copy buttons.
- The footer discloses that the site was written by the AI model DeepSeek V4.1 Flash. The Conductor page also carries a bordered notice describing which technical decisions the AI assisted with.
- Motion is disabled automatically for visitors who prefer reduced motion.
- Fonts are loaded from Google Fonts (Instrument Serif for display, Instrument Sans for body, IBM Plex Mono for metadata) with system fallbacks.
- The visual system is intentionally quiet: warm paper, near-black ink, a single deep green accent, ruled lists, and no build-time assets beyond the two social preview images.
