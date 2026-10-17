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
| **Destinos** | Work → lista de trabajo de la home · About → `/#about` · Contact → `#contact`, el CTA de la página actual |
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
- ~~Legibilidad sobre el hero del case study~~: resuelto con un segundo degradado arriba ([Hero del case study](#hero)).
- ~~Nombre largo en móvil~~: medido con el nombre real el 2026-10-17. El completo da 379 px y no entra en 327; en móvil va nombre y primer apellido (296 px) en vez del nombre de pila, porque cabe y sigue siendo el nombre que se busca en LinkedIn ([CONTENIDO](CONTENIDO.md#1-global)).

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

## 7. CTA final (footer global)

| | |
|---|---|
| **Propósito** | La conversión principal: escribir por email ([BRIEF](BRIEF.md#8-conversión)). Cierra todas las páginas |
| **Fondo** | `color/accent/bg`. En la home es un solo tramo continuo con el About; en el case study y la 404, va solo |
| **Slots** | Frase → línea de contacto |
| **Frase** | Corta, es un link `mailto:`. Rol CTA (128 / 96 / 48, Bold), alineada a la izquierda, todo el ancho de la retícula |
| **Línea de contacto** | Rol Body: email escrito (también `mailto:`, texto seleccionable) · LinkedIn · CV (PDF, pestaña nueva) |
| **Links** | Patrón `color/link/*` sobre el acento; el subrayado de la frase, proporcional a su tamaño |
| **Separación** | About → CTA: 160 / 128 / 96 · frase → línea de contacto: 48 / 32 / 32 |
| **Ancla** | `#contact` (destino de la nav) |
| **Fuera** | Formulario, botones, «copiar email», hora local ([REFERENCIAS](REFERENCIAS.md#cta-final)) |

**Por qué un solo tramo con el About (Pablo, 2026-10-11):** se lee como una idea, «quién soy → escríbeme». Partirlo pediría una franja o un segundo acento sin motivo.
**Por qué el email escrito y mailto (Pablo, 2026-10-11):** el BRIEF pide mailto visible y copiable, y el email completo no entra en la frase. Escrito debajo cubre a quien no tiene cliente de correo; se copia seleccionándolo. Un botón de copiar traería un estado «copiado» y los tokens de feedback que DESIGN sacó.

---

## 8. Plantilla de case study

Común a los 4 case studies. Las variantes de Agentes y Design System suman bloques al cuerpo (secciones siguientes).

### Hero

| | |
|---|---|
| **Slots** | Imagen a sangre · titular (el nombre del proyecto) abajo a la izquierda |
| **Alto** | 80 svh desktop y tablet · 70 svh móvil: la ficha asoma debajo |
| **Titular** | Rol **Hero** (64 / 48 / 32, Medium), `color/text/on-image`, dentro de la retícula |
| **Velo** | `color/overlay/scrim` en dos degradados: abajo (transparente desde el 35% hasta 70% de negro, para el titular) y **arriba** (70% en el borde hasta transparente al 20%, para la nav) |
| **Movimiento** | El nombre llega desde la lista y crece de 48 a 64 (`motion/reveal`). La imagen no se anima |

**Por qué el titular en Hero (Pablo, 2026-10-11):** es el hero de su página; a 32 se perdía sobre una imagen a sangre (las referencias miden 64–90). Al viajar desde la lista crece, y «entraste» se ve. Sin token nuevo.
**Por qué el segundo degradado (Pablo, 2026-10-11):** la nav blanca de 16 px no pasa 4.5:1 sobre fotos claras. Reutiliza el scrim al revés y deja limpio el centro de la imagen, sin depender de cada foto.

### Ficha

| | |
|---|---|
| **Campos** | Company · Role · Year |
| **Formato** | Etiqueta en rol Ficha (`color/text/secondary`, mayúscula inicial) sobre el valor en Body (`color/text/primary`) |
| **Layout** | Una fila de 3 campos en desktop y tablet · apilados en móvil |
| **Separación** | Hero → ficha: 96 / 64 / 48 |

**Por qué tres campos (Pablo, 2026-10-11):** los mismos datos que la ficha de la lista, ahora con etiqueta. Timeline y equipo salen. La etiqueta nombra un dato, no anuncia un título: no es eyebrow.

### Índice de secciones (solo desktop)

| | |
|---|---|
| **Dónde** | Fijo en las columnas 1–3. Aparece al terminar el hero y se va al llegar a «siguiente proyecto» |
| **Items** | Una etiqueta corta por sección del cuerpo (2–3 palabras, en `CONTENIDO.md`), rol Body |
| **Estado** | Secciones en `color/text/secondary`; la actual en `color/text/primary` (encendido D2b, `motion/hover`). Clic → salta con scroll nativo |
| **Tablet y móvil** | No hay índice |

**Por qué solo desktop (Pablo, 2026-10-11):** en móvil haría falta una barra plegable con estado, lo que se evitó con la nav. Allí se lee de corrido y las tesis orientan. Es la única pieza fija de la web.

### Cuerpo

| | |
|---|---|
| **Overview** | Primera sección: pregunta-titular en rol **Tesis** + respuesta de 2–3 frases en Body. Sin eyebrow (Hayler) |
| **Secciones** | Titular-tesis (rol **Tesis**: 32 / 32 / 24, Medium) → 48 / 48 / 32 → texto en Body → imágenes |
| **Columnas (desktop)** | Texto en 5–8 (~380 px a 1280) · imágenes en 5–12 |
| **Tablet y móvil** | Texto en la columna de texto de la retícula · imágenes a todo el ancho de la retícula |
| **Entre secciones** | 160 / 128 / 96 · entre párrafos, 24 |
| **Cifra estrella** | Máximo una por case study, solo si es real: su titular-tesis sube a rol **Hero** y la cifra entra con `motion/reveal` (sube desde abajo mientras aparece). Sin cifra, el resultado se cuenta como cambio cualitativo |

**Por qué «Tesis» (Pablo, 2026-10-11):** el rol de 32 ya existía como «Título de case study»; ahora lo usan los titulares-tesis y se renombra para decir lo que hace.
**Por qué sin rol Métrica (Pablo, 2026-10-11):** la cifra nunca va suelta: vive en una frase que dice qué significa ([REFERENCIAS](REFERENCIAS.md#case-study), nunca tarjetas de KPI). Cuando es la estrella, la frase entera sube a Hero. Un token menos.

### Imágenes del cuerpo

| | |
|---|---|
| **Proporción** | La de cada imagen: ancho por columnas, alto el que salga. No se recorta para que cuadren entre sí |
| **Ancho** | Columnas 5–12 en desktop · todo el ancho de la retícula en tablet y móvil |
| **Capturas de móvil** | 2 o 3 lado a lado en el mismo ancho, separadas por el gutter · máximo 2 en móvil |
| **Pantallas largas** | Recortadas a su tramo útil. Sin scroll interno |
| **A sangre** | Máximo una por case study, y solo si es horizontal: todo el ancho de la ventana, fuera del límite de 1440 ([DESIGN](DESIGN.md#breakpoints)). El índice se oculta mientras pasa por su lugar |
| **Vídeo** | Como en la lista: se reproduce al entrar en pantalla, sin sonido, en loop y sin controles. Con movimiento reducido muestra su primer cuadro |
| **Pie de foto** | Opcional. Debajo de la imagen, a 16, en rol Ficha y `color/text/secondary`, alineado a la columna 5 (también bajo la imagen a sangre) |
| **Forma** | Radio 0. Borde de 1 px por dentro solo en capturas con fondo claro ([DESIGN](DESIGN.md#bordes)) |
| **Separación** | Texto → imagen: 48 / 48 / 32 · entre imágenes: 24 / 24 / 16 (el gutter) |

**Por qué la proporción de cada imagen (Pablo, 2026-10-17):** las capturas de producto tienen tamaños distintos; forzar una sola proporción recorta interfaz que importa o la rellena.
**Por qué una a sangre (Pablo, 2026-10-17):** un respiro visual a mitad del cuerpo. Costo aceptado: rompe la retícula y compite con el hero. Por eso es una sola y horizontal (una vertical a todo el ancho no cabe en pantalla), y el índice se aparta para no flotar sobre ella.
**Por qué el pie opcional (Pablo, 2026-10-17):** solo cuando la imagen dice algo que el texto no dice. Un pie obligatorio termina repitiendo el párrafo. Usa un rol que ya existe: sin token nuevo.
**Por qué el vídeo sin controles (Pablo, 2026-10-17):** un play sería el primer botón de la web. Es el mismo comportamiento de la lista, así que no se aprende nada nuevo.

### Siguiente proyecto

| | |
|---|---|
| **Bloque** | El mismo bloque de la [lista de trabajo](#4-lista-de-trabajo): nombre en rol Proyecto + ficha + medio 4:5 a la derecha |
| **Ficha** | Empieza con «Next project»: `Next project · Company · Role · Year` |
| **Orden** | Agentes → Design System → MeLi → RappiCard → Agentes (loop) |
| **Después** | El CTA, sobre el acento |

**Por qué el bloque de la lista (Pablo, 2026-10-11):** un solo componente, con el mismo encendido y la misma transición. «Next project» va en la ficha, debajo del nombre: encima sería eyebrow. El loop evita el callejón sin salida y vuelve al titular AI-native.

**Cambios para DESIGN (cierre del grill):** el titular del case study pasa al rol Hero; «Título de case study» se renombra a «Tesis»; el rol Métrica sale.

---

## 9. Variante: case study de Agentes

Usa la plantilla. El cuerpo sigue la narrativa de [REFERENCIAS](REFERENCIAS.md#case-study) (Pixel Agent); cada paso es una sección con su titular-tesis:

1. Frustración en primera persona
2. Las fricciones concretas
3. Una cita que lo condensa
4. La decisión de diseño clave (por qué X y no Y)
5. Qué hace el agente por dentro → **simulación**
6. Cierre con una idea

### Cita

Rol Tesis, columnas 5–12, sin comillas decorativas. Atribución debajo en rol Ficha (`color/text/secondary`).

### Simulación guionizada

| | |
|---|---|
| **Qué es** | El superagente resolviendo una tarea de diseño en 4–6 pasos: pedido → razonamiento → skill que elige → resultado. Construida en HTML con los tokens de la web |
| **Datos** | Guion representativo, sin datos reales de RappiPay; el case study lo dice |
| **Cómo avanza** | Corre una vez al entrar en pantalla; cada paso aparece con `motion/reveal`. Al terminar queda quieta, con un link de texto «Replay» |
| **Reduced motion** | No corre sola: avanza con un link «Next step» ([DESIGN](DESIGN.md#movimiento-reducido-prefers-reduced-motion)) |
| **Ancho** | Columnas 5–12 en desktop · todo el ancho de la retícula en tablet y móvil |
| **Color** | La interfaz del agente usa el par del acento (`color/accent/*`), como los gráficos |

**Por qué HTML y no vídeo (Pablo, 2026-10-11):** el texto se lee y escala en móvil, no expone material confidencial, y construirla con el propio sistema demuestra lo AI-native en vez de decorarlo ([BRIEF](BRIEF.md#7-primera-impresión-y-tono)). Integra la simulación de Pixel Agent con el reveal de State of AI.
**Por qué una vez + «Replay»:** igual que el reveal, lo que ya leíste no vuelve a animarse solo; volver a verla es decisión de quien lee.

---

## 10. Variante: case study de Design System

Usa la plantilla. El cuerpo sigue la presentación de [REFERENCIAS](REFERENCIAS.md#case-study) (Material 3, HIG, Polaris, Carbon, Atlassian), con tres módulos en este orden:

| Módulo | Cómo |
|---|---|
| **Principios** | 3–4, cada uno como sección con su titular-tesis |
| **Tokens** | Diagrama primitivo → semántico → uso, revelado por capas (`motion/reveal`), en el par del acento como los gráficos |
| **Do / Don't** | Pares lado a lado: columnas 5–8 y 9–12 en desktop, apilados en móvil. Debajo de cada ejemplo: «✓ Do» o «✕ Don't» en rol Ficha, `color/text/primary`, y el porqué en Body |

**Por qué Do / Don't sin verde ni rojo (Pablo, 2026-10-11):** la etiqueta y la frase dicen todo (el color nunca va solo, WCAG 1.4.1), y recuperar los tokens de feedback para un solo bloque los traería de vuelta sin otro uso. El ejemplo incorrecto se ve incorrecto por su contenido.

## 11. MeLi benefits-engine y RappiCard

Usan la plantilla sin bloques propios. MeLi tiene la cifra estrella candidata (+10 días de stock almacenado promedio, [BRIEF](BRIEF.md#6-trabajo-que-se-muestra)), sujeta a lo que se pueda mostrar ([BRIEF](BRIEF.md#11-riesgos-abiertos)). Si sus insumos piden algo que la plantilla no tiene, se agrega aquí.

---

## Verificación del grill (2026-10-11)

- Cada sección traza a [BRIEF](BRIEF.md) o [REFERENCIAS](REFERENCIAS.md); los cambios contra REFERENCIAS (About sin collage, ficha de tres campos) quedaron escritos allá.
- Tokens nuevos: solo el rol **Proyecto**, con elemento que lo usa. Salen: rol Métrica. Renombre: Título de case study → Tesis. Ningún color, radio ni sombra nuevo.
- Nada de la lista [Nunca](REFERENCIAS.md#nunca): sin eyebrows (fichas y «Next project» van debajo de los nombres), sin KPI cards, sin botones, sin lila.
- Ninguna sección copia un solo referente: cada una dice qué toma de quién.
