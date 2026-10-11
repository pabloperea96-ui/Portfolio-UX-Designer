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

_Las siguientes secciones se agregan a medida que avanza el grill._
