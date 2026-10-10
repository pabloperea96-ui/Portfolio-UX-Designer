# Extracciones de referencias

> Valores medidos con estilos computados en el navegador, viewport 1440×900, el 2026-10-10.
> Es la materia prima de `REFERENCIAS.md`: aquí van los datos; allí, las decisiones.
> Cada referencia incluye las notas de Pablo (qué tomar / qué evitar) y lo medido.

---

## 1. Matthieu Givelet — sensación global ⭐
**URL:** https://matthieugivelet.com/
**Pablo:** la que mejor consigue la sensación global. Tipográfica, excelente uso del espacio en blanco, interacciones pequeñas y sutiles (aunque genéricas e iguales). **Evitar:** proyectos con poco contexto; tiempo de carga exagerado.

**Medido:**
- **Tipografía:** una sola familia, *GT Standard*, **un solo peso (400)** en toda la web. La jerarquía se construye solo con tamaño.
- **Escala:** 51.8 / 22.3 / 18 / 11.5 px. Solo 4 tamaños.
- **Color:** negro puro `#000` sobre blanco `#FFF`. Bordes `rgba(0,0,0,.1)`. Un único acento: amarillo `rgb(255,251,36)`, usado una vez.
- **Tokens raíz:** tamaños en `vw` (`.8vw`, `1vw`, `1.25vw`, `1.55vw`, `2vw`): la tipografía escala con el ancho de pantalla. Radios de 3–4 px.
- **Layout:** retícula de 2 columnas iguales (684 px) con gap de 3 px entre proyectos. Padding lateral de 36 px.
- **Hero:** el nombre está hecho con letras SVG individuales (`/letters/m.svg`…) que entran con stagger de 0.05 s, y en medio hay una caja con 4 imágenes de proyectos que rotan. Subtítulo entre corchetes: `[ Queensland ]`, `[ Approach ]`.
- **Motion:** easing propio `cubic-bezier(0.18, 0.66, 0.18, 1)`, con 0.7 s para movimiento y 1.7 s para opacidad (fades muy lentos). Sin GSAP ni librerías, solo transiciones CSS.
- **Card de proyecto:** imagen + `01` + nombre + flecha. Nada más.
- **Arquitectura:** Work (8) · Archive (16) · About · Get in touch. Los contadores van entre paréntesis en la nav.

## 2. Arian Atmar — List View y CTA
**URL:** https://www.arianatmar.com/ · Case: /case/razed-mods
**Pablo:** sensación limpia y ordenada; los proyectos se destacan rápido. Le gusta el List View (sin bullets, gran tamaño y peso), la transición del proyecto al detalle y el CTA. **Evitar:** previews pequeñas que se mueven hacia abajo; overview recargado de información.

**Medido:**
- **Tipografía:** *Inter* 400/500/600 con **tracking negativo muy agresivo** en todo: −8% en display (82 px, ls −6.56 px) y −8% en cuerpo (13 px, ls −1.04 px).
- **List View:** nombres de proyecto a **73.5 px, peso 600, ls −5.88 px, line-height 1**. Hay dos capas de texto superpuestas: gris `rgb(223,223,223)` y negro `rgb(13,13,13)`. El hover revela la negra con `0.3s cubic-bezier(0, 0.64, 0.35, 1.01)`.
- **Color:** casi negro `#0D0D0D`, blanco y gris claro `#F2F2F2` para superficies.
- **Case study:** título de 90 px; metadatos (año, equipo, rol) a 16 px peso 600; párrafos de 16 px; una frase destacada a 36 px. Bloques: About project → Project task → Year/Team/Role → Concept → secciones visuales → siguiente proyecto.
- **CTA:** "Reach me out" a **142.5 px, peso 500, ls −11.4 px (−8%)**. Es el elemento más grande de la web.
- **Siguiente proyecto:** `[ CLICK ON NEXT PROJECT TO OPEN IT ]` + número + nombre a 45 px.
- **Motion:** subrayado animado con propiedades CSS registradas (`--underline-in/out`, 0.6 s); stagger de letras de 24 ms con `cubic-bezier(0.16, 0.84, 0.24, 1)`. Lenis para smooth scroll.
- **Detalle:** hora local en vivo en la cabecera (GER / 18:12 / SAT).

