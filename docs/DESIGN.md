# DESIGN — Portfolio v2

> Sistema visual de la web. Se valida contra [`BRIEF.md`](BRIEF.md) y parte de [`REFERENCIAS.md`](REFERENCIAS.md).
> Construido mediante grill desde el 2026-10-10. Cada sección dice qué se decidió y por qué.

---

## 1. Tipografía

**Decidido el 2026-10-11.** Fuente de las mediciones: [`referencias/specimen-tipografia-hn-inter.html`](referencias/specimen-tipografia-hn-inter.html)
(se abre con `npm run dev` en `/docs/referencias/specimen-tipografia-hn-inter.html`). En Figma: sección `2014:100` (CP-003).

### Familia

| | Fuente | Dónde se ve |
|---|---|---|
| **Principal** | Helvetica Neue | Apple (macOS, iOS), instalada en el sistema |
| **Fallback** | Inter, alojada en el sitio | Windows, Android, Linux |

**Por qué:** Helvetica Neue es la neo-grotesca que piden las referencias, y es gratis porque ya viene con el sistema operativo. Las neo-grotescas de pago se descartaron porque no hay presupuesto para licencias.
Inter es la alternativa libre más cercana. La regla para Inter es **verse como Helvetica Neue**, no lucir lo mejor posible por su cuenta: quien entra desde Windows tiene que ver los mismos cortes de línea y el mismo peso visual.

### Rampa de tamaños

**10, 12 y 14 como mínimos; desde 16, múltiplos de 8 hasta 128** (16, 24, 32 … 120, 128). Son 18 pasos. Todo tamaño de texto sale de aquí.

**Por qué:** una rampa amplia permite documentar y crecer (CTA de página, breakpoints) sin inventar tamaños sueltos. Los múltiplos de 8 encajan con la retícula; los mínimos son la excepción para la letra chica.

### Escala — Helvetica Neue (valores v2 sobre la rampa)

| Rol | Tamaño | Line-height | Tracking |
|---|---|---|---|
| Ficha | 12 px | 140% | +1.5% |
| Body | 16 px | 155% | +0.5% |
| Métrica | 24 px | 125% | 0% |
| Título de case study | 32 px | 120% | −0.5% |
| Hero | 40 px | 115% | −1% |
| CTA | 64 px | 100% | −2% |

**Por qué estos valores:** con los valores v1 Helvetica Neue se veía demasiado comprimida y poco editorial. v2 abre los tamaños chicos y cierra menos los grandes: es una escala óptica, donde el tracking baja a medida que sube el tamaño.
**Por qué estos tamaños (2026-10-11):** los anteriores (13, 17, 26, 38, 68) no estaban en la rampa. Cada rol pasó al paso más cercano. El título sube a 32 para no chocar con la métrica (24). La ficha baja a 12 para separarse del body. El CTA queda en 64 por ahora: el tamaño de página (REFERENCIAS pide ~140 px) se decide con la retícula y los breakpoints.
El body va siempre en Regular.

### Fallback — Inter

**1. Tamaño: `size-adjust: 94.7%`.** Así Inter queda con la misma altura de x que Helvetica Neue (0.517) y el mismo ancho de párrafo.
**2. Line-height: el mismo de Helvetica Neue, en px.** No se ajusta.
**3. Tracking = el de Helvetica Neue + una compensación por peso:**

| Peso | Compensación | Extra solo para el CTA |
|---|---|---|
| Regular | +0% | +0.8% |
| Medium | +1% | +1.0% |
| Bold | +1.6% | +1.4% |

Ejemplo: el hero en Medium lleva −1% en Helvetica Neue y −1% + 1% = **0%** en Inter. El CTA en Bold lleva −2% + 1.6% + 1.4% = **+1%**.

**Por qué la compensación:** a igual tracking, Inter queda más apretada que Helvetica Neue, y la diferencia crece con el peso.
**Por qué el extra del CTA:** la Inter que se aloja no tiene eje óptico, así que a 64 px usa el diseño pensado para texto chico. Sin el extra, el CTA queda entre 1.5 y 2.3% más angosto.
**Por qué no se usa el tracking que recomienda Inter** (su fórmula Dynamic Metrics): da entre 1.5 y 3 puntos menos que Helvetica Neue, por ejemplo −1.1% en el body contra +0.5%. Con eso cambiarían los cortes de línea.

