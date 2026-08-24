# athletesusa-arg_rebranding

Rebranding del sitio de **Athletes USA Argentina**: agencia de reclutamiento deportivo-estudiantil que consigue becas universitarias en Estados Unidos para atletas latinoamericanos (opera desde 2008, +3.000 estudiantes-atletas).

## Propósito del proyecto

Este repositorio es la **versión autónoma de producción** de la experiencia web que nació como showcase dentro de [DigitalForge-lib](https://github.com/lolo-pb/DigitalForge-lib) (el playground de componentes donde se probó la idea). El objetivo es reemplazar el sitio actual estático (`athletesusa-arg`, hoy en Hostinger) por una landing cinematográfica scroll-driven con:

- Recorrido narrativo por escenas (sueño → proceso → matching → acompañamiento → equipo)
- Páginas de detalle internas por tema
- Formulario de evaluación de perfil en 2 pasos (hoy demo; pendiente conectar al backend PHP)
- Copy en español con voseo argentino: "Estudiá. Competí. Crecé."

**Estado:** landing rediseñada y operativa (proceso visualizado como journey, matching como historia animada); el proyecto original en PHP y el deploy siguen pendientes (ver Roadmap).

## Stack

| Herramienta | Uso |
|---|---|
| Vite + React 19 + TypeScript | Base de la app |
| pnpm | Gestor de paquetes |
| react-router-dom 7 | Ruteo (hoy `HashRouter`) |
| animejs 4 | Scroll-driven storytelling: timeline principal, `onScroll`, `splitText`, `stagger` |
| motion 13 | Animaciones de entrada y transiciones en páginas de detalle (`LazyMotion`, `MotionConfig` con soporte reduced-motion) |

## Estructura

```text
├── index.html                     # Entry HTML: lang="es", meta descripción, título
├── vite.config.ts                 # Config Vite (base "./", plugin React)
├── tsconfig.json                  # TypeScript estricto, moduleResolution Bundler
├── package.json                   # Deps + scripts
└── src/
    ├── main.tsx                   # Bootstrap: StrictMode + HashRouter + estilos globales
    ├── vite-env.d.ts              # Tipos de Vite
    ├── app/
    │   ├── App.tsx                # Rutas + lazy loading con Suspense
    │   └── App.module.css         # Estilo del fallback de carga (.loadingPage)
    ├── athletesusa-arg/
    │   ├── AthletesUsa.tsx        # Landing principal (~1.600 líneas): nav fija,
    │   │                          # track scrolleado de escenas con timeline animejs,
    │   │                          # arte por componente (JourneyPath, OpportunityMatching,
    │   │                          # OutcomeOrbit, SupportProof, CasesGrid, TeamGrid),
    │   │                          # formulario 2 pasos y footer
    │   ├── AthletesDetail.tsx     # Páginas de detalle (/dream, /path, /opportunity,
    │   │                          # /campus, /support) con su propio 404 inline
    │   ├── athletes-content.ts    # Contenido tipado en español de las 5 páginas de detalle
    │   ├── AthletesUsa.module.css # Todos los estilos (~2.200 líneas), autocontenido,
    │   │                          # mobile-first con queries por breakpoint
    │   ├── ATTRIBUTION.md         # Créditos de las imágenes temporales (reemplazar antes de producción)
    │   └── assets/                # 11 imágenes: fotos Pexels + recortes del PDF institucional
    ├── components/
    │   └── feedback/spinner/      # Spinner accesible (role="status") para el fallback
    └── styles/
        ├── tokens.css             # Design tokens heredados del playground (colores, radios, sombras)
        └── global.css             # Reset básico + focus-visible
```

## La landing, sección por sección

El main es un `.storyTrack` de ~1080svh. Una única timeline de animejs 4 se mapea al progreso de scroll (`onScroll`) y orquesta entradas, salidas y el arte de cada escena. Al final del track, un `.handoff` funde hacia la sección de evaluación.

### Escenas del track (en orden)

1. **`dream` — Hero ("Estudiá. Competí. Crecé...")**
   Foto de estadio a pantalla completa con scrim navy. El titular entra por líneas (`splitText`) mientras `OutcomeOrbit` gira palabras del sueño alrededor de un núcleo rojo. CTA hacia el detalle `/dream`.

2. **`path` — El proceso ("Todo tu camino. Un solo equipo.")**
   `JourneyPath`: una línea recorre **5 círculos numerados** (sueño definido, perfil deportivo-académico, universidades, beca y visa, llegada). La línea se dibuja con el scroll, corta cada círculo y lo deja "encendido" en rojo; las tarjetas con icono SVG + etapa + descripción se sincronizan con la posición del scroll. Desktop horizontal, mobile vertical con tarjeta única.

3. **`campus` — Matching ("Conectamos tu talento con la oportunidad correcta.")**
   `OpportunityMatching`, la pieza central: una historia animada en **3 estados** que el scroll revela causa → efecto.
   - **TU PERFIL**: tarjeta de un atleta demo (MATEO, Student Athlete · Argentina) con 4 atributos que se van iluminando: nivel deportivo, académico, objetivos y potencial.
   - **MATCHING**: una línea conecta el perfil con el círculo MATCHING; el anillo barre mientras el estado alterna "Analizando perfil..." → checklist (✓ Deportivo/Académico/Objetivos/Potencial) → **COMPATIBILIDAD ALTA**, y aparece el **94% MATCH**.
   - **TU OPORTUNIDAD**: salen 4 universidades con su % (41/62/78/94). Las de bajo match se apagan, COAST COLLEGE queda agrandada con borde rojo y badge **"OPORTUNIDAD ENCONTRADA"**, y recién entonces aparece el panel "¿Por qué esta universidad?" con las razones.
   En layouts verticales (<1100px) el bloque de texto cede lugar deslizándose fuera cuando arranca el matching, para que el diagrama use toda la pantalla; al cierre aparece la frase final al pie. Los nombres/universidades son ficticios (demo).

4. **`support` — Acompañamiento 360° ("Antes, durante y después.")**
   Métricas institucionales (2008 · 3.000+ estudiantes-atletas · 20.000+ entrenadores) más `SupportProof`: tira de fotos y logos de instituciones que validan la red.

5. **`about` — Quiénes somos ("Una agencia que nació del deporte.")**
   Escena solo tipográfica sobre fondo navy con la historia de la agencia desde 2008. CTA directo a la evaluación.

6. **`cases` — Casos de éxito ("Historias que ya están pasando.")**
   `CasesGrid`: fotos y logos de atletas reales (Delfi González, Delfina Schmidt, Emil Jaaskelainen) con su universidad.

7. **`team` — Nuestro equipo ("Gente que vivió el camino y te guía en el tuyo.")**
   `TeamGrid`: tarjetas del staff, ex estudiantes-atletas y especialistas.

> La ex escena **`opportunity`** ("Convertimos tu potencial en un perfil que abre oportunidades") quedó **fuera de servicio**: está comentada en el código junto con sus estilos, y su concepto lo absorbió el matching de `campus`.

### Después del track

- **`#evaluation` — Evaluación de perfil**: formulario demo en 2 pasos (datos personales → contexto deportivo/académico) con pantalla de éxito. Pendiente conectar al backend PHP.
- **Footer** con marca y línea institucional.

### Convenciones técnicas de la landing

- **animejs 4 exige colores legacy**: siempre `rgba(r, g, b, a)` con comas en valores animados (`rgb(r g b / a%)` rompe el parseo).
- **Patrón reduced-motion**: el CSS pinta el estado final de cada pieza; JS solo resetea y anima si `prefers-reduced-motion` no está activo. Así no hay flashes ni contenido invisible.
- **lightningcss no acepta media queries anidadas con coma**: dividir condiciones complejas en queries simples.
- Breakpoints clave del matching: base mobile-first (flujo vertical compacto), ≥768px (vertical ampliado), ≥1100px (flujo horizontal de 3 columnas con líneas SVG).

## Rutas

| Ruta | Vista |
|---|---|
| `/#/` | Landing principal |
| `/#/:detail` | Detalle (`dream`, `path`, `opportunity`, `campus`, `support`) |
| Cualquier otra | Redirect a la landing |

> Las URLs ya no usan el prefijo `/showcases` del playground. La página de detalle `/opportunity` sigue publicada aunque su escena del track esté fuera de servicio. Pendiente migrar de `HashRouter` a `BrowserRouter` para eliminar el `#` de las URLs.

## Comandos

```bash
pnpm install     # Instalar dependencias
pnpm dev         # Servidor de desarrollo
pnpm typecheck   # Chequeo de tipos
pnpm build       # Typecheck + build de producción a dist/
pnpm preview     # Previsualizar dist/
```

## Roadmap hacia producción

1. ~~Portar el showcase a proyecto autónomo~~ ✅
2. ~~Rediseñar la escena de proceso (JourneyPath) y el matching (OpportunityMatching); retirar la escena intermedia~~ ✅
3. Migrar `HashRouter` → `BrowserRouter` (eliminar el `#` de las URLs) + `.htaccess` fallback
4. Conectar el formulario al backend PHP (`contact.php` + PHPMailer vía SMTP Hostinger, respuesta JSON)
5. SEO: meta tags completos, `robots.txt`, `sitemap.xml`
6. Reemplazar imágenes temporales por fotografía oficial (ver ATTRIBUTION.md)
7. Deploy: subir contenido de `dist/` a `public_html` en Hostinger