## 3. Cristiana Araújo — hero editorial y case study sin métricas
**URL:** https://www.cristianaaraujo.com/ · Case: /work/moneda
**Pablo:** imágenes de proyecto como hero; un único texto de hero ("Building websites and products worth using"); sensación editorial, buen balance imagen–tipografía. En los proyectos: imagen principal excelente y texto en la esquina inferior izquierda; explica lo que se hizo sin depender de métricas. **Evitar:** rotación de imágenes demasiado rápida; el recuadro de la esquina superior izquierda que cambia al hacer scroll.

**Medido:**
- **Tipografía:** *PP Neue Montreal*, **un solo peso (400)**. Escala de 64 / 44 / 18 px. Sin tracking.
- **Hero home:** imágenes a pantalla completa (1440×900) apiladas, con el titular de 64 px encima.
- **Hero case study:** imagen a pantalla completa con el titular de 64 px **en blanco, abajo a la izquierda** (x 20, y 695). Ej.: "Neo finance: / Redefining everyday money".
- **Cuerpo:** 18 px / line-height 1.5, en columnas de **427 px** de ancho (unos 50 caracteres por línea).
- **Estructura del case study:** Overview → Role → ficha (@año, Type, Deliverables, Partner, Team con nombre y rol) → frase-titular visual → Next Project.
- **Color:** negro y blanco. Gris `#F2F3F3` para superficies.
- **Motion:** transiciones cortas y funcionales (0.15–0.26 s). Lenis.
- **Arquitectura:** Work (8) · About · Archive · Wall of love · Let's talk.

## 4. Julien Pianetti — thumbnails y hover
**URL:** https://www.julienpianetti.com/
**Pablo:** landing pulcra, tipográfica y elegante. Le gustan las dimensiones de los thumbnails y que el hover muestre cosas distintas según el proyecto. **Evitar:** el thumbnail pequeño de la esquina inferior derecha; el tamaño del título y del tipo de proyecto.

**Medido:**
- **Tipografía:** *Suisse Int'l* 400/500. Escala de 54 / 45 / 32 / 16 / 13 px. Mucho texto a 13 px para metadatos.
- **Thumbnails:** **vídeos** de **464×580 (4:5)** en una retícula de 12 columnas, 3 por fila. Gap de **12 px horizontal / 64 px vertical**. Margen lateral de 12 px.
- **Hover:** cada card es un `<video muted loop>` propio, así que lo que se ve depende del proyecto. Esa es la clave de lo que te gustó: no es un efecto común, es contenido específico.
- **Card:** vídeo + título (h2) + disciplina. Sin año ni rol.
- **Color:** `#0C0C0C` sobre blanco, gris `#A6A6A6` como secundario.
- **Stack:** Webflow + GSAP + Lenis.

## 5. Pamidor (Dor Sharaby) — selected projects con ficha
**URL:** https://pamidordesign.co/
**Pablo:** cómo se muestran los selected projects y su hover; desde el preview ya cuenta rol, timeline, año y equipo. La presentación de cada proyecto es ordenada y no es estática.