**Verificado en el specimen** (de nuevo con los tamaños de la rampa, 2026-10-11): Helvetica Neue e Inter cortan en las mismas palabras en hero, título, body y métrica, en los tres pesos. La ficha queda entre +0.4 y +0.8% más ancha en Inter y el CTA queda igual (0.0%).

### Cómo se implementa

- **Los % de tracking de Inter son relativos a su tamaño real** (el declarado × 0.947). En CSS, `letter-spacing` en `em` se calcula sobre el tamaño declarado, así que hay que multiplicar el valor de Inter por 0.947. Ejemplo: +1% pasa a `0.0095em`.
- **Una sola lista de fuentes (`"Helvetica Neue", Inter`) no permite un tracking distinto para cada fuente**, porque `letter-spacing` se aplica al elemento sea cual sea la fuente que se dibuje. Para usar los valores de Inter hace falta detectar si Helvetica Neue está instalada (el specimen lo hace midiendo un texto en canvas) y marcar `<html>` con una clase, por ejemplo `no-hn`. Esa clase cambia las variables de tracking.
- **El `size-adjust` va en el `@font-face` de Inter**, así que solo afecta a Inter.
- **En Figma** (librería «Portfolio Design System», colección `Typography`), los roles no tienen valores sueltos de tamaño, familia ni peso: el tamaño es un alias de la rampa (colección `Primitives`, `font-size/<n>`), la familia de `font-family/helvetica-neue` y el peso de `font-weight/regular`, `/medium` o `/bold` (solo esos tres existen, así que la regla de pesos queda en la librería). Line-height y tracking no tienen primitivos en Figma: su escala en % vive aquí y en el CSS, porque Figma no puede calcular un % de un tamaño. Line-height y letter-spacing van en **px**, no en %: Figma lee esas variables en px (se midió el 2026-10-11). Los valores en px salen de esta tabla; si cambia un tamaño, hay que recalcularlos. Los roles se llaman en inglés, como en el código: `meta` (ficha), `body`, `metric`, `title`, `hero` y `cta`.

### Pesos

Se trabaja con **Regular, Medium y Bold**, y solo con esos tres. El tamaño marca la jerarquía y el peso la refuerza, siempre con el mismo significado:

| Nivel | Peso | Roles |
|---|---|---|
| Acción | Bold | CTA |
| Afirmación | Medium | Hero, título de case study, métrica |
| Lectura | Regular | Body (siempre), ficha |

**Por qué tres niveles fijos (2026-10-11):** con todos los pesos iguales no había dónde destacar. Si cada peso significa una sola cosa, el peso nunca se usa como decoración. Esto ajusta la regla de `REFERENCIAS.md` («jerarquía por tamaño, no por peso»): el tamaño sigue mandando y el peso solo refuerza. Se valida en pruebas en contexto.

**Por qué tres y no más:** son los pesos que tienen medida la compensación de Inter. Un peso nuevo obliga a medirlo de nuevo en el specimen.
**Bold, en observación:** Pablo duda de él. Sigue disponible hasta verlo en contexto; si no se gana su lugar, sale, y con él su compensación.

### Pendiente

- **Pesos por rol:** se definen en las pruebas en contexto.
- **Figma (CP-003):** la columna de Helvetica Neue todavía tiene v1 y los tamaños anteriores a la rampa. Es una exploración archivable: la referencia ahora es la librería.
- **Librería:** los 6 estilos de texto están en Inter provisional; falta conectar su familia a `typography/family/base` (Helvetica Neue) a mano.

---

## 2. Color

**Cerrado el 2026-10-11.** Pruebas: archivo Portfolio-V2, sección CP-004 (`2020:300`). En la librería: colecciones `Primitives` (rampa) y `Color` (semánticos, modos Light y Dark), documentadas en la página 🎨 Color.

### Base

Fondo `#FAFAFA` y texto `#121212` en modo claro, y al revés en oscuro (par C6 de las pruebas).

**Por qué:** el blanco y el negro puros cansan la vista; C6 suaviza los dos extremos y mantiene 17.95:1. Frente a `#141414` (C2), el texto queda un poco más lejos del gris secundario, así que la jerarquía se conserva mejor.

### Rampa de neutros (primitivos)

| Paso | 0 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 850 | 900 | 950 | 1000 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hex | FFFFFF | FAFAFA | F2F2F2 | DEDEDE | C4C4C4 | A3A3A3 | 8A8A8A | 6B6B6B | 4D4D4D | 2E2E2E | 1E1E1E | 121212 | 0A0A0A | 000000 |

### Rampas del acento (primitivos)

