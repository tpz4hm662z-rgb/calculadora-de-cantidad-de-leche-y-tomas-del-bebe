export const entradaBase = Object.freeze({ edad: 3, unidadEdad: "meses", peso: 5, nacimiento: "termino", alimentacion: "formula", tomas: 5, complementaria: false, inicioComplementaria: null });
export function entrada(cambios = {}) { return { ...entradaBase, ...cambios }; }
export function contieneNumeroNoFinito(valor) {
  if (typeof valor === "number") return !Number.isFinite(valor);
  if (!valor || typeof valor !== "object") return false;
  return Object.values(valor).some(contieneNumeroNoFinito);
}
