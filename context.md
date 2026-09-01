# CHROMA® Studio — Session Context Memory

## Project Overview
**CHROMA® — Digital Design & UI/UX Studio** — A Next.js 16.3.2 portfolio site for a design/engineering studio.
- **Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Radix UI
- **Deployment Target**: Static export (`next build` → `out/`)

---

## Brand Identity & Design System

### Color Palette (Electric Purple / Midnight Obsidian)
| Token | Light (`:root`) | Dark (`.dark`) |
|-------|----------------|----------------|
| `--background` | `#fcfbfe` (lavender-tinted white) | `#080511` (midnight obsidian) |
| `--foreground` | `#0f0b1e` (deep dark violet) | `#f8fafc` (crisp off-white) |
| `--card` | `#ffffff` | `#120c24` |
| `--muted` | `#f3f0fa` | `#1a1130` |
| `--line` | `rgba(15,11,30,0.08)` | `rgba(255,255,255,0.1)` |
| `--accent` | `#7c3aed` (deep electric purple) | `#a855f7` (glowing neon violet) |
| `--acid` | `#a855f7` (neon violet) | `#c084fc` (lighter violet) |
| `--glow-accent` | `124, 58, 237` | `168, 85, 247` |
| `--glow-acid` | `168, 85, 247` | `192, 132, 252` |

**Gradient tokens**: `--grad-a`, `--grad-b`, `--grad-c` for hero shimmer & text gradients.

### Typography Scale
- `--font-display`: Space Grotesk (headlines)
- `--font-sans`: Inter (body)
- `--font-mono`: JetBrains Mono (technical labels)
- Added scale tokens: `--text-label` (11px), `--text-micro` (10px), `--text-caption` (12px)

### Border Radius Scale
Normalized to Tailwind defaults: `rounded-lg` (inputs), `rounded-xl` (cards), `rounded-2xl` (sections), `rounded-3xl` (hero cards), `rounded-full` (pills/circles)

---

## Key Files & Architecture

### App Router Structure
```
app/
├── layout.tsx          # Root layout, fonts, inline theme script, suppressHydrationWarning
├── page.tsx            # Renders <HomeContent /> (dynamic imports)
├── globals.css         # Complete design system (337 lines)
```

### Component Architecture
```
components/
├── ThemeToggle.tsx          # Compact (icon-only) + full pill modes, SSR-safe
├── site-header.tsx          # Fixed header (z-40), nav, mobile sheet, compact toggle
├── site-footer.tsx          # LiveClock, CopyEmailButton, social links, theme-aware
├── home-content.tsx         # Dynamic imports for all sections (SSR: false)
├── logo.tsx                 # C mark + CHROMA® wordmark
├── BeforeAfterSlider.tsx    # Inline + Fullscreen variants, drag/keyboard accessible
├── CaseStudyModal.tsx       # Fullscreen modal with focus trap, stagger animations
├── sections/
│   ├── hero.tsx             # Grid backdrop, corner glow, eyebrow badge, headline reveal
│   ├── case-studies.tsx     # 4 projects, BeforeAfterSlider, modal trigger
│   ├── services.tsx         # Accordion-based capabilities
│   ├── process.tsx          # Timeline steps with glow indicators
│   ├── process.tsx          # Timeline steps with glow indicators
│   ├── estimator.tsx        # Multi-step form (types, budget, name/email/message)
│   └── marquee.tsx          # Infinite scrolling brand logos
├── ui/
│   ├── button.tsx           # 3 variants (default/outline/ghost), glow classes
│   ├── badge.tsx            # 4 variants, mono bumped to 12px
│   ├── accordion.tsx        # Expanded hit area, hover:bg-card, theme-aware
│   ├── sheet.tsx            # Mobile nav drawer, theme-aware close button
│   └── badge.tsx
├── CaseStudyModal.tsx       # Fullscreen modal, focus trap, stagger children
├── BeforeAfterSlider.tsx    # Inline + Fullscreen, drag + keyboard
└── home-content.tsx         # Dynamic imports wrapper
```

---

## Major Design Decisions

