# 🚀 GUÍA DE DESARROLLO OFICIAL

# Herramientas360 Template v3.1 Stable

---

# Filosofía

Herramientas360 desarrolla herramientas profesionales, rápidas, útiles, intuitivas y optimizadas para ofrecer la mejor experiencia posible al usuario.

La plantilla es también un sistema de trabajo diseñado para que sea prácticamente imposible olvidar un paso importante. Toda comprobación repetitiva debe convertirse en un checklist, toda fase crítica debe quedar documentada y toda actualización futura debe seguir este protocolo.

La calidad siempre está por encima de la cantidad.

---

# Objetivo

Construir el mayor portal de herramientas gratuitas en español manteniendo una arquitectura estable, una calidad consistente y un proceso de publicación libre de errores evitables.

---

# Estructura obligatoria

Todo proyecto nuevo debe conservar la arquitectura oficial:

```text
index.html

css/
    style.css

js/
    config.js
    core.js
    script.js

README.md
ARQUITECTURA.md
GUIA-DESARROLLO.md
H360-DESIGN-SYSTEM.md

robots.txt
sitemap.xml
```

La separación `config.js → core.js → script.js` es obligatoria. No se reorganizan carpetas, no se mezclan responsabilidades y no se eliminan funcionalidades existentes.

---

# PROTOCOLO OFICIAL DE DESARROLLO HERRAMIENTAS360

Ninguna herramienta se considera terminada hasta completar las seis fases y la auditoría final.

## FASE 1 — DESARROLLO

Checklist obligatorio:

☐ Estructura oficial conservada

☐ Configuración completada en `config.js`

☐ Lógica específica implementada en `script.js`

☐ SEO adaptado a la herramienta

☐ Accesibilidad comprobada durante la implementación

☐ Diseño responsive comprobado en móvil, tablet y escritorio

☐ Validaciones y mensajes de error implementados

☐ Documentación actualizada

## FASE 2 — AUDITORÍA TÉCNICA

No se puede dar una herramienta por terminada sin comprobar:

☐ HTML válido

☐ CSS válido

☐ JavaScript sin errores

☐ Consola limpia

☐ Responsive en móvil, tablet y escritorio

☐ SEO completo y coherente

☐ Accesibilidad

☐ Buenas prácticas

Lighthouse es una comprobación recomendada para detectar oportunidades de mejora, pero no es un requisito obligatorio para cerrar una herramienta.

## FASE 3 — PUBLICACIÓN

Checklist obligatorio:

☐ Repositorio actualizado

☐ GitHub Pages funcionando

☐ URL pública comprobada

☐ README actualizado

☐ `robots.txt` revisado

☐ `sitemap.xml` individual actualizado

☐ Manifest revisado

☐ Open Graph revisado

☐ Twitter Cards revisadas

☐ Structured Data validado

## FASE 4 — INTEGRACIÓN EN HERRAMIENTAS360

Checklist obligatorio del portal:

☐ Nueva tarjeta añadida

☐ Contador actualizado

☐ Buscador actualizado y capaz de encontrar la herramienta

☐ Categoría correspondiente actualizada

☐ Enlaces internos actualizados

☐ `ItemList` JSON-LD actualizado

☐ Sitemap del portal actualizado

☐ XML del sitemap validado

☐ Ausencia de URLs duplicadas comprobada

## FASE 5 — GOOGLE SEARCH CONSOLE

Checklist obligatorio:

☐ Sitemap enviado

☐ Nueva URL inspeccionada

☐ Indexación solicitada

☐ Cobertura comprobada

☐ Ausencia de errores verificada

## FASE 6 — GOOGLE ANALYTICS

Checklist obligatorio:

☐ El script de GA4 aparece exactamente una sola vez

☐ ID de medición correcta

☐ Registro de actividad comprobado sin errores de consola

---

# AUDITORÍA FINAL

No puede considerarse terminada ninguna herramienta sin comprobar:

☐ HTML

☐ CSS

☐ JavaScript

☐ Responsive

☐ SEO

☐ `robots.txt`

☐ `sitemap.xml`

☐ Manifest

☐ FAQ

☐ Breadcrumb

☐ JSON-LD

☐ Open Graph

☐ Twitter Cards

☐ Analytics

☐ Portal actualizado

☐ Search Console

---

# FLUJO OFICIAL HERRAMIENTAS360

Diseño

↓

Prompt Maestro

↓

Implementación

↓

Auditoría Técnica

↓

Pruebas Manuales

↓

Publicación

↓

Actualización Portal

↓

Actualización Sitemap

↓

Google Search Console

↓

Google Analytics

↓

Auditoría Final

↓

Proyecto Cerrado

---

# Los dos sitemaps

## Sitemap individual

Vive en el repositorio de la herramienta. Actualizar siempre:

☐ URL

☐ `lastmod`

☐ `priority`

☐ `changefreq`

## Sitemap del portal

Vive en el repositorio del Portal Herramientas360. Al incorporar una herramienta actualizar siempre:

☐ Nueva URL

☐ Contador

☐ `ItemList` JSON-LD

☐ Buscador

Además, validar el XML y comprobar que no existen URLs duplicadas.

---

# Estándares permanentes

## Visual

Toda herramienta debe incluir header, hero, formulario, resultados, información útil, FAQ, herramientas relacionadas y footer.

## SEO

Toda herramienta debe incluir title, description, keywords, canonical, Open Graph, Twitter Cards, robots, sitemap, HTML semántico, Breadcrumb y datos estructurados JSON-LD.

## Programación

- Código limpio y sin duplicación evitable.
- Configuración en `config.js`.
- Motor reutilizable en `core.js`.
- Lógica específica en `script.js`.
- Estructura en `index.html`.
- Presentación en `style.css`.

## Responsive y pruebas manuales

Comprobar móvil, tablet y ordenador; Chrome, Safari, Edge y Firefox; orientación vertical y horizontal; y modo claro u oscuro cuando exista.

## Git

Usar mensajes claros con los prefijos `feat:`, `fix:`, `docs:`, `style:` y `refactor:` según corresponda.

---

# CIERRE OFICIAL DEL PROYECTO

No se puede cerrar una herramienta ni comenzar la siguiente hasta confirmar:

☐ Publicada

☐ GitHub correcto

☐ GitHub Pages funcionando

☐ Portal actualizado

☐ Sitemap individual actualizado

☐ Sitemap del portal actualizado

☐ Search Console revisada

☐ Analytics revisado

☐ Auditoría completada

☐ Lista para comenzar la siguiente herramienta

---

# Versionado

La versión documental y estable vigente es **Herramientas360 Template v3.1 Stable**. Los cambios menores incrementan la versión menor; los cambios incompatibles de arquitectura requieren una versión principal y una planificación expresa.

---

© 2026 Herramientas360

José Carlos Núñez Florido
