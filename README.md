# athletesusa-arg_rebranding

Rebranding del sitio de **Athletes USA Argentina**: agencia de reclutamiento deportivo-estudiantil que consigue becas universitarias en Estados Unidos para atletas latinoamericanos (opera desde 2008, +3.000 estudiantes-atletas).

## Propósito del proyecto

Este repositorio es la **versión autónoma de producción** de la experiencia web que nació como showcase dentro de [DigitalForge-lib](https://github.com/lolo-pb/DigitalForge-lib) (el playground de componentes donde se probó la idea). El objetivo es reemplazar el sitio actual estático (`athletesusa-arg`, hoy en Hostinger) por una landing cinematográfica scroll-driven con:

- Recorrido narrativo por secciones (sueño → proceso → oportunidad → campus → acompañamiento)
- Páginas de detalle internas por tema
- Formulario de evaluación de perfil en 2 pasos (hoy demo; pendiente conectar al backend PHP)
- Copy en español con voseo argentino: "Estudiá. Competí. Crecé."

**Estado:** fase inicial — portado tal cual desde el playground, sin dependencias de este. El proyecto original en PHP no fue traído todavía.

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
    │   ├── AthletesUsa.tsx        # Landing principal (~890 líneas): nav fija,
    │   │                          # track scrolleado de escenas, formulario 2 pasos, footer
    │   ├── AthletesDetail.tsx     # Páginas de detalle (/dream, /path, /opportunity,
    │   │                          # /campus, /support) con su propio 404 inline
    │   ├── athletes-content.ts    # Contenido tipado en español de las 5 páginas de detalle
    │   ├── AthletesUsa.module.css # Todos los estilos (~1.240 líneas), autocontenido
    │   ├── ATTRIBUTION.md         # Créditos de las imágenes temporales (reemplazar antes de producción)
    │   └── assets/                # 11 imágenes: fotos Pexels + recortes del PDF institucional
    ├── components/
    │   └── feedback/spinner/      # Spinner accesible (role="status") para el fallback
    └── styles/
        ├── tokens.css             # Design tokens heredados del playground (colores, radios, sombras)
        └── global.css             # Reset básico + focus-visible
```

## Rutas

| Ruta | Vista |
|---|---|
| `/#/` | Landing principal |
| `/#/:detail` | Detalle (`dream`, `path`, `opportunity`, `campus`, `support`) |
| Cualquier otra | Redirect a la landing |

> Las URLs ya no usan el prefijo `/showcases` del playground. Pendiente migrar de `HashRouter` a `BrowserRouter` para eliminar el `#` de las URLs.

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
2. Migrar `HashRouter` → `BrowserRouter` (eliminar el `#` de las URLs) + `.htaccess` fallback
3. Conectar el formulario al backend PHP (`contact.php` + PHPMailer vía SMTP Hostinger, respuesta JSON)
4. SEO: meta tags completos, `robots.txt`, `sitemap.xml`
5. Reemplazar imágenes temporales por fotografía oficial (ver ATTRIBUTION.md)
6. Deploy: subir contenido de `dist/` a `public_html` en Hostinger
