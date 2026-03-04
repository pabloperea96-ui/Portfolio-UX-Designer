# Portfolio Site — AI Collaboration Guidelines

This document captures the architecture, conventions, and communication patterns established for this project. Its purpose is to make every future AI session faster and more accurate by eliminating repeated context-setting.

---

## 1. Project Overview

A personal UX/Product Design portfolio built in React + Vite + Tailwind CSS v4. It has a strict design system enforced through CSS custom properties — all visual values must come from tokens, never from hardcoded values.

**Stack:**
- React 18 + TypeScript
- Vite
- Tailwind CSS v4 (`@theme inline` mapping in `theme.css`)
- React Router (Data mode via `RouterProvider`)
- Motion (`motion/react`) for scroll-reveal animations

**Key directories:**
```
/src/app/components/ds/     ← Design System primitives (the source of truth)
/src/app/components/ds/index.ts  ← Barrel export — always update when adding a DS component
/src/app/pages/             ← Route-level page components
/src/app/layouts/           ← RootLayout, Navigation
/src/styles/theme.css       ← All CSS tokens (colors, spacing, radius, typography)
/src/styles/tailwind.css    ← Tailwind v4 @theme inline mappings
/src/styles/fonts.css       ← Font-face definitions (Inter). Only file where @font-face goes.
/src/imports/               ← Figma-exported assets (SVGs, raster images)
/guidelines/Guidelines.md   ← This file
```

---

## 2. Non-Negotiable Rules

These apply to every single generation, no exceptions.

### 2.1 Design System Tokens — Never Hardcode Values

All colors, spacing, radii, and typography must reference CSS custom properties defined in `theme.css`. Tailwind utility classes that map to those tokens (via `tailwind.css`) are fine. Direct hex values, pixel values, or `rem` values in component code are not.

```tsx
// WRONG
<div style={{ color: '#141411', padding: '24px', borderRadius: '16px' }}>

// CORRECT — CSS variable
<div style={{ color: 'var(--ds-text-primary)', padding: 'var(--ds-space-24)', borderRadius: 'var(--ds-radius-md)' }}>

// CORRECT — Tailwind token utility
<div className="text-ds-text-primary p-ds-24 rounded-ds-md">
```

### 2.2 Typography — Inter Only

The only permitted font is Inter, declared in `/src/styles/fonts.css`. Never import or reference other fonts. Never add `@font-face` or `@import` for fonts anywhere except `fonts.css`.

### 2.3 Read Before Touching

Before editing any file, read all files that will be affected. Never edit blindly. If a change touches more than one file (e.g. renaming a prop), confirm the complete list of affected files before starting.

### 2.4 TechnicalSheet Props at the Call Site

`TechnicalSheet` is the universal text primitive. Its visual behavior is controlled entirely by props passed at the call site — never by modifying the component internals.

```tsx
// WRONG — editing TechnicalSheet itself to make one usage look different
// CORRECT — pass size, subtitleVariant, align, etc. at the call site
<TechnicalSheet size="section" subtitleVariant="label" align="left" ... />
```

### 2.5 DS Index Stays in Sync

Every new DS component must be exported from `/src/app/components/ds/index.ts` immediately after creation. Deleted components must be removed from the index in the same commit.

### 2.6 Documentation Stays in Sync with the Component

Every time a DS component is **created**, **modified**, or **deleted**, all of the following documents must be updated in the same session — no exceptions:

| Document | What to update |
|---|---|
| `/guidelines/Guidelines.md` → Section 4 | Add / update / remove the component entry in the DS Component Catalog. Include purpose, all props, and at least one usage pattern. |
| `/guidelines/Guidelines.md` → Section 9 | Reflect any new checklist steps introduced by the change. |
| `/guidelines/Guidelines.md` → Section 8 | Add a "Don't / Do instead" row if the change deprecates an old pattern or introduces a new one that could be misused. |
| `/src/app/components/ds/index.ts` | Add or remove the export for the component and its types. |
| Any page or component that imports the changed DS component | Update call sites to match new prop names, renamed variants, or removed props. |

**The rule in plain language:** the guidelines document is the living spec of the design system. If the code changes and the doc doesn't, the doc is wrong. Never leave a session with the two out of sync.

---

## 3. Design System Token Reference

