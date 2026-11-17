<p align="center">
  <img src="assets/conan.png" alt="AkumaDraw logo" width="240" />
</p>

<h1 align="center">AkumaDraw</h1>

<p align="center">
  A hand-drawn style whiteboard for sketching diagrams, wireframes and ideas — right in the browser.
</p>

<p align="center">
  <a href="#-quick-start"><b>Quick start</b></a> ·
  <a href="#-features"><b>Features</b></a> ·
  <a href="#-configuration"><b>Configuration</b></a> ·
  <a href="#-deployment"><b>Deployment</b></a> ·
  <a href="#-use-it-as-a-react-component"><b>Embed it</b></a>
</p>

---

AkumaDraw is a free-form infinite canvas with a sketchy, pencil-on-paper look. Everything runs in your browser: no account, no server round-trip, and your drawings never leave your machine unless you export or share them yourself. This repository contains both the hosted web app and the reusable React editor component it is built on.

## Table of contents

- [What's inside](#whats-inside)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Configuration](#configuration)
- [Where your drawings are stored](#where-your-drawings-are-stored)
- [Production build](#production-build)
- [Docker](#docker)
- [Deployment](#deployment)
- [Use it as a React component](#use-it-as-a-react-component)
- [Keyboard shortcuts](#keyboard-shortcuts)
- [Testing and code quality](#testing-and-code-quality)
- [Brand assets](#brand-assets)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## What's inside

| Workspace | Package | What it is |
| --- | --- | --- |
| `akumadraw-app` | `akumadraw-app` | The hosted web app (Vite + React). This is what you deploy. |
| `packages/akumadraw` | `@akumadraw/akumadraw` | The editor itself, published as an embeddable React component. |
| `packages/element` | `@akumadraw/element` | Element model, geometry, hit-testing, serialization. |
| `packages/common` | `@akumadraw/common` | Shared constants, helpers, utilities. |
| `packages/math` | `@akumadraw/math` | Vector and curve math used by the renderer. |
| `packages/utils` | `@akumadraw/utils` | Small standalone utilities. |
| `packages/laser-pointer` | `@akumadraw/laser-pointer` | Outline generation for the laser pointer tool. |
| `examples/` | — | Copy-paste starting points for using the editor outside this repo. |
| `dev-docs/` | — | Docusaurus site with the component API documentation. |

The monorepo is wired with **Yarn 1 workspaces**; the app resolves `@akumadraw/*` straight to the package sources through Vite aliases, so editing a package is reflected instantly in the app.

## Features

**Drawing**

- Hand-drawn look with adjustable **stroke colour**, **background colour**, **fill style** (hachure, cross-hatch, solid), **stroke width**, **stroke style** (solid, dashed, dotted) and **roughness**.
- Rectangle, diamond, ellipse, arrow, line, free-draw (pen), text and sticky note tools.
- Arrow binding to shapes, multi-point and elbow arrows, element grouping, frames, lock, layers.
- Text with a hand-drawn font, inline editing and multi-line support.

**Editing**

- Infinite canvas with pan, zoom (10%–4000%), zoom to fit and zen mode.
- Selection (click, box and lasso), copy/paste (including styles), duplicate, undo/redo.
- Snapping, grid mode, alignment guides, flip horizontally/vertically.
- A personal **library** of reusable shapes, persisted in the browser.

**Sharing and export**

- Export to **PNG** and **SVG** (with scale, background, dark-mode and selection-only options), or save the scene as a `.akumadraw` JSON file that can be loaded again.
- Import existing `.akumadraw`/JSON scenes and images by drag and drop.
- Copy a whole scene to the clipboard as a PNG, or share a link when a sharing backend is configured.
- Live collaboration and cursor presence when a WebSocket server and Firebase project are set up (both are optional and off by default).

**App**

- Light and dark theme, follows the system preference by default.
- Installable PWA with offline caching.
- 20+ UI languages.
- **Autosaves continuously** to browser storage — reopen the tab and your drawing is exactly where you left it.

## Tech stack

- **React 19** + **TypeScript 5**
- **Vite 5** for the app, **Vitest** + **Testing Library** for tests
- **Jotai** for app-level state, plain classes/React state inside the editor
- **Canvas 2D** rendering (no WebGL requirement)
- **idb-keyval** for binary files, **localStorage** for the scene and app state
- Optional: **Firebase** (sharing, images for shared links), **socket.io** (collaboration)

## Requirements

| Tool | Version                                                         |
| ---- | --------------------------------------------------------------- |
| Node | **18 or newer** (`engines` field); Node 20/22/24 are known-good |
| Yarn | **1.22.x** (classic). The repo declares `yarn@1.22.22`          |
| OS   | macOS, Linux or Windows (WSL works fine)                        |

> npm and pnpm are not supported: the repo uses Yarn workspaces and a `yarn.lock`.

## Quick start

```bash
# 1. clone
git clone https://github.com/akuma3232/AkumaDraw2.git
cd akumadraw

# 2. install (from the repo root — installs every workspace)
yarn install

# 3. run the app in development mode
yarn start
```

Open **http://localhost:3001** — that's it. The dev server has hot module replacement, an ESLint + TypeScript overlay, and serves `public/` at the site root.

To change the port, set `VITE_APP_PORT` in `akumadraw-app/.env.local` (create the file) or run `yarn --cwd akumadraw-app exec vite --port 3005`.

If you only want the app's dependencies:

```bash
yarn --cwd akumadraw-app install
```

## Available scripts

Run these from the repository root.

| Script | What it does |
| --- | --- |
| `yarn start` | Start the dev server (port `3001` by default). |
| `yarn build` | Production build of the app into `akumadraw-app/build`. |
| `yarn build:packages` | Build every `@akumadraw/*` package to its `dist/` folder. |
| `yarn build:app:docker` | Production build with Sentry disabled (used by the Dockerfile). |
| `yarn build:preview` | Build and serve the production bundle on port `5000`. |
| `yarn start:production` | Build, then serve the bundle on port `5001`. |
| `yarn test` | Vitest in watch mode. |
| `yarn test:all` | Typecheck + lint + formatting check + full test run. |
| `yarn test:typecheck` | `tsc --noEmit` across the monorepo. |
| `yarn test:code` | ESLint with `--max-warnings=0`. |
| `yarn test:other` | Prettier check for CSS/SCSS/JSON/MD/HTML/YML. |
| `yarn test:update` | Update Vitest snapshots. |
| `yarn test:coverage` | Test run with coverage. |
| `yarn fix` | Prettier + ESLint autofix. |
| `yarn rm:build` | Delete build output and package `dist/` folders. |
| `yarn clean-install` | Remove every `node_modules` and reinstall from `yarn.lock`. |

## Project structure

```
akumadraw/
├── akumadraw-app/            # the hosted web app
│   ├── index.html            # HTML shell (icons, OG tags, theme bootstrap)
│   ├── App.tsx               # app shell: persistence, menus, dialogs, collab wiring
│   ├── data/                 # LocalData (autosave), FileManager, tab sync, storage helpers
│   ├── collab/               # live collaboration client
│   ├── components/           # app-level UI (main menu, footer, welcome screen, …)
│   └── vite.config.mts       # Vite config: aliases, PWA, dev server port
├── packages/
│   ├── akumadraw/            # the editor component
│   │   ├── components/       # Toolbar, LayerUI, sidebars, dialogs, logo
│   │   ├── scene/            # rendering, export (PNG/SVG), import
│   │   ├── actions/          # user actions + keyboard shortcuts
│   │   ├── data/             # restore, library storage, editor-local storage
│   │   ├── css/              # theme tokens (`--color-*`) and global styles
│   │   └── locales/          # translations
│   ├── element/              # element model and geometry
│   ├── common/               # shared constants/helpers
│   ├── math/                 # math helpers
│   ├── utils/                # standalone utilities
│   └── laser-pointer/        # laser pointer outlines
├── public/                   # static assets served at the site root
│   ├── logo.png              # the AkumaDraw emblem used in the UI
│   ├── favicon*.png/.ico     # browser + home-screen icons
│   ├── apple-touch-icon.png  # iOS home-screen icon
│   ├── android-chrome-*.png  # Android / PWA icons
│   ├── maskable_icon_*.png   # PWA maskable icons
│   ├── og-image-3.png        # social preview card
│   └── *.woff2               # bundled UI and hand-drawn fonts
├── assets/                   # master brand artwork (emblem source)
├── dev-docs/                 # Docusaurus documentation site
├── examples/                 # integration examples (script tag, Next.js)
├── scripts/                  # build/release helpers
├── Dockerfile                # multi-stage build → nginx
└── vercel.json               # SPA headers + output directory
```

## Configuration

Configuration lives in `.env.development` / `.env.production` inside `akumadraw-app`. **Do not edit those files for local overrides** — create `akumadraw-app/.env.local` (git-ignored) instead; Vite merges it on top.

Every variable is optional. Empty values simply disable the feature that depends on them.

| Variable | Purpose |
| --- | --- |
| `VITE_APP_BACKEND_V2_GET_URL` | URL of the sharing backend used to store `.akumadraw` scenes for share links. |
| `VITE_APP_BACKEND_V2_POST_URL` | Upload endpoint of the sharing backend. |
| `VITE_APP_LIBRARY_URL` | Remote source for the shape library. |
| `VITE_APP_LIBRARY_BACKEND` | Library backend endpoint (when hosting your own library). |
| `VITE_APP_WS_SERVER_URL` | WebSocket server for live collaboration (e.g. `http://localhost:3002`). |
| `VITE_APP_AI_BACKEND` | Backend for the "text to diagram" AI feature. |
| `VITE_APP_FIREBASE_CONFIG` | Firebase web config JSON. `'{}'` disables sharing-to-cloud and collaboration storage. |
| `VITE_APP_PORT` | Dev server port (default `3001`). |
| `VITE_APP_ENABLE_ESLINT` | `true` to run ESLint in the dev overlay. |
| `VITE_APP_ENABLE_PWA` | `true` to enable the service worker while developing. |
| `VITE_APP_ENABLE_TRACKING` | `true` to send anonymous usage events (off by default). |
| `VITE_APP_DISABLE_SENTRY` | `true` to strip Sentry from the build (used by Docker). |
| `VITE_APP_COLLAPSE_OVERLAY` | `false` to open the dev error overlay expanded. |
| `VITE_APP_DEV_DISABLE_LIVE_RELOAD` | `true` to disable HMR (useful when debugging service workers). |
| `VITE_APP_DISABLE_PREVENT_UNLOAD` | `true` to skip the "unsaved changes" browser prompt. |
| `VITE_APP_DEBUG_ENABLE_TEXT_CONTAINER_BOUNDING_BOX` | Debug: draw text container boxes. |

> Anything prefixed `VITE_` is embedded in the client bundle. Never put secrets in these files.

## Where your drawings are stored

AkumaDraw is local-first. There is no database you need to run.

| Data | Stored in |
| --- | --- |
| Scene elements | `localStorage["akumadraw"]` |
| App state (theme, view, styles, panel state) | `localStorage["akumadraw-state"]` |
| Theme, collab username, tab-sync versions | `localStorage["akumadraw-theme"]`, `…-collab`, `version-*` |
| Inserted images / imported files | IndexedDB `files-db` |
| Shape library | IndexedDB `akumadraw-library-db` |

Saving is automatic: every change is debounced (~300 ms), and the scene is also written on tab blur, page hide and unload, so closing the browser (or leaving it in the background) never loses work. Reopening the app restores elements, viewport, styles and theme.

**Reset a drawing:** open the main menu → **Reset canvas**, or clear the site's data in the browser (DevTools → Application → Storage → Clear site data). **Note** that clearing site data also removes your saved library and images.

## Production build

```bash
yarn build            # → akumadraw-app/build
yarn build:preview    # build + serve on http://localhost:5000
```

The output in `akumadraw-app/build` is a static SPA. Upload it to any static host. The app must be served from the **site root** (`/`), because `public/` assets and the service worker use absolute paths.

## Docker

```bash
docker build -t akumadraw .
docker run --rm -p 3000:80 akumadraw      # http://localhost:3000
```

or with compose:

```bash
docker compose up --build
```

The image is a two-stage build (Node 24 → nginx:alpine) that runs `yarn build:app:docker` and copies the static bundle into nginx.

## Deployment

**Vercel** — import the repository; `vercel.json` already sets the install command, the output directory (`akumadraw-app/build`) and the required headers. No extra configuration is needed.

**Netlify / Cloudflare Pages / GitHub Pages / nginx** — build with `yarn build`, publish `akumadraw-app/build`, and add an SPA rewrite so unknown paths return `index.html`:

```
/*  /index.html  200
```

For nginx: `try_files $uri $uri/ /index.html;`. Long cache headers for `*.woff2` and hashed assets are recommended (see `vercel.json` for the exact rules).

**Self-hosting the optional services:** collaboration needs a socket.io server at `VITE_APP_WS_SERVER_URL`, and share links need a Firebase project plus the backend endpoints listed above. Leave them empty to run a purely local whiteboard.

## Use it as a React component

The editor is available as the `@akumadraw/akumadraw` package (this monorepo's `packages/akumadraw`). Inside this repository, build it first:

```bash
yarn build:packages
```

Then embed it in any React app:

```bash
yarn add @akumadraw/akumadraw react react-dom
```

```tsx
import { Akumadraw } from "@akumadraw/akumadraw";
import "@akumadraw/akumadraw/index.css";

export function Whiteboard() {
  return (
    <div style={{ height: "100vh" }}>
      <Akumadraw
        initialData={{
          appState: { viewBackgroundColor: "#ffffff" },
          elements: [],
        }}
        onChange={(elements, appState) => {
          // keep your own copy / sync it somewhere
        }}
      />
    </div>
  );
}
```

To render a scene to a PNG/SVG blob or start a download, use the exported `exportScene(elements, opts)`/`exportToClipboard(elements, opts)` helpers.

Common props: `initialData`, `onChange`, `onPointerUpdate`, `onExportToBackend`, `theme`, `langCode`, `name`, `UIOptions`, `viewModeEnabled`, `gridModeEnabled`, `zenModeEnabled`, `handleKeyboardGlobally`, `autoFocus`. The imperative API (exported as `AkumadrawImperativeAPI`) gives you `updateScene`, `getSceneElements`, `addFiles`, `scrollToContent`, `setToast` and more — see `dev-docs/` for the full reference.

## Keyboard shortcuts

Press <kbd>?</kbd> inside the app for the complete, always up-to-date list.

| Tool      | Key              | Tool        | Key              |
| --------- | ---------------- | ----------- | ---------------- |
| Hand      | <kbd>H</kbd>     | Line        | <kbd>L</kbd> / 6 |
| Selection | <kbd>V</kbd> / 1 | Free draw   | <kbd>P</kbd> / 7 |
| Rectangle | <kbd>R</kbd> / 2 | Text        | <kbd>T</kbd> / 8 |
| Diamond   | <kbd>D</kbd> / 3 | Sticky note | <kbd>N</kbd>     |
| Ellipse   | <kbd>O</kbd> / 4 | Image       | 9                |
| Arrow     | <kbd>A</kbd> / 5 | Eraser      | <kbd>E</kbd> / 0 |

| Action | Shortcut |
| --- | --- |
| Undo / redo | <kbd>Ctrl/⌘</kbd>+<kbd>Z</kbd> / <kbd>Ctrl/⌘</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> |
| Select all | <kbd>Ctrl/⌘</kbd>+<kbd>A</kbd> |
| Copy / paste | <kbd>Ctrl/⌘</kbd>+<kbd>C</kbd> / <kbd>V</kbd> |
| Copy / paste style | <kbd>Ctrl/⌘</kbd>+<kbd>Alt</kbd>+<kbd>C</kbd> / <kbd>V</kbd> |
| Duplicate | <kbd>Ctrl/⌘</kbd>+<kbd>D</kbd> |
| Group / ungroup | <kbd>Ctrl/⌘</kbd>+<kbd>G</kbd> / <kbd>Shift</kbd>+<kbd>G</kbd> |
| Bring forward / send back | <kbd>Ctrl/⌘</kbd>+<kbd>]</kbd> / <kbd>[</kbd> |
| Zoom in / out / reset | <kbd>Ctrl/⌘</kbd>+<kbd>+</kbd> / <kbd>-</kbd> / <kbd>0</kbd> |
| Zoom to fit | <kbd>Shift</kbd>+<kbd>1</kbd> |
| Save as file | <kbd>Ctrl/⌘</kbd>+<kbd>S</kbd> |
| Export image | <kbd>Ctrl/⌘</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd> |
| Clear canvas | <kbd>Ctrl/⌘</kbd>+<kbd>Delete</kbd> |
| Toggle theme | <kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>D</kbd> |
| Zen mode | <kbd>Alt</kbd>+<kbd>Z</kbd> |

## Testing and code quality

```bash
yarn test:typecheck   # tsc across the monorepo
yarn test:code        # eslint, zero warnings allowed
yarn test:other       # prettier check
yarn test:all         # all of the above + the full Vitest suite
yarn test             # Vitest watch mode
yarn test:coverage    # coverage report
```

Tests live next to the code they cover (`*.test.ts` / `*.test.tsx`). Format before committing with `yarn fix`; a Husky pre-commit hook runs lint-staged on staged files.

## Brand assets

The master artwork lives in `assets/conan.png`. Every icon below is generated from it (a per-centre square crop with rounded corners, so the corners stay transparent):

| File                                | Size                          |
| ----------------------------------- | ----------------------------- |
| `public/logo.png`                   | 640×640, rounded, transparent |
| `public/favicon-32x32.png`          | 32×32                         |
| `public/favicon-16x16.png`          | 16×16                         |
| `public/favicon.ico`                | 16/32/48/64                   |
| `public/apple-touch-icon.png`       | 180×180                       |
| `public/android-chrome-192x192.png` | 192×192                       |
| `public/android-chrome-512x512.png` | 512×512                       |
| `public/maskable_icon_x192.png`     | 192×192 (padded for Android)  |
| `public/maskable_icon_x512.png`     | 512×512 (padded for Android)  |
| `public/og-image-3.png`             | 1200×630 social card          |

To regenerate them after changing the artwork (requires ImageMagick):

```bash
SRC=assets/conan.png

# square master with rounded corners, transparent outside the corners
convert "$SRC" -resize 732x732^ -gravity center -extent 732x732 -strip /tmp/icon_sq.png
convert -size 732x732 xc:none -fill white \
  -draw "roundrectangle 0,0,731,731,110,110" /tmp/icon_mask.png
convert /tmp/icon_sq.png /tmp/icon_mask.png -alpha off \
  -compose CopyOpacity -composite /tmp/icon_round.png

# UI logo + browser icons
convert /tmp/icon_round.png -resize 640x640 public/logo.png
for s in 16 32; do convert /tmp/icon_round.png -resize ${s}x${s} public/favicon-${s}x${s}.png; done
convert /tmp/icon_round.png -define icon:auto-resize=64,48,32,16 public/favicon.ico

# home-screen / PWA icons (opaque background)
for s in 180 192; do convert /tmp/icon_round.png -resize ${s}x${s} \
  -background white -alpha remove -alpha off \
  public/$( [ $s = 180 ] && echo apple-touch-icon.png || echo android-chrome-${s}x${s}.png ); done
convert /tmp/icon_round.png -resize 154x154 -background white -alpha remove -alpha off \
  -gravity center -extent 192x192 public/maskable_icon_x192.png

# social card + docs artwork
convert /tmp/icon_round.png -resize 430x430 /tmp/og_icon.png
convert /tmp/og_icon.png -background '#121212' -gravity center -extent 1200x500 -type TrueColor \
  -background '#121212' -gravity north -extent 1200x630 -font DejaVu-Sans-Bold \
  -pointsize 64 -fill '#f3efe6' -gravity south -annotate +0+48 'AkumaDraw' public/og-image-3.png
```

The UI renders the emblem from `/logo.png` via `packages/akumadraw/components/AkumadrawLogo.tsx` (`AkumadrawLogo` with `size="xs|small|normal|large"`).

## Troubleshooting

**The dev server opens on a port I didn't expect.** Vite picks the next free port if `3001` is taken; set `VITE_APP_PORT` in `akumadraw-app/.env.local` to pin it.

**Blank page after a build.** Serve the bundle from the site root and make sure the SPA fallback returns `index.html`; absolute asset paths break when the app is mounted on a sub-path.

**My drawing is gone after reopening.** Check that the browser is not set to clear site data on exit and that you are on the same origin (port included — `localhost:3001` and `localhost:5000` are different storages). Private/incognito windows discard everything on close.

**The scene won't save / "storage full" toast.** localStorage is limited (~5 MB per origin). Images are kept in IndexedDB, but very large scenes can still hit the limit — export to a file and start a fresh canvas.

**Collaboration or share links do nothing.** They are disabled by design until you provide `VITE_APP_WS_SERVER_URL`, `VITE_APP_FIREBASE_CONFIG` and the backend URLs; the defaults ship with `'{}'` and empty strings.

**`Cannot find module @rollup/rollup-linux-x64-gnu` during install.** Known npm optional-dependency quirk: reinstall with `yarn clean-install` (the Dockerfile also handles it).

## License

The editor packages in `packages/` are published under the MIT license (see each package's `package.json`). The AkumaDraw name, emblem and other brand assets in `assets/` and `public/` are the property of the project owner and may not be reused for derivative products without permission.
