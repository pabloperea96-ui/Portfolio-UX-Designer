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

| Rol | Tamaño (desktop) | Line-height | Tracking |
|---|---|---|---|
| Ficha | 12 px | 140% | +1.5% |
| Body | 16 px | 155% | +0.5% |
| Tesis | 32 px | 120% | −0.5% |
| Proyecto | 48 px | 115% | −1% |
| Hero | 64 px | 115% | −1% |
| CTA | 128 px | 100% | −2% |

**Por qué estos valores:** con los valores v1 Helvetica Neue se veía demasiado comprimida y poco editorial. v2 abre los tamaños chicos y cierra menos los grandes: es una escala óptica, donde el tracking baja a medida que sube el tamaño.
**Por qué estos tamaños (2026-10-11):** los anteriores (13, 17, 26, 38, 68) no estaban en la rampa. Cada rol pasó al paso más cercano. El título sube a 32 para no chocar con la métrica (24). La ficha baja a 12 para separarse del body. El CTA estuvo en 64 hasta decidir los breakpoints; ahora va de 48 a 128 según la pantalla (tabla siguiente).
El body va siempre en Regular.

### Tamaños por breakpoint (decidido el 2026-10-11)

Los breakpoints están en [§3](#3-espaciado-y-retícula).

| Rol | Móvil | Tablet | Desktop |
|---|---|---|---|
| CTA | 48 | 96 | 128 |
| Hero | 32 | 48 | 64 |
| Proyecto | 24 | 40 | 48 |
| Tesis | 24 | 32 | 32 |
| Body | 16 | 16 | 16 |
| Ficha | 12 | 12 | 12 |

**Cambios del grill de secciones (2026-10-11):** el hero sube a 64 / 48 en desktop y tablet; nace **Proyecto** (nombre en la lista de trabajo); «Título de case study» se renombra **Tesis** (titulares-tesis del cuerpo; el titular sobre la imagen usa Hero); **Métrica sale** (la cifra vive dentro de una tesis). Qué usa cada rol y por qué: [`SECCIONES.md`](SECCIONES.md).

Line-height y tracking en % no cambian; sus valores en px se recalculan para cada tamaño.

**En Figma:** la colección `Typography` tiene los modos `Mobile`, `Tablet` y `Desktop` (2026-10-11). Cada rol apunta al paso de la rampa de su modo, con line-height y tracking ya en px.

**Por qué el CTA llega a 128 y no a 140:** 128 es el techo de la rampa y queda a menos de un 10% de lo que piden las referencias. Inventar un 140 rompería la regla de la rampa.
**Por qué 48 en móvil:** una frase corta como «Escríbeme» entra en una línea de 327 px; a 64 ya no. **Regla:** el CTA es una frase corta. Si el link mostrara el email completo, a 128 no entraría ni en 1440.
**Por qué solo cambian los roles grandes:** con 40 px en 327 de ancho caben unas 14 letras por línea y la frase del hero se parte en demasiadas líneas. Body, ficha y métrica ya se leen bien en móvil.
**Proyecto y Tesis a 24 en móvil:** empatan, pero nunca conviven en la misma sección: Proyecto vive en la lista y en «siguiente proyecto»; Tesis, en el cuerpo del case study.

### Fallback — Inter

**1. Tamaño: `size-adjust: 94.7%`.** Así Inter queda con la misma altura de x que Helvetica Neue (0.517) y el mismo ancho de párrafo.
**2. Line-height: el mismo de Helvetica Neue, en px.** No se ajusta.
**3. Tracking = el de Helvetica Neue + una compensación por peso:**

| Peso | Compensación |
|---|---|
| Regular | +0% |
| Medium | +1% |
| Bold | +1.6% |

**4. Extra del CTA: −0.7%** sobre la compensación de Bold (medido con «Let's talk.» el 2026-10-18).

Ejemplo: el hero en Medium lleva −1% en Helvetica Neue y −1% + 1% = **0%** en Inter. El CTA en Bold lleva −2% + 1.6% − 0.7% = **−1.1%**.

**Por qué la compensación:** a igual tracking, Inter queda más apretada que Helvetica Neue, y la diferencia crece con el peso.
**Por qué el extra del CTA es de la frase y no del tamaño:** el CTA es una sola línea corta, así que su ancho depende de qué letras tiene. Con «Let's talk.» y solo la compensación de Bold, Inter queda un 1.5% más ancha; con −0.7% queda igual (−0.1%). El resultado es el mismo a 48, 96 y 128: la Inter que se aloja no tiene eje óptico, así que su ancho crece en proporción al tamaño. El +1.4% de antes salió de otra frase («Reach me out», a 64), que con este valor da un 3.8% de diferencia. **Regla:** si cambia la frase del CTA, se vuelve a medir el extra en el specimen.
**Por qué no se usa el tracking que recomienda Inter** (su fórmula Dynamic Metrics): da entre 1.5 y 3 puntos menos que Helvetica Neue, por ejemplo −1.1% en el body contra +0.5%. Con eso cambiarían los cortes de línea.

**Verificado en el specimen** (2026-10-11, con los tamaños de la rampa): Helvetica Neue e Inter cortan en las mismas palabras en tesis y body, en los tres pesos, a 400 px de ancho. La ficha queda entre +0.4 y +0.8% más ancha en Inter.

**Proyecto y Hero, medidos en todos los anchos (2026-10-18).** En Medium, con los textos reales de [`CONTENIDO.md`](CONTENIDO.md) (los 4 nombres de la lista, la frase del hero y la primera frase del About), cada 8 px de 320 a 1440, con el tamaño y la columna de cada breakpoint:

| Rol | Anchos que cortan distinto | Dónde se nota |
|---|---|---|
| Proyecto (24 / 40 / 48) | 3 de 564 (0.5%) | En 2 casos cambia el número de líneas: «RappiCard Secured» a 792 px y «Gaia: end-to-end feature builder» a 1256 px |
| Hero y About (32 / 48 / 64) | 25 de 282 (8.9%) | Casi siempre una palabra que salta de línea. En 8 casos cambia el número de líneas, por ejemplo el hero a 1376 px (4 líneas en Helvetica Neue, 3 en Inter); a 768 la frase del About corta antes o después de «the» |

**No se ajusta el tracking.** Se probó la compensación de Medium de +0.8 a +1.8%, de a 0.1, y se cuentan sobre todo los anchos donde cambia el número de líneas, porque eso mueve el layout; una palabra que salta sin cambiar las líneas casi no se ve. El +1% actual es el que menos líneas cambia (8 en el hero y 2 en Proyecto). Con +1.2% hay menos cortes distintos en total (26 contra 28), pero cambian más líneas (9 y 4). Medido con la frase del hero elegida el 2026-10-18; con la anterior, +1% también daba el mínimo de cortes distintos. Lo que queda no es de tracking: cada palabra difiere en ancho de forma distinta entre las dos fuentes, así que en algún ancho una palabra salta de línea. **La regla se cumple así:** la misma línea de lectura y el mismo peso visual, con los mismos cortes en la mayoría de los anchos; una palabra que salta de línea en un ancho puntual se acepta.

Se reproduce en el specimen: sección «Cortes por ancho de pantalla», con el peso Medium.

### Cómo se implementa

- **Los % de tracking de Inter son relativos a su tamaño real** (el declarado × 0.947). En CSS, `letter-spacing` en `em` se calcula sobre el tamaño declarado, así que hay que multiplicar el valor de Inter por 0.947. Ejemplo: +1% pasa a `0.0095em`.
- **Una sola lista de fuentes (`"Helvetica Neue", Inter`) no permite un tracking distinto para cada fuente**, porque `letter-spacing` se aplica al elemento sea cual sea la fuente que se dibuje. Para usar los valores de Inter hace falta detectar si Helvetica Neue está instalada (el specimen lo hace midiendo un texto en canvas) y marcar `<html>` con una clase, por ejemplo `no-hn`. Esa clase cambia las variables de tracking.
- **El `size-adjust` va en el `@font-face` de Inter**, así que solo afecta a Inter.
- **En Figma** (librería «Portfolio Design System», colección `Typography`), los roles no tienen valores sueltos de tamaño, familia ni peso: el tamaño es un alias de la rampa (colección `Primitives`, `font-size/<n>`), la familia de `font-family/helvetica-neue` y el peso de `font-weight/regular`, `/medium` o `/bold` (solo esos tres existen, así que la regla de pesos queda en la librería). Line-height y tracking no tienen primitivos en Figma: su escala en % vive aquí y en el CSS, porque Figma no puede calcular un % de un tamaño. Line-height y letter-spacing van en **px**, no en %: Figma lee esas variables en px (se midió el 2026-10-11). Los valores en px salen de esta tabla; si cambia un tamaño, hay que recalcularlos. Los roles se llaman en inglés, como en el código: `meta` (ficha), `body`, `thesis` (tesis), `project` (proyecto), `hero` y `cta`.

### Pesos

Se trabaja con **Regular, Medium y Bold**, y solo con esos tres. El tamaño marca la jerarquía y el peso la refuerza, siempre con el mismo significado:

| Nivel | Peso | Roles |
|---|---|---|
| Acción | Bold | CTA |
| Afirmación | Medium | Hero, Proyecto, Tesis |
| Lectura | Regular | Body (siempre), ficha |

**Por qué tres niveles fijos (2026-10-11):** con todos los pesos iguales no había dónde destacar. Si cada peso significa una sola cosa, el peso nunca se usa como decoración. Esto ajusta la regla de `REFERENCIAS.md` («jerarquía por tamaño, no por peso»): el tamaño sigue mandando y el peso solo refuerza. Se valida en pruebas en contexto.

**Por qué tres y no más:** son los pesos que tienen medida la compensación de Inter. Un peso nuevo obliga a medirlo de nuevo en el specimen.
**Bold, en observación:** Pablo duda de él. Sigue disponible hasta verlo en contexto; si no se gana su lugar, sale, y con él su compensación.

### Pendiente

- **Pesos por rol:** se definen en las pruebas en contexto.
- **Line-height y tracking de Proyecto:** 115% / −1% salen de la escala óptica (igual que el hero); se validan en contexto.
- **Librería en Inter mientras se construye (Pablo, 2026-10-18):** `typography/family/base` apunta a `font-family/Inter`, porque el MCP de Figma no puede cargar Helvetica Neue y sin eso no puede aplicar estilos ni editar texto. Al terminar, Pablo vuelve el primitivo a Helvetica Neue (y su nombre a `font-family/helvetica-neue`). En Figma, Inter ocupa ~5% más ancho que en la web, donde lleva `size-adjust`: los cortes de línea se revisan después del cambio, no antes.
- **Figma (CP-003):** la columna de Helvetica Neue todavía tiene v1 y los tamaños anteriores a la rampa. Es una exploración archivable: la referencia ahora es la librería.

---

## 2. Color

**Cerrado el 2026-10-11.** Pruebas: archivo Portfolio-V2, sección CP-004 (`2020:300`).

**La web va solo en modo claro por ahora** (Pablo, 2026-10-18; el porqué en [SECCIONES](SECCIONES.md#modo-claro-por-ahora)). Las columnas Dark de esta sección se conservan, ya verificadas, por si el modo oscuro vuelve. En la librería: colecciones `Primitives` (rampa) y `Color` (semánticos, modos Light y Dark), documentadas en la página 🎨 Color.

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
| `color/border/subtle` | 200 | 800 | Borde de las capturas con fondo claro (§4) |
| `color/focus` | 900 | 50 | Anillo de foco |

**Contraste verificado en los dos modos:** texto principal entre 15.97 y 17.95:1; texto secundario entre 4.76 y 5.43:1 (AA). El borde sutil no llega a 3:1 y por eso solo es decorativo.

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
**Cómo se usa desde el 2026-10-18:** en el componente [Link](#link), que decide cuándo hay subrayado en reposo y cómo se dibuja en hover.
**Por qué C3:** con fotos claras, un titular blanco necesita al menos 60% de negro debajo. El degradado (transparente desde el 35% de la altura hasta 70% abajo) oscurece solo donde va el texto y deja la imagen limpia arriba. Con un velo plano de 40% daba 2.85:1.
**D2b en pausa (2026-10-18):** la lista de la home va toda en primario (D1) en todas las pantallas; ver [SECCIONES §4](SECCIONES.md#4-lista-de-trabajo).
**Por qué D2b, y D1 en móvil:** el gris de Atmar en reposo daba 1.67:1 y la lista es la navegación principal. Con `color/text/secondary` (5.11 / 5.43:1) mantiene la idea —apagado en reposo, encendido en hover— y pasa AA en cualquier tamaño. En pantallas táctiles no hay hover (`@media (hover: hover)`), así que ahí la lista va toda en texto principal.

### Feedback — fuera por ahora

**Se sacó de la librería el 2026-10-11** (el mismo día que se definió). REFERENCIAS dice del CTA «sin formulario y sin botones», así que no hay errores ni éxitos que mostrar. Los valores quedan aquí, ya verificados, para recrearlo sin recalcular si algún día aparece un formulario o un «email copiado».

| Tipo | Rampa | Texto (L / D) | Fondo suave (L / D) | Borde (L / D) |
|---|---|---|---|---|
| `color/feedback/error/*` | `color/red` | 600 / 400 | 100 / 900 | 500 |
| `color/feedback/success/*` | `color/green` | 600 / 400 | 100 / 900 | 500 |
| `color/feedback/warning/*` | `color/amber` | 600 / 400 | 100 / 900 | 500 |
| `color/feedback/info/*` | `color/ink` (tinta) | 600 / 400 | 100 / 900 | 500 |

Rampas de 11 tonos en OKLCH con la luminosidad de los neutros, como tinta y hueso:

| Paso | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `color/red` | FFF8F8 | FFEEEB | FED2CC | FEABA1 | F27B6F | E0564D | C02726 | 94020D | 5D0105 | 2B0001 | 1D0000 |
| `color/green` | F7FCF8 | EAF6EC | CAE7CE | 9FD3A9 | 6AB87C | 40A15C | 007A36 | 015E28 | 013916 | 001806 | 000E03 |
| `color/amber` | FDF9F5 | FBF0E4 | F3DABB | E7BC86 | D39540 | BB7A06 | 925F05 | 6B4402 | 412801 | 1C0F00 | 120800 |

**Contraste verificado sobre los colores reales de cada modo:** el texto pasa AA sobre el fondo, la superficie y su propio fondo suave (entre 4.75 y 7.73:1); el borde pasa 3:1 (entre 3.11 y 5.77:1).
**Por qué info usa la tinta:** ya es nuestra y es azul; sumar otro azul sería un acento más. Además, nada lila ni violeta.
**Por qué el verde 600 es `#007A36`:** el que salía de la rampa (`#008139`) daba 4.47:1 sobre la superficie clara.
**Regla:** el color nunca va solo. El mensaje dice qué pasó (WCAG 1.4.1).

### Fuera por ahora

- **Superficies por nivel:** con fondo y superficie alcanza; la web es casi plana.
- **`color/border/strong`** (neutral 500 / 600, entre 3.08 y 3.52:1): era para bordes de controles, y la web no tiene controles. Sacado de la librería el 2026-10-11.
- **Feedback:** ver arriba.

---

## 3. Espaciado y retícula

**Decidido el 2026-10-11.**

### Escala de espaciado

**4, 8, 12, 16, 24, 32, 48, 64, 96, 128 y 160.** Todo margen, padding y gap sale de aquí.

**Por qué:** es la misma regla de la [rampa tipográfica](#rampa-de-tamaños): 4 y 12 son la excepción para lo chico (separar una etiqueta de su valor en la ficha) y desde 8 van múltiplos de 8. La letra y el aire comparten una sola retícula de 8, así que no hay una segunda lógica que recordar.
**Por qué no fluida (`clamp` con `vw`):** Figma no puede representar un token con mínimo y máximo. Los cambios por pantalla van por breakpoint.

### Breakpoints

| Nombre | Desde | Hasta |
|---|---|---|
| Móvil | 0 | 767 |
| Tablet | 768 | 1279 |
| Desktop | 1280 | — |

El contenido se limita a **1440 px** de ancho y se centra. Las imágenes a sangre ignoran ese límite.

**Por qué tres:** un portfolio se ve sobre todo en laptop y celular. El tablet existe para que un iPad vertical no muestre el layout de móvil estirado. Un cuarto breakpoint (wide) solo serviría para limitar el ancho, y eso ya lo hace el máximo de 1440.
**Por qué 768 y 1280:** son múltiplos de 8 y coinciden con los anchos reales de iPad y de laptop.

### Retícula

| | Columnas | Margen | Gutter | Columna de texto |
|---|---|---|---|---|
| Móvil | 4 | 24 | 16 | todo el ancho (327 px a 375) |
| Tablet | 8 | 32 | 24 | 6 columnas (~520 px a 768) |
| Desktop | 12 | 48 | 24 | 4 columnas (379 px a 1280 · 432 px a 1440) |

**Por qué estos valores:** la columna de texto de las referencias (340–430 px, [REFERENCIAS](REFERENCIAS.md#case-study)) sale sola de la retícula: 4 de 12 columnas en desktop. No es un ancho suelto.
**Por qué margen de 48 en desktop:** da el aire de Givelet, que usa 36 (fuera de la escala). Con 64, a 1280 la columna de texto bajaría de 379 px y la imagen a sangre se distinguiría menos del contenido.
**Por qué margen de 24 en móvil (Pablo, 2026-10-11):** con 16 el texto queda pegado al borde.

### Ritmo vertical

| | Móvil | Tablet | Desktop |
|---|---|---|---|
| Entre secciones | 96 | 128 | 160 |
| Titular-tesis → cuerpo | 32 | 48 | 48 |
| Entre párrafos del body | 24 | 24 | 24 |

**Por qué 160 en desktop:** es el «mucho aire» que piden las referencias. Con 128 el aire se parece más al de Hayler, que fue «decente pero no del todo bueno». En móvil baja a 96 para que el scroll no se haga eterno.
**Por qué 24 entre párrafos:** es una línea en blanco (el body tiene 24.8 px de línea), así el texto mantiene su ritmo vertical.

### En Figma

- **Escala:** variables `space/4` … `space/160` en la colección `Primitives`, con scope de gap y padding.
- **Retícula:** estilos `grid/mobile`, `grid/tablet` y `grid/desktop`, con gutter y margen enlazados a `space/*`.
- **Documentación:** páginas 📏 Espaciado y 📐 Retícula y layout de la librería.

### Pendiente

- **Titular-tesis → cuerpo en tablet:** quedó en 48 por defecto; se valida en contexto.
- **Espacios dentro de los componentes** (ficha, card de proyecto, nav): definidos en [`SECCIONES.md`](SECCIONES.md) el 2026-10-11, todos sobre esta escala.

---

## 4. Forma y profundidad

**Decidido el 2026-10-11.**

### Radios

**Escala: 0, 4, 8, 12, 16, 24 y 999 (pill).** Son pasos de la [escala de espaciado](#escala-de-espaciado) más el pill.

| Elemento | Radio |
|---|---|
| Hero a sangre e imágenes del cuerpo del case study | 0 |
| Miniaturas de la lista de trabajo | 8 |

El resto de la escala queda disponible. El grill de [`SECCIONES.md`](SECCIONES.md) (2026-10-11) no pidió roles nuevos de radio: imágenes y bloques van sin radio.

**Por qué:** el sitio sigue siendo editorial donde manda la imagen (recta, como en las referencias).
**Por qué solo dos roles (2026-10-11):** el primer mapa también daba radio a campos (8), bloques (16), menú móvil (24), botones (4) y chips (pill). Se sacó porque ningún elemento de las referencias los usa: el CTA no tiene formulario ni botones, la nav es texto plano y las disciplinas van como texto. Un rol nuevo nace de una sección de `SECCIONES.md`, no de suponer qué componente va a existir. Si vuelven, los valores elegidos fueron esos; el botón en 4 fue decisión de Pablo.
**Ojo:** los radios de 8 y 24 de los paneles de la librería de Figma son de la documentación, no de la web.

### Bordes

| Uso | Grosor | Color |
|---|---|---|
| Foco | 2 px, separado 2 px del elemento (`outline-offset`) | `color/focus` |
| Capturas de interfaz con fondo claro | 1 px por dentro | `color/border/subtle` |

**Por qué un solo grosor:** el foco es el único trazo de 2 px, así nunca se confunde con un borde.
**Por qué sin divisores ni nav con borde (2026-10-18):** la nav no es fija ([SECCIONES §2](SECCIONES.md#2-nav)) y ninguna sección separa bloques con una línea: los separa el aire (§3). Si una sección pide un divisor, la fila vuelve con ese elemento.
**Por qué el borde de las capturas va solo en las claras:** una captura con fondo blanco se funde con `color/bg/default`. Las fotos y el hero no lo necesitan. Es una regla de contenido: se decide imagen por imagen, no se aplica sola. Va por dentro para no cambiar el tamaño de la imagen.

### Sombras

**Ninguna.** La profundidad sale del color (`color/bg/surface` sobre `color/bg/default`) y del velo sobre las imágenes (§2).

**Por qué:** ninguna referencia usa sombras, y una sombra suave es una de las marcas de una web hecha con plantilla. Si algún día aparece un overlay que lo necesite, la sombra se define con ese componente.

### En Figma

- **Escala:** `radius/0` … `radius/24` y `radius/full` en `Primitives`.
- **Roles:** colección `Shape` con `radius/image` y `radius/thumbnail` (alias de la escala), más `border/width`, `focus/width` y `focus/offset`.
- **Documentación:** página ⬜ Forma y profundidad. El foco se muestra sobre un link y se simula con un anillo, porque Figma no tiene `outline-offset`.

---

## 5. Movimiento

**Decidido el 2026-10-11.** Parte de [REFERENCIAS](REFERENCIAS.md#movimiento) (State of AI Design): **solo se mueve lo que cuenta algo.**

### Tokens

| Token | Duración | Curva | Stagger | Qué lo usa |
|---|---|---|---|---|
| `motion/reveal` | 900 ms | `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quint) | 60 ms | Cifras, pasos de la simulación del agente, diagramas del Design System y el nombre del proyecto que viaja al case study |
| `motion/hover` | 200 ms | `cubic-bezier(0.44, 0, 0.56, 1)` | — | La línea del [Link](#link) que se dibuja en hover |

Todo lo que se mueve usa uno de los dos. No hay más duraciones.

**Por qué dos y no tres:** Atmar anima su lista a 0.3 s y State of AI sus links a 0.2 s. Unificar la lista con los links deja un solo ritmo de respuesta en toda la web.

### Reveal

- **Se dispara una vez**, cuando el elemento entra en pantalla con el 20% visible (IntersectionObserver). Después queda quieto. Si la página carga con el elemento ya visible, se anima al cargar.
- **Qué se revela:** barras que crecen en ancho, cifras que suben desde abajo mientras aparecen, pasos de la simulación. **Nunca** títulos ni imágenes (REFERENCIAS: sin entradas decorativas).

**Por qué una sola vez:** una cifra que ya leíste y vuelve a animarse es decoración.

### Transición de la lista al case study

El **nombre del proyecto viaja** desde la lista hasta el titular del case study, con `motion/reveal` (View Transitions entre documentos, sin librería). Es la única transición de página. En navegadores sin soporte, se navega sin transición.

**Por qué (Pablo, 2026-10-11):** es lo que le gustó de Atmar (anotado en EXTRACCIONES, no en REFERENCIAS). Cumple la regla porque cuenta algo: «entraste a este proyecto». Un fundido de página completa no contaría nada.

### Movimiento reducido (`prefers-reduced-motion`)

| Qué | Comportamiento |
|---|---|
| Reveal | Aparece en su estado final, sin animar |
| Transición lista → case study | Corte directo |
| Hover del Link | La línea aparece completa, sin dibujarse: dibujarla es movimiento |
| Simulación del agente | No corre sola: avanza con un link «Next step» |
| Vídeos de la lista | No se reproducen solos; muestran su primer cuadro |

**Por qué estado final y no un fundido corto:** un fundido sigue siendo movimiento para algunas personas, y el estado final no esconde información (WCAG 2.3.3).

### Fuera

- **Smooth scroll** (Lenis o `scroll-behavior: smooth`): el scroll es nativo.
- **Entradas decorativas** de títulos e imágenes, stagger de letras (Atmar) y texturas animadas.
- **Fundido de página completa.**

### En Figma

Colección `Motion` con `motion/reveal/duration`, `/reveal/stagger`, `/reveal/easing`, `motion/hover/duration` y `/hover/easing`. No tienen scope, porque ninguna propiedad de Figma acepta una duración o una curva; están para que diseño y código lean los mismos valores (en código: `--motion-reveal-duration`, etc.). Documentación: página 🎞️ Movimiento, con las curvas dibujadas.

---

## 6. Componentes

**Decidido el 2026-10-18 (Pablo).** El sistema tiene que vivir en Figma igual que en código, para que cada proyecto nuevo se arme con piezas que ya existen.

### Reglas

- **Una pieza, tres lugares, un solo nombre.** Qué es y dónde va: [`SECCIONES.md`](SECCIONES.md). Cómo se ve y se comporta: esta sección. Construida en la librería de Figma y en código con el mismo nombre y las mismas variantes.
- **El orden es documento → Figma → código.** Si algo se decide probando en el navegador, primero se escribe aquí y después se cambia en Figma y en código.
  **Por qué:** el 2026-10-18 la nav cambió su link en el navegador y el CTA se quedó con el anterior. Tres links distintos en una sola página: así se pierde la consistencia.
- **Un proyecto nuevo es una plantilla llena.** El case study se arma en Figma duplicando su plantilla y llenándola con lo de [`CONTENIDO.md`](CONTENIDO.md); en código, con la misma plantilla. Nada se dibuja desde cero.

### Link

Un solo componente para todos los links de la web. Dos variantes; el hover es el mismo en las dos.

| Variante | Dónde | Reposo | Hover |
|---|---|---|---|
| **En lista** | Nav, línea de contacto del CTA, índice del case study | Sin subrayado | Una línea de 1 px del color del texto se dibuja de izquierda a derecha (`motion/hover`) |
| **En texto** | Frase del CTA, links dentro de un párrafo, links sueltos (404, Replay, Next step) | Subrayado en `color/link/underline` | La misma línea, del color del texto, se dibuja encima del subrayado gris |

- **Grosor:** 1 px en Body; proporcional al tamaño en la frase del CTA (0.04 em).
- **Sobre el acento:** el subrayado en reposo es el texto del acento al 55% sobre su fondo. Es el valor que ya usa el código; queda como `color/link/underline` en el contexto del acento.
  **En Figma (Pablo, 2026-10-18):** sin token nuevo. La instancia lleva texto y línea en `color/accent/text`, y en reposo la capa de la línea va al 55% de opacidad. Es opacidad de capa y no de la pintura, porque Figma descarta la opacidad de una pintura enlazada a una variable al escribirla en una instancia (medido).
- **Táctil:** sin hover. **Movimiento reducido:** la línea aparece completa, sin dibujarse.

**Por qué dos variantes:** en una lista de destinos el contexto ya dice «esto es un link», y el subrayado fijo cargaba la nav. Un link suelto o dentro de un párrafo no tiene ese contexto: el subrayado es la única señal (WCAG 1.4.1).
**Por qué un solo hover:** la nav dibujaba la línea y el resto cambiaba de color. Un mismo gesto en toda la web se aprende una vez.

### Inventario

Estado al 2026-10-18. Componentes: piezas que se repiten. Plantillas: páginas armadas con ellos.

| Componente | Variantes | Dónde (SECCIONES) | Figma | Código |
|---|---|---|---|---|
| Link | En lista · En texto | Toda la web | hecho: página 🔗 Link, set `2060:43` (Variante × Estado) | home (`.link`, `.link--list`, `.link--text`) |
| Nav | Pantalla (Desktop y tablet: nombre completo · Móvil: nombre corto) × Fondo (Base · Sobre imagen) | [§2](SECCIONES.md#2-nav) | hecho: página 🧭 Nav, set `2064:87` | home |
| Bloque de proyecto | Tipo (Lista · Siguiente proyecto) × Pantalla (Desktop · Tablet · Móvil) | [§4](SECCIONES.md#4-lista-de-trabajo), [§8](SECCIONES.md#siguiente-proyecto) | hecho: página 🗂️ Bloque de proyecto, set `2065:67` | home (lista) |
| CTA | Continuo con el About · Solo | [§7](SECCIONES.md#7-cta-final-footer-global) | pendiente | home |
| Ficha | Tres campos | [§8](SECCIONES.md#ficha) | pendiente | pendiente |
| Sección del cuerpo | Normal · Con cifra estrella | [§8](SECCIONES.md#cuerpo) | pendiente | pendiente |
| Imagen del cuerpo | Normal · Captura clara · A sangre · Capturas de móvil · Con pie | [§8](SECCIONES.md#imágenes-del-cuerpo) | pendiente | pendiente |
| Índice | — | [§8](SECCIONES.md#índice-de-secciones-solo-desktop) | pendiente | pendiente |
| Par Do / Don't | — | [§10](SECCIONES.md#10-variante-case-study-de-design-system) | pendiente | pendiente |
| Simulación | — | [§9](SECCIONES.md#simulación-guionizada) | pendiente | pendiente |

| Plantilla | Hecha de | Figma | Código |
|---|---|---|---|
| Home | Nav, hero, lista (Bloque de proyecto), About, CTA | pendiente | hecha |
| Case study | Nav, hero, Ficha, Índice, Secciones del cuerpo, Imágenes, Siguiente proyecto, CTA | pendiente | pendiente |
| 404 | Nav, frase, Link, CTA | pendiente | pendiente |

---

_Las siguientes secciones se agregan a medida que avanza el grill._