Tinta y hueso tienen rampa completa para que se vea todo lo que existe y para crecer sin inventar tonos (por ejemplo, un gráfico con varias series). Se generaron en OKLCH con **la misma luminosidad por paso que los neutros**: el mismo paso da casi el mismo contraste en las tres familias (el 600 da ~5.1:1 sobre el fondo claro en todas).

| Paso | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `color/ink` (tinta) | F9FAFC | F0F2F8 | D8DEEC | BAC4DB | 95A3C3 | 798AAE | 5A6B91 | 3D4C6F | **1F2A44** | 0B1121 | 050A16 |
| `color/bone` (hueso) | FAFAF9 | **EFEEEB** | E0DED8 | C7C4BA | A8A395 | 8F8A7A | 716B5A | 524D3E | 322E22 | 14120B | 0C0A05 |

En negrita, los tonos del par A6. Transparencias: `color/neutral/1000-a70` (negro al 70%), para el velo.

### Semánticos

| Token | Light | Dark | Para qué |
|---|---|---|---|
| `color/bg/default` | 50 | 900 | Fondo de página |
| `color/bg/surface` | 100 | 850 | Bloques y tarjetas sobre el fondo |
| `color/text/primary` | 900 | 50 | Texto principal |
| `color/text/secondary` | 600 | 500 | Texto secundario |
| `color/border/subtle` | 200 | 800 | Divisores decorativos |
| `color/border/strong` | 500 | 600 | Bordes de controles |
| `color/focus` | 900 | 50 | Anillo de foco |

**Contraste verificado en los dos modos:** texto principal entre 15.97 y 17.95:1; texto secundario entre 4.76 y 5.43:1 (AA); borde fuerte entre 3.08 y 3.52:1 (3:1 para interfaz). El borde sutil no llega a 3:1 y por eso solo es decorativo.

**Por qué el 600 es `#6B6B6B` y no `#717171`** (el gris de las pruebas): con `#717171`, el texto secundario sobre superficie clara daba 4.36:1 y no pasaba AA.

### Acento, links, imagen y lista (cerrado el 2026-10-11)

Pruebas: Portfolio-V2, sección CP-005 (`2028:140`). Se eligió A6, B2, C3 y D2b con D1 en móvil.

| Token | Light | Dark | Para qué |
|---|---|---|---|
| `color/accent/bg` | ink/800 `#1F2A44` | bone/100 `#EFEEEB` | Fondo del momento propio: About y CTA final |
| `color/accent/text` | bone/100 | ink/800 | Texto y datos sobre el acento; selección de texto y gráficos |
| `color/link/text` | 900 | 50 | Texto del link (igual al texto principal) |
| `color/link/underline` | 600 | 500 | Subrayado en reposo |
| `color/link/underline-hover` | 900 | 50 | Subrayado en hover (transición de 0.2 s) |
| `color/text/on-image` | 0 | 0 | Titular sobre imagen |
| `color/overlay/scrim` | negro 70% | negro 70% | Extremo del velo degradado |

**Por qué A6 (tinta y hueso), invertido en oscuro:** 12.29:1 de texto y un momento claro en los dos modos: 13.66:1 contra el fondo claro y, al invertirse, 16.15:1 contra el oscuro. Sin invertir, la tinta se fundía con el fondo oscuro (1.31:1). El acento se reserva para su momento: no se usa en links ni en botones.
**Por qué B2:** el link se distingue por el subrayado y no por el color (WCAG 1.4.1). En reposo el subrayado es gris y discreto; en hover sube al color del texto.
**Por qué C3:** con fotos claras, un titular blanco necesita al menos 60% de negro debajo. El degradado (transparente desde el 35% de la altura hasta 70% abajo) oscurece solo donde va el texto y deja la imagen limpia arriba. Con un velo plano de 40% daba 2.85:1.
**Por qué D2b, y D1 en móvil:** el gris de Atmar en reposo daba 1.67:1 y la lista es la navegación principal. Con `color/text/secondary` (5.11 / 5.43:1) mantiene la idea —apagado en reposo, encendido en hover— y pasa AA en cualquier tamaño. En pantallas táctiles no hay hover (`@media (hover: hover)`), así que ahí la lista va toda en texto principal.

### Fuera por ahora

- **Feedback** (éxito, error, aviso): no hay formularios. Si un componente lo pide, por ejemplo «email copiado», se agrega con él.
- **Superficies por nivel:** con fondo y superficie alcanza; la web es casi plana.

---

_Las siguientes secciones se agregan a medida que avanza el grill._
