# CLAUDE.md

## Project Overview

**Baron OS** — not a portfolio website. A personal operating system experience that presents Baron Miguel Niog's identity, skills, projects, leadership journey, faith, writing, and software engineering work through the lens of a modern digital workspace. Visitors should feel like they're entering a workstation and exploring a mind, not reading a resume.

**Core principle:** simple, robust, understandable systems over unnecessary complexity. Prefer maintainable solutions over clever ones, and build only what provides real value — don't over-engineer small problems or add dependencies without a clear benefit.

**Project rule:** never sacrifice completion for aesthetics. Priority order: Working > Deployed > Fast > Beautiful > Fancy. A deployed V1 beats a perfect version that never ships.

## Design Philosophy

Inspired by: operating systems, developer terminals, cyberdecks, knowledge graphs (Obsidian), VS Code, Apple-level polish, old-school computing aesthetics.

Visual language: ASCII art, terminal interfaces, green monochrome accents, modern UI components, smooth animations, 3D interactions, interactive knowledge maps.

Avoid: cringe hacker aesthetics, Matrix copycats, overly dark/edgy design, excessive animation. Target feel: professional, memorable, technical, elegant.

## Tech Stack

- **Frontend**: React + TypeScript + Vite, Tailwind CSS + shadcn/ui, Framer Motion, React Three Fiber / Three.js / Drei, React Router
- **State**: React state (local UI), Zustand (global client state — e.g. terminal/window manager), TanStack Query (server data), Zod (validation)
- **Backend**: Firebase Cloud Functions — server-side logic, secure operations, data validation, API integrations
- **Database**: Cloud Firestore — collections: `projects`, `articles`, `experience`, `skills`, `leadership`, `commands`, `certifications`, `creativeWorks`, `profile`, `settings`
- **Auth**: Firebase Authentication, admin-only — public visitors need no account
- **Storage**: Firebase Storage — screenshots, certificates, documents, multimedia, profile images
- **Hosting**: Firebase Hosting
- **AI (Phase 3, optional)**: BaronGPT — a portfolio-knowledge assistant backed by Gemini Flash, OpenAI, or the Claude API

## Project Structure

```
src
├── assets
├── components
│   ├── global    shared across multiple pages (ascii, 3d, cursor, os shell, terminal, applications)
│   ├── public    page-specific, mirrors pages/public (home, about, skills, projects, articles, contact)
│   ├── admin     page-specific, mirrors pages/admin
│   └── ui        shadcn/ui primitives
├── layouts       page layouts (RootShell, ApplicationLayout)
├── pages         route-level pages — public/ and admin/, mirrors components/
├── hooks         custom React hooks
├── store         Zustand global client state
├── data          static content/config data
├── services      Firebase/API logic
├── config        Firebase configuration
├── types         TypeScript definitions
├── lib           helper functions, motion/layout tokens
└── main.tsx
```

A page (`pages/**`) owns its layout and component composition directly — it should read as the assembly of its section, not a single opaque wrapper component. Only extract a shared component when the same UI is reused across pages (→ `components/global`) or when a page section is genuinely complex on its own.

## Coding Guidelines

- Explicit TypeScript types everywhere, no `any`; keep shared interfaces/types organized.
- Functional components with clean props; extract shared logic into custom hooks.
- Avoid huge components, business logic mixed into UI, and duplicate code.
- Firebase access always flows **Component → Hook → Service → Firebase** — never call Firebase directly from a component.

## UI & Navigation Guidelines

Professional, clean, modern — inspired by GitHub, Linear, Vercel, Stripe, filtered through the OS/terminal visual language above. Avoid excessive animation, unnecessary effects, or anything that hurts usability.

**Dual navigation, always in parity:** a clickable UI (cards, buttons, windows — required, since most recruiters won't type commands) and an optional terminal command interface (`help`, `about`, `projects`, `skills`, `experience`, `leadership`, `contact`, plus easter eggs like `whoami`, `cat journal.txt`, `sudo reveal-dreams`). Both must trigger identical actions — no terminal-only functionality.

**React Three Fiber** should enhance, not replace: use sparingly, for visual storytelling (portal transitions, the knowledge graph, floating diagrams, skill trees), not on every page. The site must stay fully usable without 3D.

## Content Sections

- **Boot sequence** — brief loading animation into the dashboard on entry
- **Dashboard** — name, roles, current mission, availability status
- **About** — education, leadership, values, faith, engineering journey
- **Experience** — interactive timeline of roles (data in Firestore `experience`)
- **Skills** — categorized: software engineering, leadership, music, writing (data in Firestore `skills`)
- **Projects** — terminal-vault style browsing; selecting one opens a project window (data in Firestore `projects`)
- **Articles** — technical, leadership, faith reflections, career/lessons-learned, journal highlights (data in Firestore `articles`)
- **Contact** — email, LinkedIn, GitHub, resume download
- **Knowledge Graph** (signature feature) — Obsidian-style node map connecting engineering, leadership, faith, writing, music, and projects; clicking a node expands related content

## Feature Development Rules

Before adding a feature, ask: does it improve UX? Does it demonstrate engineering ability? Is it maintainable? Don't build something just because it's technically possible.

## Git Commits

Use meaningful, conventional messages (`feat:`, `fix:`, `refactor:`, ...). Avoid vague messages like "update" or "fixed stuff".

## Working with Claude Code

- Read the relevant files before editing; make the smallest change that satisfies the request; preserve existing architecture and conventions.
- Prefer Read/Edit/Write tools over terminal commands. Terminal is fine for installing a required dependency, running the dev server, checking build/lint errors, running tests, or checking git/project status — avoid using it to generate or rewrite files, run destructive commands, or install unnecessary packages.
- Before a major change, briefly state what files will change, why, and the impact. Prefer incremental changes over large batches.
- Understand and take ownership of any generated code — don't blindly accept it. Architecture decisions stay Baron's.

## Roadmap

- **V1 (ship fast, no AI, no heavy 3D)**: landing/boot sequence, dashboard, about, experience, projects, skills, contact, terminal theme.
- **V2**: knowledge graph, interactive timeline, richer animations, command palette.
- **V3**: BaronGPT, advanced 3D experiences, interactive OS desktop, dynamic project explorer.

## Goal

An experience that proves Baron can design, build, maintain, and communicate complex systems — impressive because it's well-engineered and deliberately designed, not because it's unnecessarily complicated.
