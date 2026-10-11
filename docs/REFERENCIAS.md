# REFERENCIAS — Portfolio v2

> Qué tomar de cada referencia, sección por sección, y qué no tomar nunca.
> Los valores medidos (tipografía, color, easing, retícula) están en [`referencias/EXTRACCIONES.md`](referencias/EXTRACCIONES.md).
> Construido mediante grill el 2026-10-10. Se valida contra [`BRIEF.md`](BRIEF.md).

---

## Principio rector

**Matthieu Givelet es la base de todo** (estructura, tipografía, ritmo, calma).
**Mijo Bello aparece en un solo momento humano** (su idea de un color propio), no como estilo global. Sin su collage: el About es solo texto ([SECCIONES](SECCIONES.md#6-about), 2026-10-11).

Esto traduce el brief: *un paso por delante* (Givelet) + *cercano y humano* (Bello), sin que la web parezca dos webs.

---

## Por sección

### Global — sensación, tipografía, color
| Tomar | De |
|---|---|
| Calma tipográfica, mucho espacio en blanco y negativo | Givelet |
| **Una sola familia grotesca neutra**; jerarquía por tamaño, no por peso | Givelet (1 peso), Araújo (1 peso) |
| Escala corta: 4–5 tamaños como máximo | Givelet (51.8 / 22.3 / 18 / 11.5 px) |
| Monocromo casi puro como base | Givelet, Atmar, Araújo |
| Tracking negativo en tamaños display | Atmar, Pamidor |

**No tomar:** el tiempo de carga de Givelet; el lila de Hayler y State of AI.
**Pendiente para `DESIGN.md`:** fuente exacta y par de colores.

### Navegación
| Tomar | De |
|---|---|
| Nav mínima, texto plano | Givelet, Araújo |
| Contadores entre paréntesis si aportan — "Work (4)" | Givelet, Araújo |
| **Índice de secciones fijo** en los case studies largos | State of AI Design |

### Hero de la home
**Modelo: una sola frase grande y tipográfica, con mucho aire y sin imágenes.** El primer case study asoma justo debajo.

| Tomar | De |
|---|---|
| Un único texto de hero, editorial y directo | Araújo ("Building websites and products worth using") |
| Composición y espacio | Givelet |

**No tomar:** imágenes que rotan (demasiado rápido en Araújo, demasiado lento en Givelet).
**La frase la define Pablo** (storytelling abierto, ver `BRIEF.md` §7).

### Lista de trabajo en la home
**Se prueban dos variantes durante la construcción:**

| Variante | Referencia | Qué es |
|---|---|---|
| **A** | Pamidor | Card por proyecto: nombre grande (~60 px) + ficha ROLE / TIMELINE / YEAR / TEAM + disciplinas |
| **B** | Pianetti | Cuadrícula de vídeos 4:5, cada uno propio del proyecto; título y disciplina debajo |

- **Variante B en móvil:** sin hover, el vídeo se reproduce al entrar en pantalla.
- **Coste de B:** producir un vídeo corto por case study.
- **No tomar:** previews pequeñas que se desplazan (Atmar); thumbnail pequeño en la esquina (Pianetti); títulos de proyecto pequeños (Pianetti).

### Case study
**Esqueleto:**

1. **Hero** — imagen a sangre + titular abajo a la izquierda, en blanco. *(Araújo)*
2. **Ficha** — rol, timeline, año, equipo. *(Pamidor, Araújo)*
3. **Overview** — una pregunta-titular + respuesta corta y directa. Sin eyebrows. *(Hayler)*
4. **Cuerpo con titulares-tesis** — cada sección afirma algo ("Sellers kept stock 10 days longer"), nunca "Process" o "Results". *(State of AI Design)*
5. **Columnas de texto estrechas** — 340–430 px, cuerpo de 16–18 px. *(Araújo, State of AI, Hayler)*
6. **Siguiente proyecto** — grande, al cierre. *(Atmar)*

**Case study de Agentes — narrativa adicional** *(Pixel Agent)*:
frustración en primera persona → las fricciones concretas → una cita que lo condensa → la decisión de diseño clave (por qué X y no Y) → qué hace el agente por dentro → cierre con una idea.
Con **una simulación guionizada e interactiva** (ver Movimiento).

**Métricas:**
- La métrica vive **dentro del titular-tesis**, como frase.
- **Máximo una cifra grande** por case study, y solo si es real y significativa. *(State of AI)*
- Sin métrica, el resultado se cuenta como **cambio cualitativo**: qué pueden hacer ahora las personas que antes no podían. *(Araújo)*
- **Nunca** tarjetas de KPI tipo "+40% ↑". *(anti: Product.inc)*

**Case study de Design System** — presentación inspirada en Material 3, Apple HIG, Polaris, Carbon y Atlassian: principios antes que componentes; tokens explicados visualmente; ejemplos de uso correcto e incorrecto.

**No tomar:** overview recargado (Atmar); poco contexto por proyecto (Givelet).

### About — el momento humano
**Par de colores propio + voz.** *(Mijo Bello, Pamidor)*

- Voz en primera persona con humor, al estilo de la bio de Pamidor.
- **Sin collage ni foto (Pablo, 2026-10-11):** solo texto. El recorrido no lineal se ordena con una trayectoria en texto ([SECCIONES](SECCIONES.md#6-about)).

**No tomar de Mijo Bello:** sus etiquetas pequeñas en mayúsculas con tracking (son eyebrows).

### CTA final
**Composición:** fondo con el mismo par de colores que About *(Buck)* + una frase enorme y tipográfica que es el propio link al email, de unos 140 px *(Atmar, "Reach me out")*.

- LinkedIn y CV, discretos debajo.
- Sin formulario y sin botones.
- **Sin hora local.**

---

## Movimiento

**Referencia: State of AI Design. Regla única: solo se mueve lo que cuenta algo.**

| Qué | Cómo |
|---|---|
| Revelar información (cifras, pasos de la simulación del agente, diagramas del DS) | Un solo easing: `cubic-bezier(0.22, 1, 0.36, 1)` a 0.9 s, con stagger de unos 60 ms |
| Links | Subrayado animado a 0.2 s |
| Orientación en textos largos | Índice de secciones fijo |
| Scroll | Nativo. **Sin Lenis** |
| Accesibilidad | `prefers-reduced-motion` respetado |

**No:** animaciones de entrada decorativas en títulos o imágenes; la paleta multicolor de sus gráficos (los datos usan tu par de colores).

---

## Arquitectura

| Fase | Páginas |
|---|---|
| **v2.0** | Home (hero → trabajo → About → CTA) + una página por case study |
| **Después** | Archive: campañas de agencia, Binalogue y los prototipos conceptuales de la v1 |

About vive dentro de la home, no como página aparte.

---

## Nunca

Sale de las anti-referencias (detalle en `EXTRACCIONES.md`):

- **Eyebrows** — etiquetas pequeñas en mayúsculas encima de los títulos. *(Sibal, GMX, Mijo Bello)*
- **Notas o etiquetas en all caps con tracking.** *(Sibal)*
- **Microinteracciones en todo.** Pocas y con intención. *(Sibal, Jlern)*
- **Interacciones hipercomplejas** que exigen aprender a usar la web. *(Crystallize, Esther Wong)*
- **Texturas animadas** (niebla, grano en movimiento). *(GMX)*
- **Música.** *(Esther Wong)*
- **Métricas en tarjetas genéricas.** *(Product.inc)*
- **Layout sin punto de entrada claro.** *(Jlern)*
- **Lila o violeta** como acento.
- **Slop visual:** web que no es responsive, que se ve "hecha con IA". *(Pixel Agent)*

---

## Índice de referencias

| # | Web | Rol |
|---|---|---|
| 1 | [Matthieu Givelet](https://matthieugivelet.com/) | ⭐ Base global |
| 2 | [Arian Atmar](https://www.arianatmar.com/) | List View, CTA, siguiente proyecto |
| 3 | [Cristiana Araújo](https://www.cristianaaraujo.com/) | Hero de una frase, hero de case study, resultados sin métricas |
| 4 | [Julien Pianetti](https://www.julienpianetti.com/) | Variante B de la lista de trabajo |
| 5 | [Pamidor](https://pamidordesign.co/) | Variante A de la lista de trabajo, ficha, voz de la bio |
| 6 | [Hayler](https://demo.clapat-templates.com/hayler/project02.html) | Overview con pregunta-titular |
| 7 | [Buck](https://buck.co/) | CTA con fondo de color |
| 8 | [Mijo Bello](https://mijobello.com/) | ⭐ Momento humano: collage y color |
| 9 | [State of AI Design](https://stateofaidesign.com/chapters/tools) | ⭐ Movimiento, titulares-tesis, cifras |
| 10 | [Pixel Agent](https://bryangarage.dev/pixelagent) | Narrativa del case study de Agentes (solo narrativa) |
| 11 | Material 3, Apple HIG, Polaris, Carbon, Atlassian | Presentación del Design System |