### 1. Theme System
- **Class-based dark mode** via `.dark` on `<html>` (Tailwind v4 `@custom-variant dark`)
- **Inline blocking script** in `<head>` reads `localStorage`/`prefers-color-scheme` before paint → no flash
- `suppressHydrationWarning` on `<html>` because script mutates class pre-hydration
- All colors via CSS custom properties → automatic light/dark switching

### 2. Hero Section
- **Grid backdrop**: `.hero-grid-lines` with radial mask fade (32px grid, `--hero-grid-line`)
- **Ambient orbs**: 3 layered radial gradients (top-left warm, top-right violet, bottom accent) with `mix-blend-mode`, `blur-[120px]`, `gpu-accelerated`
- **Eyebrow pill badge**: "Intent-Driven Design Infrastructure" — light/dark variants
- **Headline**: Line-masked reveal (`LineReveal` + `ShimmerText`), 4 lines staggered
- **Floating cards**: Right/left positioned, `animate-float`, counters animate on scroll
- **Removed**: Blurry acid underline under "Drive Growth"

### 3. Case Studies
- 4 projects: Finora, Pulse, Aurea, Flux — each with Before/After images
- `BeforeAfterSlider` inline (card) + fullscreen modal
- Click card → opens `CaseStudyModal` with before/after, metrics, deliverables, team, links
- Grid cards: `h-full flex flex-col` for equal heights

### 4. Before/After Slider
- Two variants: `BeforeAfterSlider` (inline) + `BeforeAfterSliderFullscreen` (modal)
- Drag handle (mouse/touch), keyboard (←/→/Home/End), ARIA slider role
- Arrows: `size-6` at full opacity, `size-12` handle container
- Fullscreen: ESC to close, focus trap on open

### 5. Motion & Performance
- **Framer Motion**: Scroll-triggered `whileInView` animations (staggered)
- **GPU acceleration**: `.gpu-accelerated` class on all animated orbs (`translateZ(0); will-change: transform`)
- **Reduced motion**: All animations disabled via `@media (prefers-reduced-motion: reduce)` — opacity=1, no transforms
- **Dynamic imports**: All sections loaded client-only via `next/dynamic` (SSR false)

---

## TypeScript & Build Status
- **Zero TS errors** (`tsc --noEmit` clean)
- **Build passes**: Static export successful
- **No unused imports** or dead code detected

---

## Accessibility (a11y)
| Feature | Implementation |
|---------|----------------|
| Focus rings | `focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2` on all interactive elements |
| Motion | All animations respect `prefers-reduced-motion` |
| ARIA | Slider role, labels, `aria-modal`, `aria-labelledby`, focus trapping in modal |
| Semantic HTML | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<fieldset>/<legend>` in forms |
| Contrast | All text tokens validated for WCAG AA in both themes |

---

## Z-Index Hierarchy
| Layer | z-index | Components |
|-------|---------|------------|
| Base | 0 | Page content |
| Header | 40 | Fixed navigation |
| Sheet overlay | 50 | Mobile nav drawer |
| Modal | 50 | CaseStudyModal, BeforeAfterSliderFullscreen |
| Tooltip/Toast | 60 | (Future) |

---

## Remaining Known Items (Accepted)
| Item | Reason |
|------|--------|
| `border-white/10` in device mockups (`bg-[#0d0d13]`, `bg-[#08080b]`) | Intentional — dark device frames need white borders |
| `BeforeAfterSlider` kbd elements with white borders | Inside dark containers, intentional |
| `CaseStudyModal` border `border-white/10` | Modal uses `bg-card/95` backdrop; border is subtle accent |
| `violet` button variant removed | Absorbed into `default` (accent glow); reduces variants to 3 |

---

## Pending / Future Considerations
- [ ] Add `IntersectionObserver` polyfill check for older browsers
- [ ] Consider replacing Framer Motion scroll animations with native IntersectionObserver + CSS for bundle size
- [ ] Add proper 404 page with theme awareness
- [ ] Analytics/telemetry integration point
- [ ] CMS integration for case studies / blog

---

## Commands
```bash
# Development
npm run dev

# Type check
npx tsc --noEmit

# Production build (static export)
npm run build

# Lint
npm run lint
```

---

## Session History
- **2026-08-30**: Complete audit + refactor — brand pivot to Electric Purple, theme system, hero redesign, component fixes, accessibility pass, all builds clean