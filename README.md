# Baron OS

> Not a portfolio website — a personal operating system.

Baron OS presents the identity, skills, projects, leadership journey, faith, writing, and software engineering work of **Baron Miguel Niog** through the lens of a modern digital workspace. Visitors boot into a desktop, open applications, and navigate with either the mouse or a built-in terminal — it should feel like exploring a developer's workstation, not reading a resume.

```
╭────────────────╮
│  BARON OS      │
│  ONLINE        │
╰────────────────╯
```

---

## Table of Contents

- [Highlights](#highlights)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Engineering Principles](#engineering-principles)
- [Design System](#design-system)
- [Project Structure](#project-structure)
- [Terminal Commands](#terminal-commands)
- [Getting Started](#getting-started)
- [Security](#security)
- [Roadmap](#roadmap)
- [License](#license)

---

## Highlights

- **Boot sequence** — a scrambled `INITIALIZING...` line resolves into an animated ASCII logo, then hands off to a loading screen and the desktop.
- **OS shell** — a persistent shell wraps every public route: header with system-status indicator, ambient 3D background, a terminal, and a taskbar.
- **Dual navigation** — every destination can be reached by clicking (desktop panels, taskbar) *or* by typing a command in the terminal. Both paths call the same navigation hook, so they cannot drift apart.
- **Portal transitions** — opening an application runs a small, timed state machine (`idle → closing → opening → idle`) that coordinates card animations, the route swap, the cursor state, and the 3D background "energizing".
- **Applications** — About, Skills, Projects, Articles, and Contact each open as an `.EXE`-style application window (`ABOUT.EXE`, `SKILLS.SYS`, `PROJECT_VAULT.EXE`, ...).
- **Live dashboard stats** — the home KPI strip subscribes to Firestore in real time (latest project, certification count) and renders explicit loading / unavailable / ready states.
- **Custom cursor** — a terminal-green cursor that reacts to hover and loading states.
- **Admin area** — protected `/admin` routes, unlocked through a terminal easter egg followed by Google sign-in restricted to a single allowed account.

---

## Tech Stack

### Frontend

| Technology | Role |
| --- | --- |
| [React 19](https://react.dev) | UI library — functional components and hooks throughout |
| [TypeScript 6](https://www.typescriptlang.org) | Static typing in strict-leaning mode (`noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, `erasableSyntaxOnly`) |
| [Vite 8](https://vite.dev) | Dev server and production bundler, with the `@/` → `src/` path alias |
| [React Router 7](https://reactrouter.com) | Client-side routing (SPA mode, nested layout routes via `<Outlet />`) |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility-first styling via the `@tailwindcss/vite` plugin and CSS-first `@theme` tokens |
| [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com) | Accessible, unstyled primitives owned in-repo (`radix-luma` style) |
| [Framer Motion 12](https://motion.dev) | Page, card, terminal, cursor, and glitch animations |
| [React Three Fiber 9](https://r3f.docs.pmnd.rs) + [Drei](https://drei.docs.pmnd.rs) + [Three.js](https://threejs.org) | Ambient wireframe 3D background, used as an enhancement layer only |
| [Lucide](https://lucide.dev) | Icon set |
| [Fontsource](https://fontsource.org) | Self-hosted variable fonts: Inter, JetBrains Mono, Space Grotesk |
| `clsx` + `tailwind-merge` + `class-variance-authority` | Conditional class composition (`cn()` helper) and component variants |
| `tw-animate-css` | Tailwind animation utilities used by shadcn components |

### State and Data

| Technology | Role |
| --- | --- |
| [Zustand 5](https://zustand.docs.pmnd.rs) | Global client state — the OS store (system state, terminal, cursor mode, portal transition) |
| React state | Local UI state (terminal history, hover states, boot stages) |
| [TanStack Query 5](https://tanstack.com/query) | Server-state caching for Firestore data *(installed, adopted as content collections come online)* |
| [Zod 4](https://zod.dev) | Runtime validation of external data *(installed, adopted with the admin CMS)* |

### Backend (Firebase)

| Service | Role | Status |
| --- | --- | --- |
| Firebase Authentication | Admin-only Google sign-in; public visitors need no account | ✅ In use |
| Cloud Firestore | Content database — `projects`, `articles`, `experience`, `skills`, `leadership`, `commands`, `certifications`, `creativeWorks`, `profile`, `settings` | ✅ In use (`projects`, `certifications`) |
| Firebase Analytics | Visitor analytics | ✅ Initialized |
| Firebase Storage | Screenshots, certificates, documents, profile images | 🗓️ Planned |
| Cloud Functions | Server-side validation, secure operations, API integrations | 🗓️ Planned |
| Firebase Hosting | Production hosting | 🗓️ Planned |

### Tooling

| Tool | Role |
| --- | --- |
| ESLint 10 (flat config) + `typescript-eslint` | Linting |
| `eslint-plugin-react-hooks` | Enforces the Rules of Hooks and correct effect dependencies |
| `eslint-plugin-react-refresh` | Keeps modules compatible with Vite fast refresh |

---

## Architecture

### Layered data flow

Firebase is never called from a component. Every data access follows one direction:

```
Component  →  Hook  →  Service  →  Firebase
```

| Layer | Responsibility | Example |
| --- | --- | --- |
| **Component** | Rendering and user interaction only | `KpiStrip.tsx` |
| **Hook** | Turns a data source into React state with explicit status | `usePortfolioStats.ts` |
| **Service** | Talks to Firebase; owns queries, schemas, and error mapping | `services/portfolioStats.ts` |
| **Config** | Initializes the Firebase app from environment variables | `config/firebase.ts` |

This keeps components testable and presentational, lets the data source change without touching UI code, and makes every Firebase call easy to find and audit.

### OS state machine

The shell is driven by a single Zustand store ([`src/store/osStore.ts`](src/store/osStore.ts)) with a small, typed set of states:

```
BOOT  →  LOADING  →  DESKTOP  ⇄  TERMINAL
```

`RootShell` renders whichever screen matches the current state inside `AnimatePresence`, so every transition is animated and there is exactly one source of truth for "where the system is".

### Portal transitions

Navigating between the desktop and an application is sequenced by [`PortalTransition`](src/components/global/os/PortalTransition.tsx) — a component with **no visual output** whose only job is timing:

1. A click (or command) calls `startPortalEnter(id)` → phase `closing`, cursor switches to `loading`.
2. After `CARD_EXIT_DURATION_MS`, the route changes and the phase becomes `opening`.
3. After `PAGE_ENTER_SETTLE_MS`, the transition ends and the cursor returns to `idle`.

Visual components (navigation panels, the 3D background, the destination page) *react* to the phase instead of coordinating with each other directly. Timing constants live in one place ([`src/lib/glitchMotion.ts`](src/lib/glitchMotion.ts)).

### Command registry

Terminal commands are declared as data in [`commands.ts`](src/components/global/terminal/commands.ts). Navigation commands are **generated from the same `NAVIGATION_TARGETS` list** that drives the desktop panels and taskbar, so adding a new application automatically adds its command, its taskbar entry, and its `help` listing. Commands receive a narrow `CommandContext` (`navigateTo`, `clear`, `requestPassword`) rather than reaching into global state.

### Routing

- Public routes are nested under `RootShell`, so the shell (cursor, boot gate, terminal, taskbar, 3D background) persists across navigation instead of remounting.
- Admin routes sit outside the shell and are wrapped in `RequireAuth`.
- A catch-all `*` route renders a themed 404.

---

## Engineering Principles

These principles guide every change in the codebase.

### 1. Working > Deployed > Fast > Beautiful > Fancy
Completion is never sacrificed for aesthetics. A shipped V1 beats a perfect version that never ships.

### 2. Simple, robust, understandable systems
Prefer maintainable solutions over clever ones. Don't over-engineer small problems, and don't add a dependency without a clear benefit.

### 3. Single source of truth
- Navigation targets, icons, and accent colors are defined once in [`types/navigation.ts`](src/types/navigation.ts) and consumed by the desktop, taskbar, terminal, and application pages.
- Design tokens live in [`index.css`](src/index.css); motion timings in [`lib/glitchMotion.ts`](src/lib/glitchMotion.ts); layout tokens in [`lib/layoutTokens.ts`](src/lib/layoutTokens.ts).

### 4. Separation of concerns
UI, state, and data access live in separate layers (`components/`, `hooks/` + `store/`, `services/`). Business logic doesn't live in components.

### 5. Explicit types, no `any`
Shared types are centralized in `src/types/`. Async UI state is modeled as discriminated unions — for example:

```ts
type StatState<T> =
  | { status: "loading" }
  | { status: "unavailable" }
  | { status: "ready"; value: T };
```

so every state must be handled explicitly and impossible combinations can't be represented.

### 6. Pages own their composition
A route-level page reads as the assembly of its sections rather than a single opaque wrapper. Components are only extracted when they are reused across pages (→ `components/global`) or genuinely complex on their own.

### 7. Feature parity between UI and terminal
There is no terminal-only functionality. Most recruiters won't type commands, so the clickable UI is required; the terminal is an optional, equivalent interface that triggers the exact same actions.

### 8. Progressive enhancement
3D enhances, never replaces. The ambient scene is wrapped in an error boundary that renders nothing on failure, and it is `pointer-events-none`, so the site stays fully usable if WebGL is unavailable.

### 9. Accessibility
Interactive elements are real `<button>`s with `aria-label`s, active navigation uses `aria-current="page"`, and focus states use visible `focus-visible` rings.

### 10. Resource cleanup
Every Firestore listener, auth subscription, interval, and timeout returns a cleanup function from its effect, so nothing leaks across navigation.

### 11. Every feature has to earn its place
Before adding a feature: does it improve UX? Does it demonstrate engineering ability? Is it maintainable? Nothing gets built just because it's technically possible.

---

## Design System

The full design system lives in [`DESIGN.md`](DESIGN.md). In short:

**Vision:** engineering precision + creative expression. Inspired by operating systems, developer terminals, VS Code, Obsidian, Linear, Vercel, and Apple-level polish. It deliberately avoids Matrix clichés, fake hacker screens, and generic portfolio layouts.

| Token | Value | Meaning |
| --- | --- | --- |
| `--background` | `#0B0F14` | Deep workspace black |
| `--surface` | `#111820` | Windows, cards, panels |
| `--surface-hover` | `#17212B` | Hover / active / dialogs |
| `--terminal-green` | `#7CFF6B` | Code, terminal, system status — **About** |
| `--electric-blue` | `#38BDF8` | Technology, systems — **Skills** |
| `--creative-orange` | `#FB923C` | Creativity, multimedia — **Projects** |
| `--art-purple` | `#C084FC` | Writing, ideas — **Articles** |
| `--street-lime` | `#D9F99D` | Experimentation, personality — **Contact** |

- **Color ratio:** ~80% dark neutrals, ~15% text, ~5% accents. Never a rainbow UI.
- **Typography:** Inter (UI), JetBrains Mono (terminal / technical), Space Grotesk (sparing display accents).
- **Motion:** opacity, translate, and scale. No spinning, bouncing, or excessive movement — animation should feel like a system coming alive.

---

## Project Structure

```
src
├── assets
├── components
│   ├── global        shared across pages
│   │   ├── 3d            R3F scene, lighting, ambient background
│   │   ├── applications  application window header, hero, cards, transitions
│   │   ├── ascii         ASCII logo, glitch text, scramble text
│   │   ├── cursor        custom cursor
│   │   ├── os            boot/loading screens, portal sequencer, taskbar
│   │   └── terminal      terminal, input, output, command registry
│   ├── public        page-specific components, mirrors pages/public
│   ├── admin         admin components (route guard)
│   └── ui            shadcn/ui primitives
├── layouts           RootShell (persistent OS shell), ApplicationLayout
├── pages
│   ├── public        Home, About, Skills, Projects, Articles, Contact, NotFound
│   └── admin         Dashboard, Projects, Articles, Experience, Settings
├── hooks             useOSState, useTerminal, useNavigation, useAuth, usePortfolioStats, ...
├── store             Zustand OS store
├── data              static content / config
├── services          Firebase access (auth, portfolio stats)
├── config            Firebase initialization
├── types             shared TypeScript definitions
├── lib               helpers, motion + layout tokens
└── main.tsx
```

---

## Terminal Commands

| Command | Action |
| --- | --- |
| `help` | List available commands |
| `about` | Open About |
| `skills` | Open Skills |
| `projects` | Open the project vault |
| `articles` | Open Articles |
| `contact` | Open Contact |
| `clear` | Clear the terminal |

There are also a few hidden commands. Try `whoami`.

---

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (required by Vite 8) and npm
- A Firebase project with Authentication (Google provider) and Firestore enabled

### Install

```bash
git clone https://github.com/barskeai/baron-portfolio.git
cd baron-portfolio
npm install
```

### Environment variables

Create a `.env` file in the project root (it is git-ignored):

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

### Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`tsc -b`) and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Security

- **Secrets stay out of the repo** — Firebase config is read from `VITE_*` environment variables; `.env` files are git-ignored.
- **Admin access is gated by identity, not by a password.** The terminal `login` prompt is a deliberate easter egg and offers no protection on its own (it ships in the bundle). Real access requires Google sign-in with the single allowed admin account; any other account is signed out immediately, and `RequireAuth` redirects unauthorized visitors.
- **Client checks are not the final line of defense.** Client-side route guards only control the UI; writes to Firestore must be enforced with Firestore Security Rules (and, later, Cloud Functions).
- **Dependency audit notes** are tracked in [`SECURITY.md`](SECURITY.md).

---

## Roadmap

### V1 — ship fast *(in progress)*
- [x] Boot sequence and loading screen
- [x] OS shell: header, taskbar, terminal, custom cursor, ambient 3D background
- [x] Desktop dashboard with navigation panels and live KPI strip
- [x] Terminal with command registry and easter eggs
- [x] Portal transitions between desktop and applications
- [x] Application shells for About, Skills, Projects, Articles, Contact
- [x] Admin authentication and protected routes
- [ ] Real content in each application, backed by Firestore
- [ ] Experience timeline
- [ ] Resume download
- [ ] Deploy to Firebase Hosting

### V2
- [ ] Knowledge graph — Obsidian-style node map connecting engineering, leadership, faith, writing, music, and projects
- [ ] Interactive timeline
- [ ] Command palette
- [ ] Admin CMS for projects, articles, and experience

### V3
- [ ] BaronGPT — an AI assistant grounded in portfolio knowledge
- [ ] Advanced 3D experiences
- [ ] Interactive OS desktop with draggable windows
- [ ] Dynamic project explorer

---

## License

[MIT](LICENSE) © 2026 Baron Miguel L. Niog
