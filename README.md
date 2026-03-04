# Pablo Perea — Portfolio

Portfolio personal de UX/Product Design construido con React, Vite y Tailwind CSS v4. Presenta case studies interactivos con prototipos navegables en iPhone mockup, animaciones scroll-reveal y un design system estricto basado en tokens CSS.

## Stack

| Capa | Tecnologia |
|---|---|
| Framework | React 18 + TypeScript |
| Bundler | Vite 6 |
| Estilos | Tailwind CSS v4 (`@theme inline`) + CSS custom properties |
| Routing | React Router v7 (Data mode, `RouterProvider`) |
| Animaciones | Motion (`motion/react`) — scroll-reveal, page transitions, parallax |
| Tipografia | Inter (Google Fonts, pesos 400/500/600/700) |

## Estructura del proyecto

```
├── guidelines/
│   └── Guidelines.md        # Spec viva del design system (reglas, catalogo de componentes, patrones)
├── design-system.json       # Referencia autoritativa de tokens, componentes y templates para AI
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ds/              # Design System — primitivas reutilizables
│   │   │   │   ├── index.ts     # Barrel export (fuente de verdad de exports)
│   │   │   │   ├── project-card.tsx
│   │   │   │   ├── technical-sheet.tsx
│   │   │   │   ├── iphone-mockup.tsx
│   │   │   │   ├── motion-reveal.tsx
│   │   │   │   ├── design-button.tsx
│   │   │   │   └── ...          # ~30 componentes DS
│   │   │   ├── prototypes/      # Pantallas interactivas para mockups
│   │   │   └── ui/              # Primitivas Radix/shadcn
│   │   ├── layouts/
│   │   │   ├── RootLayout.tsx   # Shell global + AnimatePresence
│   │   │   └── Navigation.tsx   # Nav adaptativa (scroll-spy en Home, breadcrumbs en subpaginas)
│   │   ├── pages/
│   │   │   ├── home/            # Hero, ProjectsSection, About, Contact
│   │   │   ├── case-study/      # CaseStudyInvest, CaseStudyAudio, CaseStudyShipping
│   │   │   ├── projects/        # AllProjectsPage con filtros
│   │   │   └── NotFoundPage.tsx
│   │   ├── routes.tsx           # createBrowserRouter config
│   │   └── App.tsx              # Entry point (RouterProvider)
│   ├── imports/                 # Assets exportados de Figma (SVGs, imagenes)
│   └── styles/
│       ├── fonts.css            # Unico lugar para @font-face / @import de fuentes
│       ├── theme.css            # Todos los tokens CSS (colores, spacing, radius, tipografia)
│       ├── tailwind.css         # Mapeo @theme inline de tokens a utilidades Tailwind
│       └── index.css            # Entry CSS (importa fonts, tailwind, theme)
```

## Design System

El proyecto usa un sistema de tokens CSS estricto. Todos los valores visuales provienen de custom properties definidas en `theme.css`, nunca de valores hardcodeados.

### Tokens principales

**Colores:**
- `--ds-text-primary` / `--ds-text-secondary` / `--ds-text-tertiary` — jerarquia de texto
- `--ds-surface-page` / `--ds-surface-card` / `--ds-surface-inverse` — fondos
- `--ds-action-primary` (`#388259`) — CTAs y estados activos
- `--cs-accent` — color de acento por case study (scoped via inline style en la raiz de cada pagina)

**Spacing:** escala de `--ds-space-4` a `--ds-space-102`, con overrides responsivos automaticos a `max-width: 767px`.

**Tipografia:** clases compuestas en `index.css` (`ds-text-heading-hero`, `ds-text-body-default`, `ds-text-label-eyebrow`, etc.) que agrupan font-size, weight, line-height y letter-spacing.

### Componentes DS clave

| Componente | Proposito |
|---|---|
| `ProjectCard` | Layout unificado imagen+texto con variantes `thumbnail`, `editorial`, `mockup` |
| `TechnicalSheet` | Primitiva universal de texto (subtitle + title + description + CTA + children slot) |
| `IPhoneMockup` | Mockup iPhone 16 SVG con frames navegables y hints interactivos |
| `MotionReveal` | Wrapper de animacion scroll-reveal (`slide-up`, `scale`, `fade`, `slide-left`) |
| `StepList` | Stepper vertical sincronizado bidireccionalmente con `IPhoneMockup` |
| `DesignCard` | Card multi-variante (`metric`, `skill`, `social`, `numbered`) |
| `CaseStudyFooter` | Navegacion prev/next con soporte para variante `inverse` |

## Rutas

| Ruta | Pagina |
|---|---|
| `/` | Home — Hero, proyectos destacados, about, contacto |
| `/projects` | Todos los proyectos con filtros por categoria |
| `/projects/:slug` | Case study individual |

### Case studies disponibles

- `/projects/inversion-etf-apalancamiento` — Flujo de inversion apalancada
- `/projects/ajustes-audio-reproduccion` — Ajustes de Audio y Reproduccion
- `/projects/rediseno-planificacion-envios` — Rediseno de Planificacion de envios

## Desarrollo

```bash
# Instalar dependencias
pnpm install

# Build de produccion
pnpm build

# Servidor de desarrollo (via Vite directamente)
npx vite
```

## Convenciones

- **Tokens, no hardcodes:** cada color, spacing y radius usa `var(--ds-*)` o su utilidad Tailwind equivalente (`text-ds-text-primary`, `p-ds-24`, `rounded-ds-md`).
- **Inter solamente:** la unica fuente permitida, declarada en `fonts.css`.
- **Barrel export sincronizado:** todo componente DS se exporta desde `ds/index.ts`.
- **Props, no forks:** antes de crear un componente nuevo, considerar si puede ser una variante de uno existente (`ProjectCard` es el ejemplo canonico).
- **Controlled/uncontrolled:** componentes interactivos funcionan solos por defecto y aceptan `activeX` + `onXChange` para control externo.
- **Documentacion viva:** `guidelines/Guidelines.md` es la spec del design system. Cada cambio a componentes DS se refleja ahi en la misma sesion.

Para la especificacion completa de componentes, props, patrones y anti-patrones, consultar [`guidelines/Guidelines.md`](./guidelines/Guidelines.md) y [`design-system.json`](./design-system.json).