# Calculadora de cantidad de leche y tomas del bebé

Herramienta web orientativa de Herramientas360 para estimar rangos diarios de leche y tomas durante el primer año de vida. Adapta el informe a la edad, el peso, el tipo de alimentación, el nacimiento y el inicio de la alimentación complementaria.

## Alcance

- Fórmula infantil, lactancia materna directa, leche extraída y lactancia mixta.
- Resultados expresados como rangos, con interpretación, recomendaciones, alertas y cronología.
- Historial local, impresión o PDF, enlace compartible y funcionamiento offline.
- Contenido editorial, preguntas frecuentes, fuentes y datos estructurados SEO.

La herramienta es informativa y no sustituye la valoración individual de pediatría, enfermería pediátrica o asesoría de lactancia.

## Ejecución local

El proyecto no necesita compilación ni dependencias de producción. Debe servirse por HTTP para habilitar el service worker:

```bash
python3 -m http.server 8000
```

Después se abre `http://localhost:8000/`.

## Pruebas

Con Node.js 18 o posterior:

```bash
node js/tests/run-tests.js
```

La batería cubre validación, clasificación, cálculos, contrato de resultados, interpretación, contenido, integración, SEO y controles de auditoría.

## Estructura

```text
css/               Estilos visuales, responsive y de impresión
icons/             Recursos de identidad e instalación PWA
js/content/        Contenido editorial
js/data/           Constantes, rangos y datos de cronología
js/engines/        Validación, cálculo e interpretación
js/renderers/      Renderizado seguro de la interfaz
js/services/       Analítica, compartir, impresión y offline
js/storage/        Persistencia local e historial
js/tests/          Pruebas automatizadas
js/utils/          Utilidades y contrato de resultados
index.html         Documento principal
manifest.webmanifest
sw.js
```

## Privacidad y producción

Los datos introducidos y el historial permanecen en el navegador mediante almacenamiento local. No existe envío de datos personales a un servidor. Antes de publicar en el dominio definitivo se debe verificar manualmente la URL canónica, la analítica configurada, el diálogo nativo de compartir e impresión y la instalación PWA en los navegadores objetivo.

## Licencia

Consulta [LICENSE](LICENSE).
