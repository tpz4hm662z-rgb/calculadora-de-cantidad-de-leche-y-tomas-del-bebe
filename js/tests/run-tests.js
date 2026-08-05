/** Ejecuta toda la batería con JavaScript estándar y devuelve un resumen. */
import "./validation.test.js";
import "./classification.test.js";
import "./calculation.test.js";
import "./interpretation.test.js";
import "./contract.test.js";
import "./integration.test.js";
import "./content.test.js";
import "./seo.test.js";
import "./premium.test.js";
import "./audit.test.js";
import { run } from "./test-runner.js";

const resumen = await run();
if (typeof process !== "undefined" && resumen.fallidas > 0) process.exitCode = 1;
export default resumen;
