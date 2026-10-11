# SECCIONES — Portfolio v2

> Qué secciones tiene cada página, qué slots lleva cada una, cómo se comporta y qué tokens consume.
> No escribe copy (eso es `CONTENIDO.md`) ni crea tokens sin un elemento que los use.
> Construido mediante grill desde el 2026-10-11. Se valida contra [`BRIEF.md`](BRIEF.md), [`REFERENCIAS.md`](REFERENCIAS.md) y [`DESIGN.md`](DESIGN.md).

**Regla: integrar, no copiar.** Ninguna sección es la copia de un solo referente; cada una toma lo mejor de varios y lo cruza con lo propio (tokens, ritmo, contenido AI-native).
**Por qué (Pablo, 2026-10-11):** la web tiene que leerse como suya, no como «la de Araújo con otro texto».

---

## 1. Inventario de v2.0

| Página | Secciones, en orden |
|---|---|
| **Home** | Entrada (saludo) → Nav → Hero → Lista de trabajo → About → CTA |
| **Case study** (Agentes, Design System, MeLi benefits-engine, RappiCard) | Nav → Hero → Ficha → Overview → Cuerpo → Siguiente proyecto → CTA |
| **404** | Nav → Frase + link a la lista de trabajo → CTA |

Fuera de v2.0: Archive ([REFERENCIAS](REFERENCIAS.md#arquitectura)). El CV es un PDF enlazado desde el CTA, no una página.

### Modo claro y oscuro

**Sigue al sistema (`prefers-color-scheme`), sin toggle.**
**Por qué (Pablo, 2026-10-11):** un toggle sería el primer control de la web y la nav es texto plano (Givelet, Araújo). Quien visita no viene a elegir tema; respetar su sistema acierta sin pedirle nada. Costo aceptado: quien tiene el sistema en oscuro no puede ver la web en claro.

### El CTA es el footer global

Cierra todas las páginas, igual en todas. En el case study va **después** de «siguiente proyecto». No hay otro footer: el CTA ya lleva LinkedIn y CV.
**Por qué (Pablo, 2026-10-11):** quien termina un case study es el lector más interesado; cerrar solo con otro proyecto desaprovecha la conversión principal del [BRIEF](BRIEF.md#8-conversión) (email). Un solo componente en todas las páginas, y el fondo de acento marca «aquí termina». Costo aceptado: dos piezas grandes seguidas al final del case study; las separa el cambio a fondo de acento.

### 404

Mínima y hecha de piezas existentes: nav, una frase con el token del hero y un link a la lista de trabajo, y el CTA. No crea componentes ni tokens; la frase va en `CONTENIDO.md`.
**Por qué (Pablo, 2026-10-11):** en v2.0 habrá links rotos (v1, URLs mal escritas). La 404 del hosting es el «slop visual» de la lista [Nunca](REFERENCIAS.md#nunca), y quien llega por un link viejo tiene que aterrizar en la web.

---

## 2. Nav

| | |
|---|---|
| **Propósito** | Identidad y saltos de sección. Mínima, texto plano ([REFERENCIAS](REFERENCIAS.md#navegación)). |
| **Slots** | Nombre (izquierda, link a la home) · Work (4) · About · Contact (derecha) |
| **Destinos** | Work → lista de trabajo de la home · About → `/#about` · Contact → el CTA de la página actual |
| **Texto** | Rol Body (16 px, Regular) en todos los breakpoints |
| **Color** | `color/text/primary`; sobre el hero del case study, `color/text/on-image` |
| **Links** | Patrón `color/link/*`: subrayado gris en reposo, sube al color del texto en hover (`motion/hover`, 0.2 s). Sin hover en táctil |
| **Espacio entre items** | 24 en desktop y tablet · 16 en móvil |
| **Posición** | Arriba, dentro del margen de la retícula. **No es fija**: se va con el scroll |
| **Móvil** | La misma nav, en una línea. Sin hamburguesa |

**Por qué «Work (4)»:** con 2 proyectos, «Work (2)» se leía como poco y se decidió sin contador hasta tener 4. Al pasar los 4 case studies a v2.0 ([BRIEF](BRIEF.md#9-plan-de-lanzamiento)), el contador vuelve: dice cuánto trabajo hay antes de bajar (Givelet, Araújo).
**Por qué «Contact» y no el email:** el email ya es la frase del CTA, que cierra todas las páginas. Repetirlo arriba duplica.
**Por qué no es fija (Pablo, 2026-10-11):** nada flota sobre el contenido, como en Givelet. En el case study la orientación la da el índice fijo: una sola pieza fija por página. Escondida al bajar y visible al subir sería movimiento que no cuenta nada.
**Por qué sin hamburguesa y en Body (Pablo, 2026-10-11):** nombre + tres items a 16 px (con «Work (4)») ocupan unos 295 px y entran en los 327 de móvil. Un menú plegable traería estado, capa y movimiento, y el radio de «menú móvil» que DESIGN sacó por no tener elemento. La nav es lectura, así que va en Regular y no necesita token propio.

**Pendiente:**
- **Legibilidad sobre el hero del case study:** el velo actual (`color/overlay/scrim`) oscurece solo abajo. Se resuelve con el hero del case study.
- **Nombre largo en móvil:** si el nombre completo no entra en 327 px, en móvil va el nombre de pila. Se confirma con el nombre real en `CONTENIDO.md`.

---

## 3. Hero de la home

| | |
|---|---|
| **Propósito** | La primera impresión del [BRIEF](BRIEF.md#7-primera-impresión-y-tono): un paso por delante y cercano, en una frase |
| **Slots** | Una sola frase editorial. Nada más: ni imagen, ni subtítulo, ni credenciales |
| **Texto** | Rol Hero, Medium: **64** desktop · **48** tablet · **32** móvil |
| **Ancho** | 8 de 12 columnas en desktop (~780 px a 1280 · ~880 a 1440); todo el ancho en tablet y móvil. Alineada a la izquierda |
| **Alto** | Sin `100vh`: nav → 160 / 128 / 96 → frase → 160 / 128 / 96 → lista |
| **Movimiento** | Ninguno. La frase está desde el primer cuadro |
| **Copy** | Lo escribe Pablo en `CONTENIDO.md`. Límite práctico: 3–4 líneas en desktop (~12–16 palabras) |

**Regla verificable:** el primer proyecto de la lista se ve en la primera pantalla, a 1440×900 (empieza en ~690 px) y a 375×812 (~460 px). Si la frase final la empuja fuera, se acorta la frase, no el aire.

**Por qué 64 / 48 / 32 (Pablo, 2026-10-11):** el hero es lo único arriba, así que el peso lo pone la tipografía; a 40 competía con el body. Las referencias miden 52–64 para «una frase grande con mucho aire». En tablet, 48 evita que la frase se parta de más; en móvil sigue en 32 (con 40 caben ~14 letras por línea). Jerarquía: CTA 128 > hero 64 > body 16.
**Por qué 8 columnas a la izquierda:** ~24 letras por línea dan un bloque compacto de 3–4 líneas; a 12 columnas serían 2 líneas de banner. A la izquierda comparte borde con la lista y el body: una sola línea de lectura. Las 4 columnas libres son espacio negativo.
**Por qué alto por ritmo:** con `100vh` el hero se vuelve portada y esconde el trabajo, que es lo que vino a ver el hiring manager. Usa los mismos espacios que separan todas las secciones.
**Por qué solo la frase (Pablo, 2026-10-11):** el nombre ya está en la nav. Integra la frase única (Araújo) con el aire y la contención (Givelet); lo propio lo pone el contenido.

**Riesgo anotado:** los recruiters filtran por título y empresa ([BRIEF](BRIEF.md#3-audiencia)), y el hero no lo dice. Tiene que leerse en la ficha de la lista de trabajo o en About; se revisa en esas ramas.

---

## 4. Lista de trabajo

| | |
|---|---|
| **Propósito** | Presentar cada proyecto y llevar al case study. Es la navegación principal |
| **Proyectos** | Los 4, en el orden del [BRIEF](BRIEF.md#6-trabajo-que-se-muestra): Agentes · Design System · MeLi benefits-engine · RappiCard. Con placeholders mientras falte contenido |
| **Bloque** | Uno por proyecto. Texto a la izquierda, medio a la derecha, siempre igual (sin zigzag) |
| **Texto** | Nombre (rol **Proyecto**, Medium: 48 desktop · 40 tablet · 24 móvil) → 16 → Ficha: rol · empresa · año (rol Ficha, `color/text/secondary`) |
| **Medio** | Vídeo 4:5, propio de cada proyecto. Se reproduce al entrar en pantalla, sin hover; acepta una imagen fija si el vídeo no está |
| **Desktop** | Texto en columnas 1–6 · columna 7 libre · medio en 8–12 (~465 px a 1280). Texto alineado arriba con el medio |
| **Tablet** | Texto en 4 columnas · medio en 4, misma fila |
| **Móvil** | Apilado: texto primero, medio debajo a todo el ancho |
| **Entre bloques** | 160 / 128 / 96 (ritmo entre secciones) |
| **Estados** | Nombre en `color/text/secondary` que se enciende a `color/text/primary` en hover (`motion/hover`); en táctil, todo en primario ([DESIGN](DESIGN.md#acento-links-imagen-y-lista-cerrado-el-2026-10-11), D2b/D1). Todo el bloque es el link |
| **Movimiento** | Al entrar al case study, el nombre viaja al titular (`motion/reveal`, [DESIGN](DESIGN.md#transición-de-la-lista-al-case-study)) |
| **Reduced motion** | El vídeo no se reproduce solo: muestra su primer cuadro |

**Por qué una mezcla y no A contra B (2026-10-11):** las dos variantes de [REFERENCIAS](REFERENCIAS.md#lista-de-trabajo-en-la-home) se veían flacas por separado. Integra el vídeo 4:5 que se reproduce al entrar (Pianetti), el nombre como pieza tipográfica con encendido (Atmar) y la ficha como dato (Pamidor).
**Por qué el medio a la derecha (Pablo, 2026-10-11):** el nombre queda sobre el mismo borde izquierdo que el hero: una sola línea de lectura. Alternar sería un patrón de landing.
**Por qué texto primero en móvil (Pablo, 2026-10-11):** mismo orden que en desktop, y cumple la regla del hero: el nombre y la ficha del primer proyecto se ven sin scroll (el vídeo 4:5 primero ocuparía ~410 px).
**Por qué el rol Proyecto a 48 / 40 / 24 (Pablo, 2026-10-11):** queda debajo del hero en cada pantalla (64 / 48 / 32), así la frase sigue siendo el punto de entrada. Rol nuevo con elemento que lo usa; sale de la rampa. Si el titular del case study termina más grande, la transición escala el nombre al viajar.
**Por qué solo nombre y ficha (Pablo, 2026-10-11):** sin frase-tesis. La ficha va debajo del nombre (encima sería un eyebrow) y trae lo que filtra el recruiter: rol, empresa y año. Timeline y equipo quedan para la ficha del case study. Resuelve el riesgo anotado en el hero.
**Por qué los 4 (Pablo, 2026-10-11):** la v2.0 sale con los cuatro case studies ([BRIEF](BRIEF.md#9-plan-de-lanzamiento)); nada de filas «próximamente».

**Rol nuevo para DESIGN:** `Proyecto` (48 / 40 / 24, Medium, nivel Afirmación). Se agrega a la tabla de tipografía y a la colección `Typography` en el cierre del grill.

---

## 5. Entrada: el saludo

| | |
|---|---|
| **Propósito** | Saludar mientras la web termina de cargar. La persona antes que la tecnología ([BRIEF](BRIEF.md#7-primera-impresión-y-tono)) |
| **Slot** | Un saludo corto (copy en `CONTENIDO.md`) |
| **Dónde** | En el lugar exacto de la frase del hero: rol Hero (64 / 48 / 32, Medium), 8 columnas a la izquierda, fondo normal de la página. La nav ya está visible |
| **Duración** | Lo que tarda la carga real, con **techo de 4 s**. Si la web está lista en 0.5 s, dura 0.5 s |
| **Salida** | El saludo se desvanece y la frase del hero aparece en su lugar (`motion/reveal`) |
| **Cuándo** | Una vez por sesión, solo al entrar por la home. Quien vuelve o llega directo a un case study no lo ve |
| **Saltar** | Clic, tecla o scroll |
| **Reduced motion** | Aparece y desaparece sin animación |

**Por qué solo mientras carga (Pablo, 2026-10-11):** [REFERENCIAS](REFERENCIAS.md#global--sensación-tipografía-color) dice «no tomar el tiempo de carga de Givelet». Una duración fija sería espera artificial; atada a la carga real, cuenta algo y cumple la regla de movimiento de [DESIGN](DESIGN.md#5-movimiento). El techo protege al recruiter, que da segundos por portfolio.
**Por qué en el lugar del hero (Pablo, 2026-10-11):** no es una pantalla de carga aparte: el saludo se convierte en la frase, en el mismo sitio. Fondo normal porque el acento es de About y CTA; una cortina de color sería la entrada decorativa que DESIGN sacó. Sin tokens nuevos.

---

## 6. About

| | |
|---|---|
| **Propósito** | El momento humano: quién es Pablo, en su voz, y por dónde pasó |
| **Fondo** | `color/accent/bg`, texto en `color/accent/text` |
| **Slots** | Primera frase de la bio → resto de la bio → trayectoria. Solo texto: sin collage, sin foto |
| **Primera frase** | Rol Hero (64 / 48 / 32, Medium), 8 columnas |
| **Bio** | Rol Body, 2–3 párrafos en primera persona con humor, columnas 1–4 |
| **Trayectoria** | Rol Ficha, una línea por etapa: empresa · rol · años. Orden cronológico inverso: RappiPay · Binalogue (en paralelo) · Mercado Libre · agencia. Columnas 7–10 |
| **Desktop** | Frase → 48 → bio (1–4) y trayectoria (7–10) en la misma fila |
| **Móvil** | Apilado: frase → bio → trayectoria |
| **Ancla** | `#about` (destino de la nav) |
| **Movimiento** | Ninguno |

**Por qué solo texto (Pablo, 2026-10-11):** el momento humano lo sostienen la voz (bio de Pamidor) y el color propio (Mijo Bello), sin su collage. Cambia el principio de [REFERENCIAS](REFERENCIAS.md#principio-rector), que se actualiza para decir lo mismo.
**Por qué la primera frase en Hero (Pablo, 2026-10-11):** cada fondo tiene su pieza grande: frase del hero (qué hago) → proyectos → frase del About (quién soy) → CTA (escríbeme). No es un título ni un eyebrow: es la bio empezando fuerte.
**Por qué la trayectoria:** lleva las empresas reconocibles que filtra el recruiter ([BRIEF](BRIEF.md#3-audiencia)) y ordena un recorrido no lineal. Binalogue va «en paralelo», como capítulo y no como cierre ([BRIEF](BRIEF.md#5-situación-profesional-y-cómo-se-cuenta)).

---

_Las siguientes secciones se agregan a medida que avanza el grill._