### Colors
| Token | Value | Use |
|---|---|---|
| `--ds-text-primary` | `#141411` | Primary body text, headings |
| `--ds-text-secondary` | `#6C6262` | Secondary/supporting text |
| `--ds-text-tertiary` | `#867C7C` | Placeholder, captions, inactive |
| `--ds-text-tertiary-inverse` | `#A89F9F` | Tertiary text on dark/inverse surfaces (accessible ~5.4:1 contrast on `--ds-surface-inverse`) |
| `--ds-text-inverse` | `#FFFFFF` | Text on dark surfaces |
| `--ds-surface-page` | `#FFFFFF` | Page background |
| `--ds-surface-card` | `#F3F3F3` | Card surfaces |
| `--ds-surface-background` | `#F6F6F6` | Section backgrounds |
| `--ds-surface-inverse` | `#292925` | Dark/inverted surfaces |
| `--ds-action-primary` | `#388259` | Primary CTAs, active states |
| `--ds-border-default` | `#ACACAC` | Standard borders |
| `--ds-border-subtle` | `#D2D2D2` | Dividers, ghost borders |
| `--ds-border-focus` | `#52B47E` | Focus rings |

### Case Study Accent (Scoped)
| Token | Default | Use |
|---|---|---|
| `--cs-accent` | `var(--ds-action-primary)` | Per-project accent color. Set on the case study page root `<div>` via inline style. Hero background, numbered pills, exhibit controls, annotation highlights. Falls back to portfolio green when unset. Tailwind: `bg-cs-accent`, `text-cs-accent`, `border-cs-accent`. |
| `--cs-accent-text` | `#212226` | Text color on `--cs-accent` backgrounds (hero titles, pill numbers). Override per-page if the accent is dark. |

**Pattern — setting per-project accent:**
```tsx
const CS_ACCENT = '#F0C70E';    // project's brand color
const CS_ACCENT_TEXT = '#212226'; // legible text on that color

<div
  className="relative min-h-screen bg-background text-ds-text-primary"
  style={{
    '--cs-accent': CS_ACCENT,
    '--cs-accent-text': CS_ACCENT_TEXT,
  } as React.CSSProperties}
>
  {/* All children inherit --cs-accent */}
</div>
```

**Subtle accent background (5% tint):**
```css
background: color-mix(in srgb, var(--cs-accent) 5%, transparent);
```

### Spacing
All spacing tokens are available as Tailwind utilities: `p-ds-24`, `gap-ds-48`, `mb-ds-96`, etc.

| Token | Value (Comfortable mode) |
|---|---|
| `--ds-space-4` | 4px |
| `--ds-space-8` | 8px |
| `--ds-space-12` | 12px |
| `--ds-space-16` | 16px |
| `--ds-space-24` | 24px |
| `--ds-space-32` | 32px |
| `--ds-space-48` | 48px |
| `--ds-space-64` | 64px |
| `--ds-space-72` | 72px |
| `--ds-space-96` | 96px |
| `--ds-space-102` | 102px |

Spacing scales down automatically at `max-width: 767px` via `:root` overrides — no component code changes needed.

### Radius
| Token | Value | Tailwind |
|---|---|---|
| `--ds-radius-sm` | 14px | `rounded-ds-sm` |
| `--ds-radius-md` | 16px | `rounded-ds-md` |
| `--ds-radius-lg` | 26px | `rounded-ds-lg` |
| `--ds-radius-xl` | 24px | `rounded-ds-xl` |
| `--ds-radius-pill` | 40px | `rounded-ds-pill` |

### Layout
| Token | Value | Use |
|---|---|---|
| `--ds-max-w-content` | `1386px` | Site-wide content column max-width. Every homepage section (`Hero`, `ProjectsSection`, `About`, `Contact`) uses `max-w-(--ds-max-w-content)` on its inner content wrapper. Change once here to resize every section simultaneously. |
| `--ds-aspect-hero-image` | `645 / 739` | Aspect ratio of the Hero thumbnail (portrait, approximately 7:8.7). Used as `style={{ aspectRatio: 'var(--ds-aspect-hero-image)' }}` on the image wrapper in `Hero.tsx`. |

---

## 4. DS Component Catalog

These are the primitives. New UI should be built by composing these — not by duplicating their logic in page files.

### Layout Primitives

#### `ProjectCard`
The unified image + text layout component. Replaced both the old `ProjectCard` and the deleted `SolutionBlock`.

