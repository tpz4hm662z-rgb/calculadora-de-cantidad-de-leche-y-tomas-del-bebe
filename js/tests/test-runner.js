/** Runner mínimo sin dependencias externas. */
const pruebas = [];
export function test(nombre, ejecutar) { pruebas.push({ nombre, ejecutar }); }
export function assert(condicion, mensaje = "La condición no se cumple") { if (!condicion) throw new Error(mensaje); }
export function equal(actual, esperado, mensaje = "Valores distintos") { if (!Object.is(actual, esperado)) throw new Error(`${mensaje}: esperado ${esperado}, recibido ${actual}`); }
export function deepEqual(actual, esperado, mensaje = "Estructuras distintas") { if (JSON.stringify(actual) !== JSON.stringify(esperado)) throw new Error(mensaje); }
export async function run() {
  const inicio = performance.now(); let superadas = 0; const fallos = [];
  for (const prueba of pruebas) {
    try { await prueba.ejecutar(); superadas += 1; }
    catch (error) { fallos.push({ nombre: prueba.nombre, error: error.message }); }
  }
  const resumen = { total: pruebas.length, superadas, fallidas: fallos.length, tiempoMs: Math.round((performance.now() - inicio) * 100) / 100, fallos };
  console.log(`[H360 tests] ${resumen.superadas}/${resumen.total} superadas · ${resumen.fallidas} fallidas · ${resumen.tiempoMs} ms`);
  fallos.forEach((fallo) => console.error(`✗ ${fallo.nombre}: ${fallo.error}`));
  return resumen;
}