**Medido:**
- **Tipografía:** *Funnel Display* (300–800) para todo y *Archivo* puntual. Escala de 104 / 100 / 60 / 40 / 18 / 16 / 12 px. Tracking negativo ligero en display (−2%).
- **Fondo cálido:** `rgb(239,238,235)` (hueso), no blanco. Texto `#0A0A0A`, gris cálido `rgb(107,104,98)` como secundario.
- **Card de proyecto:** nombre a **60 px**, disciplinas a 16 px y una **ficha de 4 campos** (ROLE / TIMELINE / YEAR / TEAM) con etiquetas a **12 px, mayúsculas, tracking +6%**, más "Jump To Project".
- **Motion:** `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quint) a 0.3–0.5 s. Lenis.
- **Bio:** primera persona, con humor ("a name that sounds like an entrance"; "I take the fun seriously").

## 6. Hayler (plantilla Clapat) — overview y arquitectura
**URL:** https://demo.clapat-templates.com/hayler/project02.html
**Pablo:** overview con copy sencillo y directo, sin eyebrows; whitespace decente pero no del todo bueno. Arquitectura: 3 proyectos más representativos + sección entera de Archive.

**Medido:**
- **Tipografía:** *Funnel Display* 600 para títulos (110 / 82 / 46 px, tracking −2%) e *Inter Tight* 500 para cuerpo (20 / 16 px).
- **Overview:** una pregunta-titular a 82 px ("What does it mean to design for tension?") y una respuesta corta. Párrafos de 16 px en columnas de unos 320 px.
- **Ficha:** Client · Sector · Industry, más "Live Website".
- **Arquitectura:** Index · Works · Case Studies · Portfolio · Studio · Archive · Contact.
- **Color:** blanco y negro, con un acento lila `rgb(184,128,255)`. ⚠️ Es justo el "lila de IA" que el vídeo dice evitar.

## 7. Buck — CTA final
**URL:** https://buck.co/
**Pablo:** CTA muy bueno, con contraste de color, elegante y solo tipográfico.

**Medido:**
- **Tipografía:** *Mabry*, con contraste de **pesos extremos**: ciudades y horas a 52 px peso 400, emails y teléfonos a 21 px **peso 100**.
- **Color:** footer en **rosa pálido `rgb(255,237,237)`** con texto negro. Es un cambio de color de fondo completo respecto al resto de la web.
- **Contenido:** cada oficina con flecha, hora local en vivo, email y teléfono. Sin botones.

## 8. Mijo Bello — collage y color ⭐
**URL:** https://mijobello.com/
**Pablo:** el collage es divertido y va más allá; el uso del color es interesante y provocador. Podría funcionar.

**Medido:**
- **Color: solo dos.** Fondo verde salvia `rgb(178,199,171)` y texto granate oscuro `rgb(106,12,6)`. Nada más en toda la web.
- **Tipografía:** *Space Grotesk*. El nombre "bello." mide **432 px, peso 700, tracking −13%**. Titulares de 96 px peso 700 a −6%.
- **Collage:** imágenes y vídeo con `position: absolute` y tamaños distintos que se solapan. No son retículas.
- **Detalle:** ticker de relojes mundiales en vivo (Brisbane, Tokyo, Berlin…).
- ⚠️ **Contradicción con tus anti-referencias:** usa muchas etiquetas a 10–11 px en **mayúsculas con tracking** ("THE", "SELECTED", "LEARN MORE"). Es justo el patrón de eyebrows y all-caps que criticas en Sibal y GMX.

## 9. State of AI Design — contar IA como artículo interactivo
**URL:** https://stateofaidesign.com/chapters/tools
**Pablo:** artículo interactivo online sobre IA. Ir más allá de la tinta: cada sección es clave para entender qué pasa, qué se usa, para qué y con qué resultados.

**Medido:**
- **Estructura:** cada hallazgo es un **H1 que afirma algo**, numerado ("1. Frequent AI usage jumped from 54% to 91% in one year"), seguido de un H2 que lo matiza y el dato que lo prueba. La tesis va en el titular, no en el párrafo.
- **Tipografía:** *Beausite Classic* (titulares 120 / 80 / 64 px, tracking −4% a −6%) + *Geist Mono* para datos + Inter.
- **Datos:** cifras grandes a 64 px ("91%", "74%") como protagonistas visuales.
- **Cuerpo:** 16 px en columnas de **340 px**.
- **Color:** negro y blanco, links en el azul clásico `#0000EE` y un lila `rgb(205,171,254)` como acento. ⚠️ Otra vez el lila.
- **Cierre:** Key takeaways → recursos → descarga del informe en markdown.