**Layout axis** (`layout` prop):
- `'left'` — horizontal, image left / text right (default)
- `'right'` — horizontal, text left / image right
- `'top'` — vertical, image above text

**Image axis** (`imageVariant` prop):
- `'thumbnail'` — `ProjectThumbnail` with hover-zoom + gradient overlay. For portfolio listing cards.
- `'editorial'` — `ContentImage`, plain rounded image. For case study solution sections.
- `'mockup'` — `IPhoneMockup`, iPhone 16 SVG frame with navigable frames. For showcasing app screens.

**Key props:**
```tsx
// Thumbnail/editorial image
image?: string
alt?: string
imageAspectRatio?: string    // default '4/3'
imageRounded?: string        // editorial only
imageCaption?: string        // editorial only
imageClassName?: string      // thumbnail only
zoom?: number                // thumbnail only

// Mockup
mockupFrames?: string[]      // required when imageVariant='mockup'
mockupMaxWidth?: string      // default '280px'
activeMockupFrame?: number   // controlled
onMockupFrameChange?: (i) => void  // controlled callback
scrollHint?: boolean         // one-time swipe-up gesture hint for scrollable screens

// Text (forwarded to TechnicalSheet)
subtitle?: string
subtitleVariant?: 'eyebrow' | 'label'
title: ReactNode
description?: ReactNode
sheetAlign?: 'left' | 'centered'
sheetSize?: 'default' | 'small' | 'large' | 'section'
children?: ReactNode         // BulletList, stats, badges — slot inside TechnicalSheet

// Tags
tags?: string[]
hasBadges?: boolean

// CTA
showCta?: boolean
ctaType?: 'link' | 'button'
ctaLabel?: string
onCtaClick?: () => void
buttonVariant?: 'primary' | 'secondary'

// Behavior
scrollReveal?: boolean       // each column gets its own MotionReveal
scrollHint?: boolean         // shows swipe-up hint via IPhoneMockup (mockup variant only)
spaced?: boolean             // adds mb-ds-96 below (for stacked blocks)
```

**Pattern: Portfolio listing card**
```tsx
// All fields come from the ProjectData array — never compute alt or zoom inline.
<ProjectCard
  layout="left"
  image={project.image}
  alt={project.alt}           // dedicated alt string, not project.title
  tags={project.tags}
  subtitle={project.subtitle}
  title={project.title}
  description={project.description}
  ctaLabel="Ver Proyecto"
  onCtaClick={() => navigate(`/projects/${project.slug}`)}
  zoom={project.zoom}         // optional, from data; omit to use default (1)
  showCta={project.showCta ?? true}
/>
```

**Pattern: Case study solution block**
```tsx
<ProjectCard
  layout="left"                  // or 'right' to alternate
  imageVariant="editorial"
  subtitleVariant="label"
  sheetSize="section"
  subtitle="01 — Section Name"
  title="Heading"
  description="..."
  scrollReveal
  spaced                         // omit on the last block in a sequence
>
  <BulletList items={[...]} />
</ProjectCard>
```

**Pattern: iPhone mockup card**
```tsx
<ProjectCard
  layout="right"
  imageVariant="mockup"
  mockupFrames={[screen1, screen2, screen3]}
  mockupMaxWidth="260px"
  subtitle="Feature Name"
  title="Heading"
  description="..."
  scrollReveal
  scrollHint
/>
```

---

#### `IPhoneMockup`
Standalone iPhone 16 Natural Titanium SVG mockup. Scalable vector, `viewBox="0 0 390 804"`.

- Single `frames` item → static screen
- Multiple items → dot-navigable frames (click left/right half, or tap dots)
- Uncontrolled by default; pass `activeFrame` + `onFrameChange` for external prototype control
- `scrollHint={true}` → shows a persistent "Try scrolling" chip with a `Mouse` icon below the phone frame, with a slow bobbing animation. Renders in the portfolio canvas layer — never overlaid on the app screen. Use for scrollable ReactNode frames to signal interactivity.
- `interactiveHint={true}` → enables Figma-style interactive hotspot discovery. On first scroll-into-view, all `[data-hotspot]` elements inside the screen flash with a blue pulse (one-time entrance hint). When the user clicks the screen but misses a `[data-hotspot]` element, the hotspots flash again. Prototype screens must mark their interactive elements with the `data-hotspot` HTML attribute.

