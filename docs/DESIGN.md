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

### Escala — Helvetica Neue (valores v2)

| Rol | Tamaño | Line-height | Tracking |
|---|---|---|---|
| Ficha | 13 px | 140% | +1.5% |
| Body | 17 px | 155% | +0.5% |
| Métrica | 24 px | 125% | 0% |
| Título de case study | 26 px | 120% | −0.5% |
| Hero | 38 px | 115% | −1% |
| CTA | 68 px | 100% | −2% |

**Por qué:** con los valores v1 Helvetica Neue se veía demasiado comprimida y poco editorial. v2 abre los tamaños chicos y cierra menos los grandes: es una escala óptica, donde el tracking baja a medida que sube el tamaño.
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
**Por qué el extra del CTA:** la Inter que se aloja no tiene eje óptico, así que a 68 px usa el diseño pensado para texto chico. Sin el extra, el CTA queda entre 1.5 y 2.3% más angosto.
**Por qué no se usa el tracking que recomienda Inter** (su fórmula Dynamic Metrics): da entre 1.5 y 3 puntos menos que Helvetica Neue, por ejemplo −1.1% en el body contra +0.5%. Con eso cambiarían los cortes de línea.

**Verificado en el specimen:** con estos valores, Helvetica Neue e Inter cortan en las mismas palabras en hero, título, body y métrica, en los tres pesos. La ficha queda entre +0.4 y +0.8% más ancha en Inter y el CTA queda igual (0.0%).

### Cómo se implementa

- **Los % de tracking de Inter son relativos a su tamaño real** (el declarado × 0.947). En CSS, `letter-spacing` en `em` se calcula sobre el tamaño declarado, así que hay que multiplicar el valor de Inter por 0.947. Ejemplo: +1% pasa a `0.0095em`.
- **Una sola lista de fuentes (`"Helvetica Neue", Inter`) no permite un tracking distinto para cada fuente**, porque `letter-spacing` se aplica al elemento sea cual sea la fuente que se dibuje. Para usar los valores de Inter hace falta detectar si Helvetica Neue está instalada (el specimen lo hace midiendo un texto en canvas) y marcar `<html>` con una clase, por ejemplo `no-hn`. Esa clase cambia las variables de tracking.
- **El `size-adjust` va en el `@font-face` de Inter**, así que solo afecta a Inter.

### Pesos

Se trabaja con **Regular, Medium y Bold**, y solo con esos tres. El body va siempre en Regular. Qué peso lleva cada rol se decide en pruebas en contexto, con pantallas reales y no con specimens sueltos.

**Por qué tres y no más:** son los pesos que tienen medida la compensación de Inter. Un peso nuevo obliga a medirlo de nuevo en el specimen.
**Bold, en observación:** Pablo duda de él. Sigue disponible hasta verlo en contexto; si no se gana su lugar, sale, y con él su compensación.

### Pendiente

- **Pesos por rol:** se definen en las pruebas en contexto.
- **Figma (CP-003):** la columna de Helvetica Neue todavía tiene v1 y hay que aplicarle v2 a mano, porque el MCP no puede cargar fuentes locales.

---

_Las siguientes secciones se agregan a medida que avanza el grill._
