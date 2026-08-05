import { test, assert, equal } from "./test-runner.js";
import { feedingEngine } from "../engines/feeding-engine.js";
import { entrada } from "./fixtures.js";
for (const tipo of ["formula", "materna", "mixta", "extraida"]) test(`clasifica ${tipo}`, () => equal(feedingEngine(entrada({ alimentacion: tipo })).alimentacion.tipo, tipo));
test("clasifica prematuro", () => assert(feedingEngine(entrada({ nacimiento: "prematuro" })).prematuro));
test("clasifica complementaria", () => assert(feedingEngine(entrada({ edad: 6, complementaria: true, inicioComplementaria: 6 })).alimentacion.complementaria));