```tsx
<IPhoneMockup
  frames={[screenshot1, screenshot2]}
  activeFrame={step}
  onFrameChange={setStep}
  scrollHint   // add for scrollable screen content
  interactiveHint  // add for screens with interactive elements marked with data-hotspot
/>
```

**Hotspot marking pattern — prototype screens:**
```tsx
// Inside a prototype screen component (e.g. InvestmentSetupScreen):
<button
  data-hotspot            // ← marks this as a discoverable interactive element
  onClick={handleToggle}
  style={{ borderRadius: '6px', /* ... */ }}
>
  Simula tu inversion
</button>
```

---

#### `TechnicalSheet`
The universal text primitive. Every text+CTA block in the project goes through this. Props at call site, never modify the component internals.

**Internal layout (fixed, not configurable via props):**
- Outer wrapper: `flex flex-col gap-ds-24`
- Text block: `flex flex-col gap-ds-8` (subtitle+title group → description)
- Subtitle+Title group: `flex flex-col gap-ds-4` — both `<p>` elements carry `leading-none` (`line-height: 1`) so the CSS gap maps directly to visible glyph-to-glyph spacing. Removing `leading-none` from either element will make the gap appear larger than 4px due to half-leading from `line-height: normal`.

```tsx
<TechnicalSheet
  size="default | small | large | section"
  align="left | centered"
  subtitleVariant="eyebrow | label"
  subtitle="Label text"
  title={<>Rich <span className="italic">heading</span></>}
  description="Body copy"
  hasBadges={true}
  tags={['Tag A', 'Tag B']}
  showCta={true}
  ctaType="link | button"
  ctaLabel="Ver Proyecto"
  onCtaClick={handler}
>
  {/* Optional children slot: BulletList, StatItem grids, etc. */}
</TechnicalSheet>
```

---

#### `MotionReveal`
Scroll-reveal animation wrapper. Uses `IntersectionObserver`.

```tsx
<MotionReveal
  type="slide-up | scale | fade | slide-left"  // animation type (default: 'slide-up')
  delay={0.15}                  // seconds
  duration={0.8}
  margin="-100px"               // intersection root margin
  trigger="inView | mount"      // default: 'inView'
  once={true}                   // animate only once (default: true)
  className="..."
>
  {children}
</MotionReveal>
```

Use `scrollReveal` prop on `ProjectCard` instead of manually wrapping with `MotionReveal` — it applies the right timing automatically.

---

### Image Primitives

| Component | Use | Hover | Props |
|---|---|---|---|
| `ProjectThumbnail` | Portfolio listing images | zoom + gradient overlay | `src`, `alt`, `zoom`, `imageClassName` |
| `ContentImage` | Editorial / case study images | none | `src`, `alt`, `aspectRatio`, `rounded`, `caption` |
| `IPhoneMockup` | App screen mockups | none (interactive navigation instead) | `frames`, `activeFrame`, `onFrameChange`, `scrollHint` |

---

### Section / Layout Components

| Component | Use |
|---|---|
| `CaseStudySection` | Wrapper for each section within a case study. `accent` prop adds background tint. |
| `DesignSection` | Wrapper for homepage sections with `variant` prop (`hero`, `projects`, `cta`, `contact`, `footer`, `pageFooter`, `projectGrid`) |
| `SectionHeader` | Eyebrow + title block for homepage sections. Gap between subtitle and title: `gap-ds-4` (4px). Both subtitle and title use `leading-none` (`line-height: 1`) so the CSS gap maps directly to visible glyph-to-glyph spacing — without it, `line-height: normal` on the 56px heading adds ~5–6px of half-leading that makes the gap appear larger than specified. |
| `ParallaxHero` | Full-bleed parallax hero with an image and overlay text |
| `ProjectOverview` | Intro block within a case study (title, overview, metadata columns) |
| `ProcessGrid` | Grid layout for process/phase blocks |
| `ResultCard` / `ResultGrid` | Results/impact section for case studies. `ResultGrid` also accepts `mockupFrames` to replace the metric-card grid with a centred `IPhoneMockup` (see props below). |
| `QuoteBlock` | Pull-quote component |

---

### Text & Content Components