**Movimiento (la referencia de motion elegida por Pablo):**
- **Principio: el movimiento sirve a los datos, no a la decoración.** Casi nada se mueve salvo lo que cuenta algo.
- **Barras de datos:** al entrar en pantalla crecen en ancho, `width 0.9s cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quint), con un **stagger de 60 ms** entre segmentos (0 / .06 / .12 / .18 / .24 s).
- **Cifras:** suben desde abajo (`bottom 0.9s`, mismo easing) mientras aparecen (`opacity 0.4s`).
- **Links:** color y subrayado (`text-decoration-color`, `thickness`, `underline-offset`) a 0.2 s con `cubic-bezier(0.44, 0, 0.56, 1)`.
- **Navegación:** barra superior fija de 56 px + **índice de capítulos fijo** (Tool usage / The 2026 stack / What makes tools stick…) para orientarse en un texto largo.
- **Scroll nativo.** Sin Lenis ni `scroll-behavior: smooth`.
- **Plataforma:** Framer.
- Las barras usan una paleta de datos multicolor (lila, naranja `rgb(254,116,69)`, azul petróleo `rgb(123,162,173)`).

## 10. Pixel Agent (Bryan Garage) — narrativa de agente ✅ / ejecución ❌
**URL:** https://bryangarage.dev/pixelagent
**Pablo:** forma sencilla de contar qué hace un agente. Pero es un claro ejemplo de web hecha con IA: se ve mal, no es responsive y el slop es clarísimo.

**Estructura narrativa (lo que sí sirve):**
1. **H1 desde la frustración, en primera persona:** "I got tired of describing pixels to my AI agent."
2. **The friction:** tres problemas concretos que lo frenaban.
3. **Una cita que condensa el problema:** "I know what's wrong. I can see it. I just can't point at it."
4. **Demo en vivo dentro de la página** ("Play with it").
5. **Why X, not Y:** la decisión de diseño clave, justificada.
6. **What it actually sends:** qué hace el agente por dentro.
7. **Cierre con una idea:** "With an agent, pointing says more than words."

**Lo que no:** toda la ejecución visual.

## 11. Design systems — referencia para presentar el DS
**Pablo:** usar lo que existe en Material, Apple HIG y los más conocidos para presentar el design system.

| Sistema | URL | Qué mirar |
|---|---|---|
| Material Design 3 | https://m3.material.io | Foundations → Styles → Components; tokens explicados visualmente |
| Apple HIG | https://developer.apple.com/design/human-interface-guidelines | Principios antes que componentes; tono editorial |
| Shopify Polaris | https://polaris-react.shopify.com | Content guidelines junto a los componentes |
| IBM Carbon | https://carbondesignsystem.com | Documentación de tokens y temas |
| Atlassian | https://atlassian.design | Foundations claros, ejemplos de uso y de mal uso |

*Pendiente de extracción si el case study del DS lo necesita.*

---

## Anti-referencias

| Web | Qué evitar |
|---|---|
| [Pixel Agent](https://bryangarage.dev/pixelagent) | Slop visual evidente, no responsive (la narrativa sí sirve, ver §10) |
| [Sibal Design](https://sibaldesign.com/) | Microinteracciones excesivas que distraen; **eyebrows**; notas al pie en mayúsculas |
| [GMX Digital](https://gmxdigital.com/en/) | Eyebrows; textura de niebla en movimiento (aunque la tipografía principal es buena) |
| [Product.inc](https://www.product.inc/) | Slop; **métricas presentadas de forma genérica y aburrida** |
| [Crystallize](https://crystallize.prism-on.tokyo/) | Interacciones hipercomplejas que no valen las horas; preferir un flujo limpio |
| [Jlern](https://jlern.com/) | Microinteracciones excesivas; layout confuso, no se sabe por dónde empezar |
| [Esther Wong](https://estherwong.fun/) | **El mejor ejemplo de lo que no hay que hacer:** sin música, sin interacciones hipercomplejas |

### Reglas "Nunca" que salen de aquí
- Eyebrows: etiquetas pequeñas en mayúsculas encima de los títulos.
- Notas al pie o etiquetas en all caps con tracking.
- Texturas animadas (niebla, grano en movimiento) y música.
- Microinteracciones en todo; deben ser pocas y con intención.
- Métricas en tarjetas genéricas tipo "+40% ↑".
- Interacciones que exigen aprender a usar la web.
- Lila / violeta como acento.

---

## Patrones que se repiten

| Patrón | Dónde aparece |
|---|---|
| **Una sola familia tipográfica**, jerarquía por tamaño | Givelet (1 peso), Araújo (1 peso), Pianetti, Atmar |
| **Grotesca neutra** (GT Standard, Neue Montreal, Suisse, Inter) | 5 de 7 |
| **Monocromo casi puro**, con un acento o ninguno | Todas |
| **Tracking negativo en display** (−2% a −8%) | Atmar, Pamidor, Hayler |
| **Cuerpo de 16–18 px en columnas estrechas** (320–430 px) | Araújo, Hayler, Atmar |
| **Ficha de metadatos en el case study** (rol, año, equipo) | Atmar, Araújo, Pamidor, Hayler |
| **CTA final tipográfico y enorme** | Atmar (142 px), Buck (52 px + fondo de color), Pianetti |
| **Lenis (smooth scroll)** | 5 de 7 |
| **Contadores en la nav** — Work (8) | Givelet, Araújo |
| **Sección Archive** separada de los case studies | Givelet, Araújo, Hayler |
| **Hora local en vivo** | Atmar, Buck |

## Huecos

| Hueco | Estado |
|---|---|
| Cómo contar trabajo con agentes de IA | ✅ Narrativa: Pixel Agent (§10). Formato: State of AI Design (§9) |
| Case study largo de producto senior | ⚠️ Parcial: State of AI Design aporta la estructura "tesis en el titular" |
| Design system como case study | ✅ Material, HIG y compañía (§11) |
| Lo "humano" del brief | ✅ Mijo Bello (color, collage) + la voz de Pamidor |
| Anti-referencias | ✅ 7 webs |
