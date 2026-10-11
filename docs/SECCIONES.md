# SECCIONES — Portfolio v2

> Qué secciones tiene cada página, qué slots lleva cada una, cómo se comporta y qué tokens consume.
> No escribe copy (eso es `CONTENIDO.md`) ni crea tokens sin un elemento que los use.
> Construido mediante grill desde el 2026-10-11. Se valida contra [`BRIEF.md`](BRIEF.md), [`REFERENCIAS.md`](REFERENCIAS.md) y [`DESIGN.md`](DESIGN.md).

---

## 1. Inventario de v2.0

| Página | Secciones, en orden |
|---|---|
| **Home** | Nav → Hero → Lista de trabajo → About → CTA |
| **Case study** (Agentes, Design System) | Nav → Hero → Ficha → Overview → Cuerpo → Siguiente proyecto → CTA |
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
**Por qué (Pablo, 2026-10-11):** en v2.0 habrá links rotos (v1, MeLi y RappiCard antes de tiempo, URLs mal escritas). La 404 del hosting es el «slop visual» de la lista [Nunca](REFERENCIAS.md#nunca), y quien llega por un link viejo tiene que aterrizar en la web.

---

## 2. Nav

| | |
|---|---|
| **Propósito** | Identidad y saltos de sección. Mínima, texto plano ([REFERENCIAS](REFERENCIAS.md#navegación)). |
| **Slots** | Nombre (izquierda, link a la home) · Work · About · Contact (derecha) |
| **Destinos** | Work → lista de trabajo de la home · About → `/#about` · Contact → el CTA de la página actual |
| **Texto** | Rol Body (16 px, Regular) en todos los breakpoints |
| **Color** | `color/text/primary`; sobre el hero del case study, `color/text/on-image` |
| **Links** | Patrón `color/link/*`: subrayado gris en reposo, sube al color del texto en hover (`motion/hover`, 0.2 s). Sin hover en táctil |
| **Espacio entre items** | 24 en desktop y tablet · 16 en móvil |
| **Posición** | Arriba, dentro del margen de la retícula. **No es fija**: se va con el scroll |
| **Móvil** | La misma nav, en una línea. Sin hamburguesa |

**Por qué «Work» sin contador (Pablo, 2026-10-11):** con 2 proyectos, «Work (2)» se lee como poco; el contador de Givelet funciona con 8. Vuelve cuando haya 4 (v2.2).
**Por qué «Contact» y no el email:** el email ya es la frase del CTA, que cierra todas las páginas. Repetirlo arriba duplica.
**Por qué no es fija (Pablo, 2026-10-11):** nada flota sobre el contenido, como en Givelet. En el case study la orientación la da el índice fijo: una sola pieza fija por página. Escondida al bajar y visible al subir sería movimiento que no cuenta nada.
**Por qué sin hamburguesa y en Body (Pablo, 2026-10-11):** nombre + tres items a 16 px ocupan unos 270 px y entran en los 327 de móvil. Un menú plegable traería estado, capa y movimiento, y el radio de «menú móvil» que DESIGN sacó por no tener elemento. La nav es lectura, así que va en Regular y no necesita token propio.

**Pendiente:**
- **Legibilidad sobre el hero del case study:** el velo actual (`color/overlay/scrim`) oscurece solo abajo. Se resuelve con el hero del case study.
- **Nombre largo en móvil:** si el nombre completo no entra en 327 px, en móvil va el nombre de pila. Se confirma con el nombre real en `CONTENIDO.md`.

---

_Las siguientes secciones se agregan a medida que avanza el grill._