| Component | Use |
|---|---|
| `BulletList` | Bulleted list, used as children of `TechnicalSheet` |
| `StatItem` | Single stat (number + label), used in grids inside `TechnicalSheet` children |
| `DesignBadge` | Single tag/badge pill. Auto-rendered by `TechnicalSheet` via `tags` prop. |
| `DesignLabel` | Filled label chip (e.g. status labels) |
| `ProjectMetadata` | Key-value metadata row (role, year, platform, etc.) |
| `StepList` | Numbered vertical stepper for synced mockup + annotation walkthroughs. See full entry below. |

---

#### `DesignCard`
Multi-variant card component used across the portfolio for stats, skills, social links, and numbered principles.

**Variants:**
- `metric` — Large stat value + label. Hover: bg darkens, border thickens. Used in About stats and case study challenges.
- `skill` — Dark thumbnail + title + item list. Hover: green border + shadow. Used in About skills.
- `social` — Thumbnail + title/subtitle + hover arrow. Used in Contact section.
- `numbered` — Accent-filled number pill (`--cs-accent` background) + title + description. Used for design constraints/principles in case studies.

**Numbered variant props:**
```tsx
<DesignCard
  variant="numbered"
  number="01"          // formatted number string for the pill
  title="Constraint"
  description="Why this matters..."
/>
```

**Pattern: Case study design constraints grid**
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-ds-24">
  {constraints.map((c, i) => (
    <MotionReveal key={c.num} delay={i * 0.08} duration={0.6}>
      <DesignCard variant="numbered" number={c.num} title={c.title} description={c.desc} />
    </MotionReveal>
  ))}
</div>
```

---

#### `StepList`
Numbered vertical stepper. Designed to sit in the `children` slot of `TechnicalSheet` (via `ProjectCard`) and sync bidirectionally with `IPhoneMockup` via shared parent state.

**Visual anatomy:**
- Left column: numbered pill (32 px circle) + vertical connector line that stretches to match content height
- Right column: step title (always visible) + description (visible only on the active step, animates open/closed)

**Active state:** pill filled `--ds-action-primary`, title bold + `--ds-text-primary`, description expanded.
**Inactive state:** pill outlined `--ds-border-default`, title `--ds-text-secondary`, description hidden.
**Hover on inactive:** pill border + title shift to primary colours.

**Props:**
```tsx
steps: StepItem[]            // { title: string; description?: string }[]
activeStep: number           // controlled — index owned by parent
onStepChange: (i) => void    // fires on pill or row click
className?: string
```

**Full sync pattern — parent owns state, drives both sides:**
```tsx
const [activeStep, setActiveStep] = useState(0);

<ProjectCard
  layout="right"
  imageVariant="mockup"
  mockupFrames={[screen1, screen2, screen3]}
  activeMockupFrame={activeStep}
  onMockupFrameChange={setActiveStep}
  subtitle="Feature"
  title="Heading"
  description="Brief intro"
  showCta={false}
>
  <StepList
    steps={[
      { title: 'Onboarding', description: 'User sees this when first opening the app.' },
      { title: 'Setup',      description: 'One-time configuration reduces friction later.' },
      { title: 'Dashboard',  description: 'Key metrics surfaced above the fold.' },
    ]}
    activeStep={activeStep}
    onStepChange={setActiveStep}
  />
</ProjectCard>
```

**Rules:**
- State always lives in the **parent page component** — never inside `StepList` or `ProjectCard`
- `steps.length` must equal `mockupFrames.length` — each step maps to exactly one frame
- `showCta={false}` is recommended when `StepList` is in the children slot (the steps are the CTA)

---

### Navigation & Controls

| Component | Use |
|---|---|
| `DesignButton` | Primary/secondary action button. Variants: `primary`, `secondary`. Sizes: `small`, `default`, `large`. All sizes use uniform `rounded-ds-md` (`--ds-radius-md`, 16px) border-radius. |
| `CaseStudyLink` | Inline text CTA with arrow (used in `TechnicalSheet` CTA slot via `ctaType="link"`) |
| `DesignFilter` | Filterable tag list (used in AllProjects) |
| `NavButton` | Navigation text links with hover underline animation |
| `BreadcrumbNav` | Breadcrumb trail for case studies |
| `CaseStudyFooter` | Prev/next case study navigation. Supports `variant="inverse"` for dark (`--ds-surface-inverse`) background with `--ds-text-inverse` text. Uses scoped CSS variable overrides so all child components (TechnicalSheet, DesignButton) inherit the inverse palette automatically. Eyebrow/tertiary text uses `--ds-text-tertiary-inverse` (`#A89F9F`) for accessible contrast on the dark surface. Secondary button hover uses `--ds-action-hover-secondary-inverse` (`rgba(255,255,255,0.12)`) for a subtle white overlay that keeps white text readable. |
| `MobileNav` | Mobile navigation drawer |

