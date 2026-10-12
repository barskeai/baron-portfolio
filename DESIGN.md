# BARON OS — DESIGN SYSTEM

## Design Vision

Baron OS is a digital workspace that represents Baron as:

* Software Engineer
* Creative Technologist
* Builder
* Leader
* Writer

The design should feel like:

* A modern operating system
* A developer workstation
* A creative studio
* A personal knowledge system

The experience should be:

* Technical
* Elegant
* Minimal
* Memorable
* Human

---

# Design Principles

## 1. Function Before Decoration

Every visual element must serve a purpose.

Avoid:

* unnecessary animations
* excessive effects
* decorative complexity

---

## 2. Technology With Personality

The interface should communicate engineering thinking while still feeling personal.

Combine:

Engineering:

* terminals
* graphs
* code
* system interfaces

Creative:

* street art
* sketches
* color accents
* visual storytelling

---

## 3. Premium Simplicity

Reference:

* Apple design language
* Linear
* Vercel
* VS Code
* Obsidian

Avoid:

* generic portfolio layouts
* cyberpunk clichés
* matrix aesthetics

---

# Color System

## Primary Background

Main environment:

```css
--background: #0B0F14;
```

Deep workspace black.

Purpose:

* desktop background
* terminal areas
* OS shell

---

# Surface Colors

## Window Surface

```css
--surface: #111820;
```

Used for:

* cards
* windows
* panels

---

## Elevated Surface

```css
--surface-hover: #17212B;
```

Used for:

* hover states
* active elements
* dialogs

---

# Text Colors

## Primary Text

```css
--text-primary: #F5F7FA;
```

Used for:

* headings
* important information

---

## Secondary Text

```css
--text-secondary: #94A3B8;
```

Used for:

* descriptions
* metadata

---

## Muted Text

```css
--text-muted: #64748B;
```

Used for:

* timestamps
* labels

---

# Accent Colors

The identity colors.

Do not use all at once.

Use strategically.

---

## Terminal Green

```css
--terminal-green: #7CFF6B;
```

Represents:

* code
* terminal
* system status

---

## Electric Blue

```css
--electric-blue: #38BDF8;
```

Represents:

* technology
* engineering
* systems

---

## Creative Orange

```css
--creative-orange: #FB923C;
```

Represents:

* creativity
* multimedia
* energy

---

## Artistic Purple

```css
--art-purple: #C084FC;
```

Represents:

* writing
* ideas
* imagination

---

## Street Art Lime

```css
--street-lime: #D9F99D;
```

Represents:

* experimentation
* personality

---

# Color Usage Rules

Default:

```text
80%
Dark Neutral Colors

15%
White/Grey Text

5%
Accent Colors
```

Accent colors should appear as:

* node connections
* highlights
* borders
* animations
* icons

Never create rainbow UI.

---

# Typography

## Primary Font

Recommended:

Inter

Purpose:

* UI
* navigation
* content
* readability

Reason:

Modern, clean, professional.

---

## Developer / Terminal Font

Recommended:

JetBrains Mono

Purpose:

* terminal
* commands
* code blocks
* technical information

---

## Creative Accent Font

Optional:

Use sparingly.

Possible:

Space Grotesk

Purpose:

* hero titles
* special statements

---

# Typography Scale

## Hero

Large:

```
72px - 96px
```

Purpose:

Strong first impression.

---

## Page Titles

```
48px
```

---

## Section Titles

```
32px
```

---

## Body

```
16px - 18px
```

---

## Terminal Text

```
14px - 16px
```

---

# Border System

Use subtle borders.

Default:

```css
border: 1px solid rgba(255,255,255,0.08);
```

Purpose:

Create:

* windows
* panels
* cards

Avoid heavy borders.

---

# Shadows

Use soft shadows.

Example:

```css
box-shadow:
0 20px 50px rgba(0,0,0,0.4);
```

Purpose:

Create depth.

---

# Border Radius

Modern but technical.

Use:

Small:

```
8px
```

Cards:

```
16px
```

Windows:

```
20px
```

Avoid extremely rounded designs.

---

# Animation Philosophy

Animations should feel like a system coming alive.

Examples:

## Boot Sequence

Slow initialization.

---

## Window Opening

Smooth expansion.

---

## Terminal Commands

Typing animation.

---

## Knowledge Graph

Nodes activate and connect.

---

## Scroll

Sections reveal naturally.

---

# Motion Rules

Use:

* Framer Motion
* CSS transitions

Prefer:

* opacity
* translate
* scale

Avoid:

* spinning
* bouncing
* excessive movement

---

# UI Components Style

Components should resemble:

* OS windows
* developer tools
* dashboards

Examples:

## Cards

Should feel like:

```
Application Window
```

not:

```
Generic Portfolio Card
```

---

## Buttons

Should feel like:

```
System Controls
```

not:

```
Marketing Buttons
```

---

# ASCII / Terminal Style

ASCII should be:

* artistic
* readable
* intentional

Example:

```
╭────────────────╮
│  BARON OS      │
│  ONLINE        │
╰────────────────╯
```

Avoid:

* fake hacker screens
* random code spam

---

# React Three Fiber Usage

3D is an enhancement layer.

Use for:

* interactive backgrounds
* knowledge graph visualization
* system transitions

Do not:

* create unnecessary 3D environments
* sacrifice performance

---

# Overall Feeling

When someone visits Baron OS, they should think:

"This feels like a developer's personal system."

Not:

"This is another animated portfolio."

The design goal:

Engineering precision + creative expression.
