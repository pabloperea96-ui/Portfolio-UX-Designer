# Letter-spacing (Tracking) — Design System

Este documento contiene: **(1)** lista de tokens de tracking y **(2)** texto listo para pegar en el documento principal del design system.

---

## 1. Lista de tokens

### Tokens existentes (theme.css)

| Token | Valor (desktop) | Valor (viewport &lt; 768px) | Uso |
|-------|-----------------|-----------------------------|-----|
| `--ds-tracking-label-eyebrow` | 0.2px | — | Labels tipo eyebrow, uppercase |
| `--ds-tracking-label-sm` | -0.15px | — | Labels pequeños |
| `--ds-tracking-label-eyebrow-hero` | 0.12em | — | Eyebrow del hero (ej. UX DESIGN / PRODUCT DESIGN) |
| `--ds-tracking-action-inline` | -0.15px | — | Enlaces y acciones en línea |
| `--ds-tracking-action-button-df` | -0.31px | — | Botones tamaño default |
| `--ds-tracking-action-button-lg` | -0.44px | — | Botones grandes |
| `--ds-tracking-body-default` | -0.45px | — | Párrafos y cuerpo de texto |
| `--ds-tracking-body-emphasis` | -0.45px | — | Cuerpo con énfasis |
| `--ds-tracking-body-compact` | -0.15px | — | Texto compacto (listas, pasos) |
| `--ds-tracking-body-narrative` | -0.02em | — | Párrafos narrativos (story, editorial) |
| `--ds-tracking-heading-compact` | -0.31px | — | Títulos compactos |
| `--ds-tracking-heading-section` | 0.4px | — | Títulos de sección |
| `--ds-tracking-heading-overview` | -0.9px | -0.6px | Títulos overview |
| `--ds-tracking-heading-page` | -0.53px | -0.4px | Títulos de página |
| `--ds-tracking-heading-hero` | -1.68px | -0.9px | Hero (headline principal) |
| `--ds-tracking-heading-display` | -0.03em | -0.02em | Headlines editoriales / fluid (escala con tamaño) |
| `--ds-tracking-data` | 0.37px | — | Números y datos |

### Clases compuestas que usan tracking (index.css)

- **Label:** `.ds-text-label-eyebrow`, `.ds-text-label-sm`
- **Action:** `.ds-text-action-inline`, `.ds-text-action-button-df`, `.ds-text-action-button-lg`
- **Body:** `.ds-text-body-default`, `.ds-text-body-emphasis`, `.ds-text-body-compact`
- **Heading:** `.ds-text-heading-compact`, `.ds-text-heading-section`, `.ds-text-heading-overview`, `.ds-text-heading-page`, `.ds-text-heading-hero`
- **Data:** `.ds-text-data-emphasis`, `.ds-text-data-default`

Para **heading-display**, **body-narrative** y **label-eyebrow-hero** no hay clase compuesta; se usan vía `style={{ letterSpacing: 'var(--ds-tracking-...)' }}` en componentes con tipografía fluida (Hero, StorySection).

### Mapeo de uso en Home / StorySection

| Componente | Elemento | Token |
|------------|----------|--------|
| Hero | H1 principal | `--ds-tracking-heading-display` |
| Hero | Eyebrow (UX DESIGN / …) | `--ds-tracking-label-eyebrow-hero` |
| StorySection Beat1 | Párrafo narrativo | `--ds-tracking-body-narrative` |
| StorySection Beat2 | Texto destacado (2.25rem) | `--ds-tracking-heading-display` |
| StorySection Beat3 | Párrafo narrativo | `--ds-tracking-body-narrative` |

---

## 2. Texto listo para el documento del Design System

*(Copiar desde la línea siguiente hasta el final de esta sección.)*

---

### Letter-spacing (Tracking)

El tracking define el espacio entre caracteres. Todos los valores provienen de tokens en `theme.css`; no se usan valores fijos en componentes.

**Criterio:** Títulos grandes (hero, display) usan tracking más cerrado; cuerpo y datos usan valores neutros o ligeramente abiertos; labels en mayúsculas (eyebrow) pueden ser más abiertos para legibilidad.

#### Tokens disponibles

| Rol | Token | Desktop | Mobile (&lt; 768px) | Uso típico |
|-----|--------|---------|----------------------|------------|
| Label eyebrow | `--ds-tracking-label-eyebrow` | 0.2px | — | Labels uppercase estándar |
| Label eyebrow hero | `--ds-tracking-label-eyebrow-hero` | 0.12em | — | Eyebrow del hero (ej. UX DESIGN / …) |
| Label small | `--ds-tracking-label-sm` | -0.15px | — | Labels pequeños |
| Action inline | `--ds-tracking-action-inline` | -0.15px | — | Enlaces, acciones en línea |
| Action button default | `--ds-tracking-action-button-df` | -0.31px | — | Botones |
| Action button large | `--ds-tracking-action-button-lg` | -0.44px | — | Botones grandes |
| Body default | `--ds-tracking-body-default` | -0.45px | — | Párrafos, cuerpo |
| Body emphasis | `--ds-tracking-body-emphasis` | -0.45px | — | Cuerpo con énfasis |
| Body compact | `--ds-tracking-body-compact` | -0.15px | — | Listas, pasos |
| Body narrative | `--ds-tracking-body-narrative` | -0.02em | — | Párrafos narrativos / editorial |
| Heading compact | `--ds-tracking-heading-compact` | -0.31px | — | Títulos compactos |
| Heading section | `--ds-tracking-heading-section` | 0.4px | — | Títulos de sección |
| Heading overview | `--ds-tracking-heading-overview` | -0.9px | -0.6px | Títulos overview |
| Heading page | `--ds-tracking-heading-page` | -0.53px | -0.4px | Títulos de página |
| Heading hero | `--ds-tracking-heading-hero` | -1.68px | -0.9px | Hero principal (px fijo) |
| Heading display | `--ds-tracking-heading-display` | -0.03em | -0.02em | Headlines editoriales (escala con tamaño) |
| Data | `--ds-tracking-data` | 0.37px | — | Números, datos |

#### Reglas de uso

1. **Siempre usar tokens.** No definir `letterSpacing` ni `tracking-*` con valores literales (px, em) en componentes; usar `var(--ds-tracking-...)` o las clases `.ds-text-*`.
2. **Tipografía fluida (clamp).** En headlines o párrafos con `fontSize: clamp(...)` usar tokens en **em** (`heading-display`, `body-narrative`, `label-eyebrow-hero`) para que el tracking escale con el tamaño.
3. **Resto del producto.** Labels, body, headings y datos usan las clases compuestas del DS (`ds-text-label-eyebrow`, `ds-text-body-default`, etc.) que ya incluyen el tracking correcto.
4. **Responsive.** En viewports &lt; 768px se aflojan los headings (hero, page, overview, display) para mantener legibilidad; el resto de tokens no cambia.

#### Excepciones

- **Prototipos de inversión (Invest):** pantallas con fidelidad a mock pueden usar valores en px en estilos inline; se consideran un sub-sistema aparte y no reemplazan los tokens del DS en el resto del sitio.

---

*(Fin del texto para el documento del Design System.)*