---

## 5. Architecture Patterns

### Prop Mutation vs. New Component

**Always prefer adding props to an existing component** over creating a new one, unless the components serve fundamentally different purposes (different routing behavior, completely different DOM structure, etc.).

Before creating a new component, ask: "Can this be a prop variant of something that already exists?"

The `ProjectCard` consolidation (formerly `ProjectCard` + `SolutionBlock`) is the canonical example of this principle.

### Controlled vs. Uncontrolled Components

Interactive DS components (`IPhoneMockup`, filters, etc.) follow this pattern:
- **Default: uncontrolled** — manages its own state, works with zero extra props
- **Optional: controlled** — accepts an `activeX` + `onXChange` pair for parent-driven state

This makes components usable standalone but also composable in prototype flows.

### scrollReveal Prop Pattern

When a component renders multiple independent columns/blocks that each need their own scroll-reveal, use the `scrollReveal` prop on `ProjectCard` rather than wrapping in `MotionReveal` at the call site. This keeps the animation logic encapsulated.

When the entire card is a single reveal unit (e.g. a portfolio listing card wrapped in `MotionReveal` in `ProjectsSection`), leave `scrollReveal={false}` (the default).

### MotionReveal Nesting Anti-Pattern

Never wrap a grid or column in a parent `MotionReveal` when every child already has its own `MotionReveal`. The outer reveal fires first, making all children visible, then each child tries to animate from opacity-0 — resulting in a double-flash that looks broken.

```tsx
// WRONG — outer fade conflicts with inner scale reveals
<MotionReveal delay={0.2}>
  <div className="grid grid-cols-2 gap-ds-24">
    {items.map((item, i) => (
      <MotionReveal key={item.id} type="scale" delay={i * 0.1}>
        <Card ... />
      </MotionReveal>
    ))}
  </div>
</MotionReveal>

// CORRECT — plain wrapper, each card owns its own reveal
<div className="grid grid-cols-2 gap-ds-24">
  {items.map((item, i) => (
    <MotionReveal key={item.id} type="scale" delay={i * 0.1}>
      <Card ... />
    </MotionReveal>
  ))}
</div>
```

### Section Layout Pattern

Every homepage section follows the same three-layer structure — never put padding or max-width on the wrong layer:

```tsx
// Layer 1 — semantic HTML, sets background colour and section id
<section id="projects" className="relative bg-ds-surface-background">

  {/* Layer 2 — content constraint: max-width + horizontal padding */}
  <div className="max-w-(--ds-max-w-content) mx-auto px-ds-24 lg:px-ds-48">

    {/* Layer 3 — DesignSection handles flex direction, gap, and vertical padding */}
    <DesignSection variant="projects">
      ...
    </DesignSection>

  </div>
</section>
```

`DesignSection` must never receive `px-*` via its `className` prop — horizontal padding belongs on Layer 2. `--ds-max-w-content` controls the column width for all homepage sections.

---

## 6. File & Component Naming

| Thing | Convention |
|---|---|
| DS component files | `kebab-case.tsx` (e.g. `iphone-mockup.tsx`) |
| Page component files | `PascalCase.tsx` (e.g. `CaseStudyInvest.tsx`) |
| DS component exports | `PascalCase` (e.g. `IPhoneMockup`) |
| Type exports | `PascalCase` suffixed with context (e.g. `ProjectCardImageVariant`) |
| CSS variable names | `--ds-[category]-[name]` (e.g. `--ds-text-primary`) |
| Tailwind utilities | mirror CSS var: `text-ds-text-primary`, `p-ds-24`, `rounded-ds-md` |

---

## 7. How to Communicate Requests Effectively

### Provide architectural context, not just the change

Bad: "Change the image in that section."
Good: "In `CaseStudyInvest.tsx`, in the La Solución section, swap the editorial image in Solution Block 2 for an iPhone mockup using `imageVariant='mockup'`."

### State whether you want analysis or implementation

