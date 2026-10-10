# Auditoría de uso de React — Documentación oficial vs. proyecto

Este documento contrasta la documentación actual de React (consultada vía Context7 — react.dev) con el uso de React en este portfolio. Sirve como referencia para validar que seguimos las recomendaciones actualizadas.

---

## 1. Error Boundary (solo como class component)

**Documentación (react.dev):**
- Los Error Boundaries deben ser **class components** que implementen `static getDerivedStateFromError` y/o `componentDidCatch`.
- No existe equivalente con Hooks para capturar errores de renderizado en el árbol de hijos.
- El patrón recomendado: constructor con estado `{ hasError: false }`, `getDerivedStateFromError` para actualizar estado, `componentDidCatch` para logging, y `render` que devuelve fallback o `children`.

**Proyecto (`src/app/components/ErrorBoundary.tsx`):**
- ✅ Implementado como **class component**.
- ✅ `getDerivedStateFromError(error)` devuelve `{ hasError: true, error }`.
- ✅ `componentDidCatch(error, errorInfo)` para logging.
- ✅ `render` devuelve `props.fallback` o UI por defecto cuando hay error, y `children` si no.
- **Conclusión:** Cumple el patrón oficial.

---

## 2. Error Boundary + Suspense (combinación recomendada)

**Documentación (react.dev):**
- Para datos asíncronos o lazy loading, el patrón recomendado es: **Error Boundary envolviendo Suspense**.
- Si el Promise de `lazy()` rechaza, React lanza y el Error Boundary más cercano debe capturarlo.
- Ejemplo: `<ErrorBoundary fallback={...}><Suspense fallback={...}><LazyComponent /></Suspense></ErrorBoundary>`.

**Proyecto (`App.tsx` + `RootLayout.tsx`):**
- ✅ `App.tsx`: `<ErrorBoundary>` envuelve a `<RouterProvider>` (todo el árbol de rutas).
- ✅ `RootLayout`: `<Suspense fallback={<RouteFallback />}>` envuelve el contenido que incluye los componentes lazy (HomePage, AllProjectsPage, etc.).
- Los componentes lazy se renderizan dentro de ese Suspense; si fallan al cargar, el Error Boundary en App los captura.
- **Conclusión:** Orden correcto (Error Boundary exterior, Suspense interior).

---

## 3. React.lazy y Suspense

**Documentación (react.dev):**
- `lazy(load)` declara un componente que se carga bajo demanda; `load` debe devolver un Promise que resuelve a un módulo con `default` export.
- El componente lazy **debe** estar dentro de un boundary `<Suspense>` con `fallback` para mostrar algo mientras carga.
- React cachea el Promise y el valor resuelto; si el Promise rechaza, el Error Boundary más cercano lo captura.

**Proyecto (`routes.tsx` + `RootLayout.tsx`):**
- ✅ Rutas declaradas con `lazy(() => import(...).then(m => ({ default: m.X })))` para HomePage, AllProjectsPage, CaseStudyPage, NotFoundPage.
- ✅ Todos se renderizan bajo `<Suspense fallback={<RouteFallback />}>` en RootLayout.
- ✅ `fallback` es un componente de carga (spinner), no null.
- **Conclusión:** Uso correcto de lazy + Suspense.

---

## 4. useEffect — efectos y dependencias

**Documentación (react.dev):**
- Llamar `useEffect` solo en el **top level** del componente (o de un custom Hook).
- No dentro de condicionales, bucles ni después de un return.
- El array de dependencias debe incluir todos los valores reactivos usados en el efecto; array vacío `[]` = solo al montar.

**Proyecto (ej. `RootLayout.tsx`):**
- ✅ Un solo `useEffect` en el top level: `useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);`.
- Sincroniza con navegación (scroll to top); dependencia correcta.
- **Conclusión:** Cumple reglas de hooks y buenas prácticas de efectos.

---

## 5. Reglas de los Hooks

**Documentación (react.dev):**
- Solo llamar Hooks en el **top level** de un function component o de un custom Hook.
- No dentro de condicionales, bucles, event handlers, ni después de un return condicional.
- Solo desde funciones React (componentes o Hooks), nunca desde funciones normales.

**Proyecto (revisión de `RootLayout`, `Hero`, páginas):**
- ✅ `useState`, `useEffect`, `useLocation`, `useOutlet` usados en el top level, sin condicionales.
- ✅ `FrozenOutlet` usa `useOutlet()` y `useState(o)` en el top level.
- No se observan llamadas a Hooks dentro de if/loops/handlers.
- **Conclusión:** Se respetan las reglas de los Hooks.

---

## 6. Componentes funcionales como estándar

**Documentación (react.dev):**
- Los function components con Hooks son el enfoque recomendado para código nuevo.
- Los class components se mantienen para casos específicos (p. ej. Error Boundary) donde no hay equivalente en Hooks.

**Proyecto:**
- ✅ Casi toda la UI son function components (Hero, RootLayout, Navigation, StorySection, etc.).
- ✅ La única class component es `ErrorBoundary`, que es el caso de uso correcto.
- **Conclusión:** Alineado con la recomendación actual.

---

## Resumen

| Área | Estado | Notas |
|------|--------|--------|
| Error Boundary | ✅ | Class component con getDerivedStateFromError + componentDidCatch |
| Error Boundary + Suspense | ✅ | ErrorBoundary envuelve árbol; Suspense envuelve lazy |
| lazy + Suspense | ✅ | Rutas lazy con fallback definido |
| useEffect | ✅ | Top level, dependencias correctas |
| Reglas de Hooks | ✅ | Sin condicionales/loops en hooks |
| Function vs class | ✅ | Solo ErrorBoundary como class |

**Veredicto:** El proyecto está usando React de forma correcta y alineada con la documentación actual (react.dev) consultada vía Context7. No se identifican desviaciones que requieran cambios estructurales.

---

*Documentación de React consultada: react.dev (Context7). Fecha de auditoría: marzo 2025.*