- "Analyze this and tell me the right approach" → I will explain options, ask clarifying questions, and wait for your decision before writing code.
- "Implement X" → I will read affected files, then implement.

### Reference components by their actual name

Use the component names from the catalog above. "The solution block in the case study" is less precise than "the `ProjectCard` with `imageVariant='editorial'` in `CaseStudyInvest.tsx`."

### For multi-file changes, confirm scope first

If a change will touch more than 3 files, say "list the affected files before starting." This prevents surprises.

### Use the selection context

If you have a component selected in the editor, the selected code will be passed as context. You can say "the selected component" and I will use that snippet as the target.

---

## 8. What NOT to Do

| Don't | Do instead |
|---|---|
| Hardcode `#141411` or any hex color | Use `var(--ds-text-primary)` |
| Hardcode `24px` spacing | Use `var(--ds-space-24)` or `p-ds-24` |
| Add styles to `TechnicalSheet` internals | Pass props at the call site |
| Create a new layout component for image+text | Use `ProjectCard` with appropriate `imageVariant` and `layout` |
| Add `@font-face` outside `fonts.css` | Only fonts.css |
| Edit protected files | `/src/app/components/figma/ImageWithFallback.tsx`, `/pnpm-lock.yaml` |
| Create `SolutionBlock` again | It was consolidated into `ProjectCard` — use `imageVariant="editorial"` |
| Use `react-router-dom` | Use `react-router` (the `react-router-dom` package does not work in this environment) |
| Use `framer-motion` imports | Use `motion/react` from the `motion` package |
| Skip reading files before editing | Always read first |
| Put `activeStep` state inside `StepList` | State lives in the parent page; pass `activeStep` + `onStepChange` down |
| Use `StepList` without matching `mockupFrames` length | `steps.length` must equal `mockupFrames.length` — one step per frame |
| Use raw Tailwind spatial utilities like `bottom-12` | Use the DS token equivalent: `bottom-ds-48`. Every spacing value has a `--ds-space-*` token — if the value matches, use it |
| Wrap a grid of individually-revealed cards in an outer `MotionReveal` | Remove the outer wrapper. Each card's own `MotionReveal` is sufficient; a parent reveal creates a double-flash animation |
| Put `px-*` on `DesignSection` via its `className` prop | Horizontal padding belongs on the Layer 2 content-wrapper `<div>`, not on `DesignSection` — see Section 5 "Section Layout Pattern" |
| Use hardcoded `max-w-7xl` or `max-w-[1386px]` for homepage content columns | Use `max-w-(--ds-max-w-content)` — references the `--ds-max-w-content` token so all sections resize from one place |
| Set `alt` to `project.title` as a fallback | Give every project a dedicated `alt` string in the data object — heading text and accessible image descriptions serve different purposes |
| Compute `zoom` or other per-project values inline in JSX render | Move all per-project values (`zoom`, `alt`, `showCta`) into the `ProjectData` array — keep render logic data-agnostic |
| Don't set `line-height: normal` on `SectionHeader`'s subtitle or title expecting the `gap` to match glyph spacing | Both elements use `leading-none` — `line-height: normal` on a 56px font adds ~5–6px of invisible half-leading above the glyphs, making the gap appear larger than `gap-ds-4`. Keep `leading-none` on both `<p>` elements. |
| Remove `leading-none` from `TechnicalSheet`'s subtitle or title `<p>` elements | Both elements have `leading-none` baked in — it is what makes `gap-ds-4` visually accurate. Do not remove it. If a specific usage needs a different line-height, pass `className` at the call site to override only the outer wrapper, not the internals. |
| Write raw `<p>` tags in a flex column to replicate subtitle + heading + body | Use `TechnicalSheet` — it handles the correct `gap-ds-4` / `gap-ds-8` / `gap-ds-24` hierarchy and `leading-none` on subtitle and title automatically. |
| Wrap `CaseStudyFooter` in a dark `<div>` and expect child text/button colors to change | Use `variant="inverse"` on `CaseStudyFooter` — it scope-overrides `--ds-text-primary`, `--btn-secondary-text`, etc. via inline CSS variables so all composed children inherit the inverse palette |
| Use `interactiveHint` on `IPhoneMockup` without marking any elements with `data-hotspot` in the screen component | Every interactive element inside the prototype screen must have `data-hotspot` as an HTML attribute — without it, the hint system has nothing to highlight and the click-outside handler will flash on every click |
| Mark non-interactive or decorative elements with `data-hotspot` | Only genuinely clickable elements (buttons, accordions, links) should have `data-hotspot` — marking static content creates false expectations |
| Hardcode a project accent color (e.g. `#F0C70E`) directly in exhibit components or spread across multiple files | Set `--cs-accent` on the case study page root via inline style. All children (exhibits, cards, hero) reference `var(--cs-accent)`. One place to change the project color. |
| Use `${hexColor}0D` to create a subtle accent tint from a CSS variable | Use `color-mix(in srgb, var(--cs-accent) 5%, transparent)` — works with CSS custom properties, no hex string manipulation needed |
| Hardcode a numbered pill card inline in a page file | Use `<DesignCard variant="numbered">` — it handles the accent pill, title, description, and all DS tokens automatically |
| Use per-size border-radius on `DesignButton` (e.g. `rounded-ds-pill` for large, `rounded-ds-lg` for default) | All button sizes use uniform `rounded-ds-md` (`--ds-radius-md`, 16px). The radius no longer varies by size. |

---

## 9. Adding New DS Components — Checklist

**Code**
1. Create `src/app/components/ds/your-component.tsx`
2. Export all necessary types from the component file
3. Add export to `src/app/components/ds/index.ts`
4. Use only CSS tokens — no hardcoded values
5. Follow controlled/uncontrolled pattern if the component has interactive state
6. Add JSDoc comments to every prop

**Documentation — required in the same session, no exceptions**
7. Add the component entry to Section 4 of this file (purpose, all props, usage patterns)
8. If the component deprecates an old pattern, add a row to the Section 8 "What NOT to Do" table
9. Update the Section 10 Case Study Structure Reference if the component is used in case study pages
10. Verify that every existing call site compiles cleanly against the new prop signatures

**Modifying an existing DS component — same checklist applies**
- Update the Section 4 catalog entry to reflect changed / added / removed props
- Update every usage pattern example in Section 4 that references the modified props
- Add a "Don't / Do instead" row to Section 8 if the change introduces a new misuse risk
- Update all call sites in page files to match the new API

---

## 10. Case Study Structure Reference

### Per-Project Accent Token

Every case study page sets `--cs-accent` and `--cs-accent-text` on its root `<div>` via inline style. This brands the page with the project's color while keeping portfolio-level chrome (nav, buttons, footer) green. Child components (exhibits, cards) reference `var(--cs-accent)` — never hardcode the hex.

```tsx
// At the top of the page component:
const CS_ACCENT = '#F0C70E';      // Project's brand color
const CS_ACCENT_TEXT = '#212226';  // Legible text on that background

// On the root div:
style={{ '--cs-accent': CS_ACCENT, '--cs-accent-text': CS_ACCENT_TEXT } as React.CSSProperties}
```

### Section Pattern

Each case study follows this section pattern:

```
ParallaxHero                   ← hero image + title
CaseStudySection               ← ProjectOverview (role, year, platform, challenge)
CaseStudySection accent        ← "La Solución" header + 3× ProjectCard (editorial, scrollReveal)
CaseStudySection               ← ResultGrid with mockupFrames (centred IPhoneMockup, eyebrow="Resultado", heading="Prueba el prototipo completo")
[optional] CaseStudySection    ← QuoteBlock
CaseStudyFooter                ← prev/next navigation. Supports `variant="inverse"` for dark (`--ds-surface-inverse`) background with `--ds-text-inverse` text. Uses scoped CSS variable overrides so all child components (TechnicalSheet, DesignButton) inherit the inverse palette automatically. Eyebrow/tertiary text uses `--ds-text-tertiary-inverse` (`#A89F9F`) for accessible contrast on the dark surface.
```

Solution blocks use these shared props:
- `subtitleVariant="label"`
- `sheetSize="section"`
- `scrollReveal`
- `spaced` on all except the last one

Layout varies by case study:
- **Shipping** (`imageVariant="editorial"`): alternates `layout="left"` / `"right"` / `"left"`.
- **Invest & Audio** (`imageVariant="mockup"`): all use `layout="left"` (mockup on left, text on right).

 Some of the base components you are using may have styling(eg. gap/typography) baked in as defaults.
So make sure you explicitly set any styling information from the guidelines in the generated react to override the defaults.